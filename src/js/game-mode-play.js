import GameMode from './game-mode';

export default class PlayMode extends GameMode {
  async preLoadAssets() {
    this.shipSymbol = await this.game.loadSVGSymbol('assets/img/ship.svg');
  }

  async handleEnterMode() {
    // Init state (boat positions, etc.)
    const { svg } = this.game;
    // Draw sea
    svg.line(0, 200, 1920, 200).stroke({ color: '#9999ff', width: 2 });
    this.boat = svg.use(this.shipSymbol)
      .size(300, 200)
      .stroke({ color: '#ff0000', width: 2 })
      .fill('transparent')
      .center(300, 165);
    window.myBoat = this.boat;
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInput(input, lastInput) {
    // Move the boats or check if they're lowering the probe
  }

  draw(ts) {
    // Move boats
    // Draw bottom
    // etc...
  }
}
