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

export default class PlayMode extends GameMode {

  constructor(game) {
    super(game);
    const wavesPoints = Array(NUM_WATER_POINTS).fill(null);
    this.wavesPoints = ts => waves.points(wavesPoints, ts);
  }

  async preLoadAssets() {
    this.shipSymbol = await this.game.loadSVGSymbol('assets/img/ship.svg');
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

        const probe = group.group();
        probe.line(0, 20, 0, 100 - PROBE_SIZE / 2);
        probe.circle(PROBE_SIZE)
          .center(0, 100);

        return {
          group: group,
          boat: boat,
          probe: probe,
          x: x,
          flipX: false,
        };
      });

    this.water = modeGroup.polyline(this.wavesPoints(0))
      .addClass('water')
      .scale(draw.width(), WATER_HEIGHT_SCALE, 0, 0);

    const terrainOptions = { marginWidth: TERRAIN_MARGIN_WIDTH };
    const terrainHeights = terrain(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
    const terrainPoints = terrainHeights.map((h, i) => [i / (terrainHeights.length - 1), h]);
    this.ground = modeGroup.polyline(terrainPoints)
      .addClass('ground')
      .scale(draw.width(), TERRAIN_HEIGHT_SCALE, 0, 0)
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
        player.x += SPEED_FACTOR * (delta * input.direction);
        player.x = Math.min(Math.max(TERRAIN_MARGIN_WIDTH, player.x), 1.0 - TERRAIN_MARGIN_WIDTH);
        player.flipX = input.direction === 0 ? player.flipX : input.direction === -1;
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
}
