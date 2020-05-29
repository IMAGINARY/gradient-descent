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

    const group = draw.group()
      .addClass('play')
      .translate(0, 200);

    // Create a boat for each player
    this.boats = Array(numPlayers)
      .fill(null)
      .map(() => group.use(this.shipSymbol));

    // Set the boats properties
    this.boats.forEach((boat, playerIndex) => boat.size(300, 200)
      .addClass(`boat-${playerIndex}`)
      .center(draw.width() * ((playerIndex + 1) / (numPlayers + 1)), -35)
    );

    this.water = group.polyline(this.wavesPoints(0))
      .addClass('water')
      .scale(draw.width(), WATER_HEIGHT_SCALE, 0, 0);

    const terrainOptions = { marginWidth: TERRAIN_MARGIN_WIDTH };
    const terrainHeights = terrain(MAX_TERRAIN_EXTREMA, NUM_TERRAIN_POINTS, terrainOptions);
    const terrainPoints = terrainHeights.map((h, i) => [i / (terrainHeights.length - 1), h]);
    this.ground = group.polyline(terrainPoints)
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
    const leftMargin = TERRAIN_MARGIN_WIDTH * draw.width();
    const rightMargin = (1.0 - TERRAIN_MARGIN_WIDTH) * draw.width();
    inputs
      .slice(0, numPlayers) // discard inputs that don't belong to an active player
      .forEach((input, playerIndex) => {
        const cx = this.boats[playerIndex].cx() + delta * input.direction;
        this.boats[playerIndex].cx(Math.min(Math.max(leftMargin, cx), rightMargin));
        if (input.direction !== 0)
          this.boats[playerIndex].attr({ 'data-flip': input.direction === -1 })
      });
  }

  draw(delta, ts) {
    const { draw, numPlayers } = this.game;
    // Move boats
    // Draw bottom
    // etc...

    this.water.plot(this.wavesPoints(ts));

    this.boats.forEach((boat, playerIndex) => {
      const x = boat.cx() / draw.width();
      const y = WATER_HEIGHT_SCALE * waves.height(x, ts);
      const slope = WATER_HEIGHT_SCALE * waves.slope(x, ts);
      const angle = 0.25 * 180 * Math.atan2(slope, draw.width()) / Math.PI;
      const transform = {
        translateY: y,
        rotate: angle,
      };
      if (boat.attr('data-flip') === 'true')
        transform.flip = 'x';
      boat.transform(transform);
    });
  }
}
