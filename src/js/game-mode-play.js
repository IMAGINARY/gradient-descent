import GameMode from './game-mode';


export default class PlayMode extends GameMode {
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

    // todo: remove (temporary)
    window.myBoats = this.boats;
    group.line(0, 0, draw.width(), 0)
      .addClass('water');
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
