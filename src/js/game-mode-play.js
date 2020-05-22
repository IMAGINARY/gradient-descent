import GameMode from './game-mode';

// TODO: static properties of individual players should be defined globally, maybe even via CSS
const playerColors = [
  '#0000FF',
  '#FF0000',
  '#00FF00',
  '#ffff00',
];

export default class PlayMode extends GameMode {
  async preLoadAssets() {
    this.shipSymbol = await this.game.loadSVGSymbol('assets/img/ship.svg');
  }

  async handleEnterMode() {
    const { draw, numPlayers } = this.game;
    const canvasWidth = 1920;

    draw.line(0, 200, canvasWidth, 200).stroke({ color: '#9999ff', width: 10 });

    // Create a boat for each player
    this.boats = Array(numPlayers)
      .fill(null)
      .map(() => draw.use(this.shipSymbol));

    // Set the boats properties
    this.boats.forEach((boat, playerIndex) => boat.size(300, 200)
      .stroke({ color: playerColors[playerIndex % playerColors.length], width: 10 })
      .fill('transparent')
      .center(canvasWidth * ((playerIndex + 1) / (numPlayers + 1)), 165)
    );

    // todo: remove (temporary)
    window.myBoats = this.boats;
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    // Move the boats or check if they're lowering the probe
    const { numPlayers } = this.game;
    inputs
      .slice(0, numPlayers) // discard inputs that don't belong to an active player
      .forEach((input, playerIndex) => this.boats[playerIndex].dmove(delta * input.direction, 0));
  }

  draw(delta, ts) {
    const { draw, numPlayers } = this.game;
    // Move boats
    // Draw bottom
    // etc...
  }
}
