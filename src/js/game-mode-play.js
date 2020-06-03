import GameMode from './game-mode';
import terrain from './terrain';
import * as waves from './waves';

const WATER_HEIGHT_SCALE = 10;
const NUM_WATER_POINTS = 300;

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

const UNCOVER_DURATION = 3000;

export default class PlayMode extends GameMode {

  constructor(game) {
    super(game);
    const wavesPoints = Array(NUM_WATER_POINTS).fill(null);
    this.wavesPoints = ts => waves.points(wavesPoints, ts, game.draw.width(), WATER_HEIGHT_SCALE);
  }

  async preLoadAssets() {
    this.shipSymbol = await this.game.loadSVGSymbol('assets/img/ship.svg');
    this.shipSymbol.attr({ overflow: 'visible' });
  }

  async handleEnterMode() {
    const { draw, numPlayers } = this.game;

    const modeGroup = draw.group()
      .addClass('play')
      .translate(0, 200);

    // Create a boat for each player
    this.players = Array(numPlayers)
      .fill(null)
      .map((_, playerIndex) => {
        const x = (playerIndex + 1) / (numPlayers + 1);
        const group = modeGroup.group();
        group
          .addClass(`boat-${playerIndex}`)
          .transform({ translateX: x * draw.width() });

        const boat = group.use(this.shipSymbol);
        boat.size(300, 200)
          .center(0, -35)

        const probeParent = group.group();
        const probe = probeParent.group();
        probe.line(0, -draw.height(), 0, -PROBE_SIZE / 2);
        probe.circle(PROBE_SIZE).center(0, 0);
        probe.transform({ translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST });

        // Clip the probe such that only the part below the boat is visible.
        const probeClip = probeParent.rect(PROBE_SIZE * 4, draw.height())
          .move(-PROBE_SIZE * 2, 20);
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
      .addClass('water')

    this.groundGroup = modeGroup.group();
    const terrainOptions = { marginWidth: TERRAIN_MARGIN_WIDTH };
    const terrainHeights = terrain(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
    const terrainPoints = terrainHeights.map((h, i) => [
      draw.width() * (i / (terrainHeights.length - 1)),
      TERRAIN_HEIGHT_SCALE * h,
    ]);
    this.terrainHeights = terrainHeights;
    this.treasureLocation = this.locateTreasure();

    const behindGroundGroup = this.groundGroup.group();
    const treasure = behindGroundGroup.rect(40, 20)
      .move(-20, -20)
      .fill('red')
      .transform({
        translateX: this.treasureLocation.x * draw.width(),
        translateY: TERRAIN_DISTANCE + this.treasureLocation.y * TERRAIN_HEIGHT_SCALE,
      });

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
          if (input.action) {
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
              runnerDown.animate(PROBE_DELAY / 2)
                .after(() => this.uncoverGround());
            const runnerUp = runnerDown.animate(probeDuration, PROBE_DELAY)
              .transform({ translateY: TERRAIN_DISTANCE * PROBE_DISTANCE_AT_REST })
              .after(() => player.probing = false);
          }
        }
      });
  }

  draw(delta, ts) {
    const { draw, numPlayers } = this.game;
    // Move boats
    // Draw bottom
    // etc...

    this.water.plot(this.wavesPoints(ts));

    this.players.forEach((player, playerIndex) => {
      const x = player.x;
      const y = WATER_HEIGHT_SCALE * waves.height(x, ts);
      const slope = WATER_HEIGHT_SCALE * waves.slope(x, ts);
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
      .addClass(`boat-${player.id}`)
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
    this.ground.show();
    const uncoverGround = clip => new Promise(resolve => {
      clip.animate(UNCOVER_DURATION)
        .transform({ scaleX: 1.0 })
        .after(resolve);
    });
    return Promise.all(this.groundClip.children().map(uncoverGround));
  }
}
