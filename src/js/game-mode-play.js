import EventEmitter from 'events';
import { createPopper } from '@popperjs/core';

import GameMode from './game-mode';
import terrain from './terrain';
import * as waves from './waves';
import BotStrategyBase from './bot-strategies/base';
import BotStrategyRandom from './bot-strategies/random';
import BotStrategyTangentIntersection from './bot-strategies/tangent-intersection';
import BotStrategyGradientDescent from './bot-strategies/gradient-descent';

const WATER_HEIGHT_SCALE = 10;
const NUM_WATER_POINTS = 300;
const WATER_FPS = 5;
const WATER_DISTANCE = 260;
const WATER_LOOP_DURATION = 20 * 1000;

const BOAT_DRAFT = 18;

const TERRAIN_HEIGHT_SCALE = 300;
const NUM_TERRAIN_POINTS = 300;
const MAX_TERRAIN_EXTREMA = 20;
const TERRAIN_MARGIN_WIDTH = 0.1;
const TERRAIN_DISTANCE = 300;

// How far should the boat move on user input per ms
const SPEED_FACTOR = 0.2 / 1000.0;

const PROBE_SIZE = 10;
const PROBE_DISTANCE_AT_REST = 0.3;
const PROBE_MIN_DURATION = 500;
const PROBE_DELAY = 500;

const TANGENT_LENGTH = 0.02;
const TANGENT_MIN_OPACITY = 0.25;
const TANGENT_OPACITY_FADEOUT_FACTOR = 0.9;
const TANGENT_OPACITY_FADEOUT_DURATION = 500;

const TREASURE_SIZE = 0.03;

const START_SEQUENCE_FST_DELAY = 500;
const START_SEQUENCE_AFTER_FST_DELAY = 2000;
const START_SEQUENCE_AFTER_SND_DELAY = 1000;

const UNCOVER_DURATION = 2000;
const ENDING_SEQUENCE_FST_DELAY = 0;
const ENDING_SEQUENCE_SND_DELAY = 1000;
const ENDING_SEQUENCE_RESTART_DELAY = 1000;

export default class PlayMode extends GameMode {

  constructor(game) {
    super(game);
    const wavesPoints = Array(NUM_WATER_POINTS).fill(null);
    this.wavesPoints = t => waves.points(wavesPoints, t, game.draw.width(), WATER_HEIGHT_SCALE);
    this.bot = null;
  }

  async preLoadAssets() {
    this.shipSymbol = await this.game.loadSVGSymbol('assets/img/ship.svg');
    this.shipSymbol.attr({ overflow: 'visible' });
    this.treasureClosedSymbol = await this.game.loadSVGSymbol('assets/img/treasure-closed.svg');
    this.treasureClosedSymbol.attr({ overflow: 'visible' });
    this.treasureOpenedSymbol = await this.game.loadSVGSymbol('assets/img/treasure-opened.svg');
    this.treasureOpenedSymbol.attr({ overflow: 'visible' });
  }

  async handleEnterMode() {
    const { draw, config, numPlayers, botType } = this.game;

    this.isGameOver = false;
    this.discardInputs = false;

    this.remainingTime = config.maxTime * 1000;

    this.tangents = [];

    this.$overlay = $('<div class="play" />').appendTo(this.game.overlay);
    const $gameStats = $('<div class="game-stats"/>').appendTo(this.$overlay);

    const $remainingTimeContainer = $('<div class="remaining-time"/>')
      .text(IMAGINARY.i18n.t('remaining-time'))
      .appendTo($gameStats);
    if (config.maxTime === Number.POSITIVE_INFINITY)
      $remainingTimeContainer.hide()

    const $remainingProbesContainer = $('<div class="remaining-probes"/>')
      .text(IMAGINARY.i18n.t('remaining-probes'))
      .appendTo($gameStats);
    this.$remainingTime = $('<span class="counter"/>')
      .appendTo($remainingTimeContainer);
    this.$remainingProbes = $('<span />').appendTo($remainingProbesContainer);
    if (config.maxProbes === Number.POSITIVE_INFINITY)
      $remainingProbesContainer.hide()

    this.$endingSequenceContainer = $('<div />').appendTo(this.$overlay);

    const modeGroup = draw.group()
      .addClass('play')
      .addClass('draw')
      .translate(0, WATER_DISTANCE);


    const padRemainingProbes = num => pad(num, String(this.game.config.maxProbes).length, ' ');
    const createPlayer = (playerIndex, numPlayers, cssClass) => {
      const x = (playerIndex + 1) / (numPlayers + 1);
      const group = modeGroup.group();
      group
        .addClass(cssClass)
        .transform({ translateX: x * draw.width() });

      const boat = group.use(this.shipSymbol)
        .center(0, BOAT_DRAFT);

      const probeParent = group.group();
      const probe = probeParent.group();
      const probeY = TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST;
      const probeRope = probe.line(0, BOAT_DRAFT, 0, probeY - PROBE_SIZE / 2);
      const probeCircle = probe.circle(PROBE_SIZE).center(0, probeY);

      const doProbe = function (terrainHeight) {
        this.probing = true;
        this.remainingProbes = Math.max(0, this.remainingProbes - 1);
        this.$remainingProbes.text(padRemainingProbes(this.remainingProbes));
        if (this.remainingProbes === 0)
          this.$remainingProbes.addClass("blinking");
        const probeHeight = TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * terrainHeight;
        const probeDuration = probeHeight * (PROBE_MIN_DURATION / TERRAIN_DISTANCE);

        const probeDown = probeCircle.animate(probeDuration, 0, 'now')
          .cy(probeHeight);
        const probeRopeDown = probeRope.animate(probeDuration, 0, 'now')
          .plot(0, BOAT_DRAFT, 0, probeHeight - PROBE_SIZE / 2);

        const yUp = this.remainingProbes > 0 ? TERRAIN_DISTANCE
          * PROBE_DISTANCE_AT_REST : BOAT_DRAFT + PROBE_SIZE;
        const probeUp = probeDown.animate(probeDuration, PROBE_DELAY)
          .cy(yUp)
          .after(() => this.probing = false);
        const probeRopeUp = probeRopeDown.animate(probeDuration, PROBE_DELAY)
          .plot(0, BOAT_DRAFT, 0, yUp - PROBE_SIZE / 2);

        return {
          down: new Promise(resolve => probeDown.after(resolve)),
          up: new Promise(resolve => probeUp.after(resolve)),
        }
      }

      // Add an element for displaying the number of remaining probes
      const $remainingProbes = $(`<span class="counter ${cssClass}">${config.maxProbes}</span>`)
        .appendTo(this.$remainingProbes);

      // Move boat in front of the probe
      boat.front();

      return {
        id: playerIndex,
        cssClass: cssClass,
        group: group,
        boat: boat,
        probe: probe,
        doProbe: doProbe,
        x: x,
        lastX: x,
        flipX: false,
        _probing: false,
        _probeEventEmitter: new EventEmitter(),
        set probing(p) {
          const probeTurnedOff = this._probing && !p;
          this._probing = p;
          if (probeTurnedOff)
            this._probeEventEmitter.emit("probe-off");
        },
        get probing() {
          return this._probing;
        },
        probingDone: async function () {
          if (!this.probing)
            return;
          await new Promise(resolve => this._probeEventEmitter.addListener("probe-off", resolve));
        },
        remainingProbes: config.maxProbes,
        $remainingProbes: $remainingProbes,
      };
    };

    // Create a boat for each player
    const addBot = botType && botType !== 'none';
    this.players = Array(numPlayers)
      .fill(null)
      .map((_, playerIndex) => createPlayer(
        playerIndex,
        numPlayers + (addBot ? 1 : 0),
        `player-${playerIndex}`)
      );
    if (addBot) {
      const botStrategyClass = (() => {
        switch (botType) {
          case 'random':
            return BotStrategyRandom;
          case 'newton':
            return BotStrategyNewton;
          case 'gradient-descent':
            return BotStrategyGradientDescent;
          case 'tangent-intersection':
            return BotStrategyTangentIntersection;
          default:
            return BotStrategyBase;
        }
      })();
      const botStrategy = new botStrategyClass(
        TERRAIN_MARGIN_WIDTH,
        1 - TERRAIN_MARGIN_WIDTH,
        TREASURE_SIZE
      );
      const bot = {};
      bot.type = botType;
      bot.player = createPlayer(numPlayers, numPlayers + 1, 'player-bot');
      const nextTarget = () => botStrategy.getNextProbeLocation(
        this.tangents,
        bot.player,
        bot.player.id,
        this.players,
      );
      bot.targetX = nextTarget();
      bot.tangentListener = () => bot.targetX = nextTarget();
      this.players.push(bot.player);
      this.events.addListener('new-tangent', bot.tangentListener);
      this.bot = bot;
    } else {
      this.bot = null;
    }

    this.water = modeGroup.group().attr('id', 'water').addClass('water');
    waves.animatedSVGPolyline(this.water,
      NUM_WATER_POINTS,
      (WATER_LOOP_DURATION / 1000) * WATER_FPS,
      game.draw.width(),
      WATER_HEIGHT_SCALE,
      WATER_LOOP_DURATION);

    this.groundGroup = modeGroup.group();
    const newTerrainHeights = () => {
      const terrainOptions = { marginWidth: TERRAIN_MARGIN_WIDTH, tilt: game.config.maxDepthTilt };
      return terrain(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
    }
    const terrainHeights = game.map ? game.map : newTerrainHeights();
    const terrainPoints = terrainHeights.map((h, i) => [
      draw.width() * (i / (terrainHeights.length - 1)),
      TERRAIN_HEIGHT_SCALE * h,
    ]).concat([
      [2 * draw.width(), 0],
      [2 * draw.width(), draw.height()],
      [-draw.width(), draw.height()],
      [-draw.width(), 0],
    ]);
    this.terrainHeights = terrainHeights;
    this.treasureLocation = this.locateTreasure();
    console.log("Map:", terrainHeights);
    console.log("Treasure location:", this.treasureLocation);

    const behindGroundGroup = this.groundGroup.group();
    const treasure = behindGroundGroup.group()
      .addClass('treasure')
      .transform({
        translateX: this.treasureLocation.x * draw.width(),
        translateY: TERRAIN_DISTANCE + this.treasureLocation.y * TERRAIN_HEIGHT_SCALE,
      });
    this.treasureClosed = treasure.use(this.treasureClosedSymbol);
    this.treasureOpened = treasure.use(this.treasureOpenedSymbol).hide();

    this.ground = this.groundGroup.polygon(terrainPoints)
      .fill('black')
      .addClass('ground')
      .translate(0, TERRAIN_DISTANCE);

    const groundCover = this.groundGroup.group();
    this.groundCoverLeft = groundCover.rect(draw.width(), draw.height())
      .addClass('ground-cover')
      .move(Math.ceil(draw.width() * (this.treasureLocation.x - 1)), -TERRAIN_HEIGHT_SCALE / 2);
    this.groundCoverRight = groundCover.rect(draw.width(), draw.height())
      .addClass('ground-cover')
      .move(Math.floor(draw.width() * this.treasureLocation.x), -TERRAIN_HEIGHT_SCALE / 2);
    if (config.showSeaFloor)
      groundCover.hide();

    this.groundGroup.back();

    this.tangentGroup = modeGroup.group()
      .translate(0, TERRAIN_DISTANCE);

    this.discardInputs = true;
    this.showGameStartSequence(
        IMAGINARY.i18n.t('objective'),
        IMAGINARY.i18n.t('go'),
        () => this.discardInputs = false
    );
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
    if (this.bot !== null)
      this.events.removeListener('new-tangent', this.bot.tangentListener);
  }

  static buildBotInput(bot) {
    const botInput = { direction: 0, action: false };
    const botLastInput = { direction: 0, action: false };

    const { player, targetX } = bot;
    const { x, lastX } = player;
    const [lower, upper] = x < lastX ? [x, lastX] : [lastX, x];

    if (lower <= targetX && targetX <= upper) {
      // It's time to probe!
      player.lastX = x;
      player.x = targetX;
      botInput.action = true;
    } else {
      // Navigate towards targetX
      botInput.direction = Math.sign(targetX - player.x);
    }

    return {
      input: botInput,
      lastInput: botLastInput,
    }
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    // Move the boats or check if they're lowering the probe
    const { draw, config, numPlayers } = this.game;

    // Some game states do not allow user input
    if (this.discardInputs)
      return;

    // Leave game mode when the game is over and a player pressed the action button
    if (this.isGameOver) {
      const action = inputs.findIndex((input, i) => actionPressed(input, lastInputs[i])) !== -1;
      if (this.isGameOver && action) {
        this.discardInputs = true;
        this.triggerEvent('done');
      }
      return;
    }

    // Update remaining time
    const newRemainingTime = Math.max(0, this.remainingTime - delta);
    if (this.remainingTime !== newRemainingTime) {
      this.remainingTime = newRemainingTime;
    }

    // Check whether the game is lost
    if (this.remainingTime === 0) {
      console.log("Time is up - GAME OVER!");
      this.gameOver(async () => this.showLoseSequenceTimeIsUp());
      return;
    } else if (this.players.reduce((a, c) => a + c.remainingProbes, 0) === 0) {
      const anyoneProbing = this.players.reduce((a, c) => a || c.probing, false);
      if (!anyoneProbing) {
        console.log("No probes left - GAME OVER!");
        this.gameOver(async () => this.showLoseSequenceNoProbesLeft());
        return;
      }
    }

    // Discard inputs that don't belong to an active player
    inputs = inputs.slice(0, numPlayers);
    lastInputs = lastInputs.slice(0, numPlayers);

    // If there is a bot, create fake inputs for it
    if (this.bot !== null) {
      const { input, lastInput } = PlayMode.buildBotInput(this.bot);
      inputs.push(input);
      lastInputs.push(lastInput);
    }

    // Regular move & probe logic
    inputs
      .forEach((input, playerIndex) => {
        const lastInput = lastInputs[playerIndex];
        const action = actionPressed(input, lastInput);

        const player = this.players[playerIndex];
        if (!player.probing && !this.isGameOver) {
          player.lastX = player.x;
          player.x += SPEED_FACTOR * (delta * input.direction);
          player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x),
            1.0 - TERRAIN_MARGIN_WIDTH);
          // TODO: Limit bot position to bot.targetX
          player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;
          if (action && player.remainingProbes > 0) {
            // Switch to probe mode
            // Lower the probe, wait and raise it again
            const terrainHeight = this.terrainHeight(player.x);
            const { down, up } = player.doProbe(terrainHeight);
            down.then(() => this.addTangent(player));
            const treasureFound = Math.abs(player.x - this.treasureLocation.x) <= TREASURE_SIZE
              / 2;
            down.then(async () => {
              if (treasureFound && !this.isGameOver) {
                console.log("Treasure found - GAME OVER!");
                await this.gameOver(async () => this.showWinSequence(player));
              }
            });

            console.log(`Player ${playerIndex} is probing at:`,
              { x: player.x, y: terrainHeight });
          }
        }
      });
  }

  draw(delta, ts) {
    const { draw, numPlayers } = this.game;
    // Move boats
    // Draw bottom
    // etc...

    const padRemainingTime = num => pad(num, String(this.game.config.maxTime).length, ' ');
    const remainingTimeText = padRemainingTime(Math.ceil(this.remainingTime / 1000.0));
    if(remainingTimeText !== this.$remainingTime.text()) {
      this.$remainingTime.text(remainingTimeText);
    }
    if (this.remainingTime === 0)
      this.$remainingTime.addClass("blinking");

    // The water animation uses SVG animations (via SMIL), so we have to use it's timestamp for
    // animating the boat's rotation and vertical position.
    const waterTs = draw.node.getCurrentTime() * 1000;

    this.players.forEach((player, playerIndex) => {
      const x = player.x;
      const y = WATER_HEIGHT_SCALE * waves.height(x, waterTs / WATER_LOOP_DURATION);
      const slope = WATER_HEIGHT_SCALE * waves.slope(x, waterTs / WATER_LOOP_DURATION);
      const angle = 0.25 * 180 * Math.atan2(slope, draw.width()) / Math.PI;
      // Animating by setting CSS attributes seems to be more efficient than setting SVG attributes
      player.boat.node.style.transform = `rotate(${angle}deg) scale(${player.flipX ? -1 : 1},1)`;
      player.group.node.style.transform = `translate(${x * draw.width()}px,${y}px)`;
    });
  }

  terrainHeight(x) {
    return this.terrainHeightExt(x).value;
  }

  terrainHeightExt(x) {
    const xInArray = (this.terrainHeights.length - 1) * x;
    const tmpIndex = Math.floor(xInArray);
    const i0 = tmpIndex === this.terrainHeights.length - 1 ? tmpIndex - 1 : tmpIndex;
    const i1 = i0 + 1;
    const h0 = this.terrainHeights[i0];
    const h1 = this.terrainHeights[i1];
    const t = xInArray - i0;
    return {
      x: x,
      value: h0 + t * (h1 - h0),
      slope: (h1 - h0) * (this.terrainHeights.length - 1),
    };
  }

  locateTreasure() {
    const argmax = array => [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0);
    const margin = Math.floor(this.terrainHeights.length * TERRAIN_MARGIN_WIDTH) + 1;
    const terrainHeightNoMargin = this.terrainHeights.slice(
      margin,
      this.terrainHeights.length - margin
    );
    const treasureIndex = margin + argmax(terrainHeightNoMargin);
    return {
      x: treasureIndex / (this.terrainHeights.length - 1),
      y: this.terrainHeights[treasureIndex],
    };
  }

  addTangent(player) {
    // Reduce the opacity of previously added tangents of this player
    const offsetMult = (v, factor, offset) => offset + (v - offset) * factor;
    this.tangentGroup.find(player.cssClass)
      .each(function () {
        const o = offsetMult(this.opacity(), TANGENT_OPACITY_FADEOUT_FACTOR, TANGENT_MIN_OPACITY);
        this.animate(TANGENT_OPACITY_FADEOUT_DURATION).opacity(o);
      });

    // Add the new tangent
    const { draw } = this.game;
    const width = draw.width();
    const tangent = this.terrainHeightExt(player.x);
    const { x, value, slope } = tangent;
    const angle = 180 * Math.atan2(slope * TERRAIN_HEIGHT_SCALE, width) / Math.PI;
    this.tangentGroup.line(-width * TANGENT_LENGTH / 2, 0, width * TANGENT_LENGTH / 2, 0,)
      .addClass(player.cssClass)
      .transform({
        translateX: width * x,
        translateY: TERRAIN_HEIGHT_SCALE * value,
        rotate: angle,
      });

    this.tangents.push(tangent);
    this.tangents.sort((a, b) => a.x - b.x);
    this.events.emit('new-tangent', tangent, this.tangents.indexOf(tangent), this.tangents);
  }

  async gameOver(endingSequenceCallback) {
    // The game is now over, so a player that lowered the probe later can not win anymore.
    this.isGameOver = true;

    // Disable all inputs until the ending sequence is over.
    this.discardInputs = true;
    const uncoverGroundPromise = this.uncoverGround();
    await Promise.all(this.players.map(p => p.probingDone()));
    await endingSequenceCallback();
    this.discardInputs = false;
    await uncoverGroundPromise;
  }

  async uncoverGround(duration = UNCOVER_DURATION) {
    const { draw } = this.game;
    if (duration === 0) {
      // uncover immediately
      this.groundCoverLeft.dx(-draw.width());
      this.groundCoverRight.dx(draw.width());
    } else {
      // uncover using an animation
      // (using an animation with duration 0 still takes > 0s for unknown reasons)
      const circularEaseIn = pos => -(Math.sqrt(1 - (pos * pos)) - 1);
      const animateDx = (e, dx) => e.animate(duration).dx(dx);
      const animateDxPromise = (e, dx) => new Promise(resolve => animateDx(e, dx).after(resolve));
      return Promise.all([
        animateDxPromise(this.groundCoverLeft, -draw.width()),
        animateDxPromise(this.groundCoverRight, draw.width())
      ]);
    }
  }

  async showGameStartSequence(firstMessage,
                             secondMessage,
                             secondMessageCallback = Function.prototype,
                             cssClasses = []) {
    const { draw } = this.game;

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const $firstMessageDiv = $('<div>').text(firstMessage);
    const $secondMessageDiv = $('<div>').text(secondMessage)
        .css('visibility', 'hidden');

    const $startSequenceDiv = $('<div class="announcement-sequences-text" />')
        .addClass(cssClasses)
        .append([$firstMessageDiv, $('<br>'), $secondMessageDiv]);

    const top = 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
    const $announcementAnchor = $('<div class="announcement-sequences-text-anchor" />')
        .css({
          left: `50%`,
          top: `${top}%`,
          width: "0px",
          height: "0px",
        });

    await delay(START_SEQUENCE_FST_DELAY);
    this.$endingSequenceContainer.empty().append([$announcementAnchor, $startSequenceDiv]);

    // popper.js places the ending sequence text in a popup-like fashion above the announcement
    // anchor and makes sure that is does not move off the screen if the anchor is to close to a
    // screen edge.
    createPopper(
        $announcementAnchor.get(0),
        $startSequenceDiv.get(0),
        {
          placement: 'top',
        });

    await delay(START_SEQUENCE_AFTER_FST_DELAY);

    $secondMessageDiv.css("visibility", "visible");
    secondMessageCallback();

    await delay(START_SEQUENCE_AFTER_SND_DELAY);
    this.$endingSequenceContainer.empty()
  }

  async showWinSequence(winner) {
    const winAnnouncement = IMAGINARY.i18n.t('win-announcement-begin')
      + (winner.id + 1)
      + IMAGINARY.i18n.t('win-announcement-end');
    const randomElement = arr => arr[Math.floor(Math.random() * (arr.length - 1))];
    const treasure = randomElement(IMAGINARY.i18n.t('treasures'));

    const openTreaureChest = () => {
      this.treasureOpened.show();
      this.treasureClosed.hide();
    }

    await this.showGameOverSequence(
      winAnnouncement,
      treasure,
      openTreaureChest,
      [winner.cssClass]
    );
  }

  async showLoseSequenceTimeIsUp() {
    await this.showGameOverSequence(
      IMAGINARY.i18n.t('time-is-up'),
      IMAGINARY.i18n.t('game-over'),
    );
  }

  async showLoseSequenceNoProbesLeft() {
    await this.showGameOverSequence(
      IMAGINARY.i18n.t('no-probes-left'),
      IMAGINARY.i18n.t('game-over'),
    );
  }

  async showGameOverSequence(firstMessage,
                             secondMessage,
                             secondMessageCallback = Function.prototype,
                             cssClasses = []) {
    const { draw } = this.game;

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const restartMessage = IMAGINARY.i18n.t('press-to-restart');

    const $firstMessageDiv = $('<div>').text(firstMessage);
    const $secondMessageDiv = $('<div>').text(secondMessage)
      .css('visibility', 'hidden');
    const $restartDiv = $('<div class="blinking">').text(restartMessage)
      .css('visibility', 'hidden');

    const $endingSequenceDiv = $('<div class="announcement-sequences-text" />')
      .addClass(cssClasses)
      .append([$firstMessageDiv, $secondMessageDiv, $('<br>'), $restartDiv]);

    const left = 100 * this.treasureLocation.x;
    const top = 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
    const $announcementAnchor = $('<div class="announcement-sequences-text-anchor" />')
      .css({
        left: `${left}%`,
        top: `${top}%`,
        width: "0px",
        height: "0px",
      });

    await delay(ENDING_SEQUENCE_FST_DELAY);
    this.$endingSequenceContainer.empty().append([$announcementAnchor, $endingSequenceDiv]);

    // popper.js places the ending sequence text in a popup-like fashion above the announcement
    // anchor and makes sure that is does not move off the screen if the anchor is to close to a
    // screen edge.
    createPopper(
      $announcementAnchor.get(0),
      $endingSequenceDiv.get(0),
      {
        placement: 'top',
      });

    await delay(ENDING_SEQUENCE_SND_DELAY);
    $secondMessageDiv.css("visibility", "visible");
    secondMessageCallback();

    await delay(ENDING_SEQUENCE_RESTART_DELAY);
    $restartDiv.css("visibility", "visible");
  }
}

function actionPressed(input, lastInput) {
  return input.action && !lastInput.action;
}

function pad(num, places, char) {
  return String(num).padStart(places, char)
}
