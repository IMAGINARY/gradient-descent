import GameMode from './game-mode';

export default class PlayMode extends GameMode {
  async handleEnterMode() {
    // Init state (boat positions, etc.)
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInput() {
    // Move the boats or check if they're lowering the probe
  }

  draw(ts) {
    // Draw sea
    // Draw boats
    // Draw bottom
    // etc...

  }
}
