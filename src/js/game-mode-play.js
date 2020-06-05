import GameMode from './game-mode';
import terrain from './terrain';
import * as waves from './waves';

const WATER_HEIGHT_SCALE = 10;
const NUM_WATER_POINTS = 300;
const WATER_DISTANCE = 200;
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

const TREASURE_SIZE = 0.03;

const UNCOVER_DURATION = 2000;
const ENDING_SEQUENCE_DELAY = 1000;
const ENDING_SEQUENCE_TREASURE_DELAY = 1000;

export default class PlayMode extends GameMode {

  constructor(game) {
    super(game);
    const wavesPoints = Array(NUM_WATER_POINTS).fill(null);
    this.wavesPoints = t => waves.points(wavesPoints, t, game.draw.width(), WATER_HEIGHT_SCALE);
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
    const { draw, numPlayers } = this.game;

    const modeGroup = draw.group()
      .addClass('play')
      .addClass('draw')
      .translate(0, WATER_DISTANCE);

    // Create a boat for each player
    this.players = Array(numPlayers)
      .fill(null)
      .map((_, playerIndex) => {
        const x = (playerIndex + 1) / (numPlayers + 1);
        const group = modeGroup.group();
        group
          .addClass(`player-${playerIndex}`)
          .transform({ translateX: x * draw.width() });

        const boat = group.use(this.shipSymbol)
          .center(0, BOAT_DRAFT);

        const probeParent = group.group();
        const probe = probeParent.group();
        probe.line(0, -draw.height(), 0, -PROBE_SIZE / 2);
        probe.circle(PROBE_SIZE).center(0, 0);
        probe.transform({ translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST });

        // Clip the probe such that only the part below the boat is visible.
        const probeClip = probeParent.rect(PROBE_SIZE * 4, draw.height())
          .move(-PROBE_SIZE * 2, BOAT_DRAFT);
        probeParent.clipWith(probeClip);

        return {
          id: playerIndex,
          group: group,
          boat: boat,
          probe: probe,
          x: x,
          flipX: false,
          probing: false,
        };
      });

    this.water = modeGroup.group()
      .polyline(this.wavesPoints(0))
      .addClass('water');

    this.groundGroup = modeGroup.group();
    const terrainOptions = { marginWidth: TERRAIN_MARGIN_WIDTH };
    const terrainHeights = terrain(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
    const terrainPoints = terrainHeights.map((h, i) => [
      draw.width() * (i / (terrainHeights.length - 1)),
      TERRAIN_HEIGHT_SCALE * h,
    ]);
    this.terrainHeights = terrainHeights;
    this.treasureLocation = this.locateTreasure();
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


    this.ground = this.groundGroup.polyline(terrainPoints)
      .addClass('ground')
      .translate(0, TERRAIN_DISTANCE)
      .hide();

    behindGroundGroup.clipWith(this.groundGroup.use(this.ground));

    this.groundClip = this.groundGroup.clip();
    this.groundGroup.clipWith(this.groundClip);

    this.tangents = modeGroup.group()
      .translate(0, TERRAIN_DISTANCE);
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    // Move the boats or check if they're lowering the probe
    const { draw, numPlayers } = this.game;
    inputs
      .slice(0, numPlayers) // discard inputs that don't belong to an active player
      .forEach((input, playerIndex) => {
        const player = this.players[playerIndex];
        if (!player.probing) {
          player.x += SPEED_FACTOR * (delta * input.direction);
          player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x), 1.0 - TERRAIN_MARGIN_WIDTH);
          player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;
          if (input.action && !lastInputs[playerIndex].action) {
            // Switch to probe mode
            player.probing = true;
            // Lower the probe, wait and raise it again
            const terrainHeight = this.terrainHeight(player.x);
            const probeHeight = TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * terrainHeight;
            const probeDuration = probeHeight * (PROBE_MIN_DURATION / TERRAIN_DISTANCE);
            const runnerDown = player.probe
              .animate(probeDuration, 0, 'now')
              .transform({ translateY: probeHeight })
              .after(() => this.addGroundClip(player.x))
              .after(() => this.addTangent(player));
            if (Math.abs(player.x - this.treasureLocation.x) <= TREASURE_SIZE / 2)
              runnerDown
                .after(() => this.uncoverGround())
                .after(() => this.showGameOverSequence(player));
            const runnerUp = runnerDown.animate(probeDuration, PROBE_DELAY)
              .transform({ translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST })
              .after(() => player.probing = false);
            console.log(`Player ${playerIndex} is probing at:`, { x: player.x, y: terrainHeight });
          }
        }
      });
  }

  draw(delta, ts) {
    const { draw, numPlayers } = this.game;
    // Move boats
    // Draw bottom
    // etc...

    this.water.plot(this.wavesPoints(ts / WATER_LOOP_DURATION));

    this.players.forEach((player, playerIndex) => {
      const x = player.x;
      const y = WATER_HEIGHT_SCALE * waves.height(x, ts / WATER_LOOP_DURATION);
      const slope = WATER_HEIGHT_SCALE * waves.slope(x, ts / WATER_LOOP_DURATION);
      const angle = 0.25 * 180 * Math.atan2(slope, draw.width()) / Math.PI;
      const boatTransform = {
        rotate: angle,
      };
      if (player.flipX)
        boatTransform.flip = 'x';
      player.boat.transform(boatTransform);
      player.group.transform({
        translateX: x * draw.width(),
        translateY: y
      });
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
      value: h0 + t * (h1 - h0),
      slope: (h1 - h0) * (this.terrainHeights.length - 1),
    };
  }

  locateTreasure() {
    const argmax = array => [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0);
    const treasureIndex = argmax(this.terrainHeights);
    return {
      x: treasureIndex / (this.terrainHeights.length - 1),
      y: this.terrainHeights[treasureIndex],
    };
  }

  addTangent(player) {
    const { draw } = this.game;
    const width = draw.width();
    const { value, slope } = this.terrainHeightExt(player.x);
    const angle = 180 * Math.atan2(slope * TERRAIN_HEIGHT_SCALE, width) / Math.PI;
    this.tangents.line(-width * TANGENT_LENGTH / 2, 0, width * TANGENT_LENGTH / 2, 0,)
      .addClass(`player-${player.id}`)
      .transform({
        translateX: width * player.x,
        translateY: TERRAIN_HEIGHT_SCALE * value,
        rotate: angle,
      });
  }

  addGroundClip(x) {
    const { draw } = this.game;
    const w = draw.width();
    const h = draw.height();
    const rect = this.groundClip
      .polygon([[-w, -h], [w, -h], [w, h], [-w, h]])
      .center(draw.width() * x, 0)
      .transform({ scaleX: 0.001 });
    this.groundClip.add(rect);
  }

  async uncoverGround() {
    const { draw } = this.game;
    this.ground.show();
    const treasureSpotlight = this.groundClip.circle(2 * TREASURE_SIZE * draw.width())
      .center(
        draw.width() * this.treasureLocation.x,
        TERRAIN_DISTANCE + TERRAIN_HEIGHT_SCALE * this.treasureLocation.y
      );

    // Move the treasure spotlight up a bit so it doesn't point at the treasure location on the
    // curve, but rather at the treasure chest
    treasureSpotlight.dy(-2 * 0.3 * TREASURE_SIZE * draw.width());

    const uncoverGround = clip => new Promise(resolve => {
      clip.animate(UNCOVER_DURATION)
        .ease(pos => -(Math.sqrt(1 - (pos * pos)) - 1))
        .transform({ scaleX: 1.0 })
        .after(resolve);
    });
    return Promise.all(this.groundClip.children().map(uncoverGround));
  }

  async showGameOverSequence(winner) {
    const { draw } = this.game;
    const $overlay = $(this.game.overlay);

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const treasureAnnouncement = IMAGINARY.i18n.t('treasure-announcement-begin')
      + (winner.id + 1)
      + IMAGINARY.i18n.t('treasure-announcement-end');
    const randomElement = arr => arr[Math.floor(Math.random() * (arr.length - 1))];
    const treasureString = randomElement(IMAGINARY.i18n.t('treasures'));

    const $treasureAnnouncement = $("<div>").text(treasureAnnouncement);
    const $treasureString = $("<div>").text(treasureString).css("visibility", "visible")
      .css('visibility', 'hidden');

    const $inner = $(`<div class="ending-sequences-text player-${winner.id}" />`)
      .append([$treasureAnnouncement, $treasureString]);

    const left = 100 * this.treasureLocation.x;
    const bottom = 100 - 100 * (WATER_DISTANCE + TERRAIN_DISTANCE) / draw.height();
    const $outer = $('<div class="ending-sequences-text-container">')
      .css({ left: `${left}%`, bottom: `${bottom}%` })
      .append($inner);

    await delay(ENDING_SEQUENCE_DELAY);
    $overlay.empty().append($outer);

    await delay(ENDING_SEQUENCE_TREASURE_DELAY);
    $treasureString.css("visibility", "visible");
    this.treasureOpened.show();
    this.treasureClosed.hide();
  }
}
