/* globals IMAGINARY */
import GameMode from './game-mode';

export default class TitleMode extends GameMode {
  async preLoadAssets() {

  }

  async handleEnterMode() {
    const { svg } = this.game;
    const pressToStart = document.createElement('div');
    pressToStart.classList.add('blinking', 'text', 'text-center', 'text-vcenter');
    pressToStart.textContent = IMAGINARY.i18n.t('press-to-start');
    this.game.overlay.append(pressToStart);
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInput(input, lastInput) {
    // If any button was pressed
    if (input
      .find((ctrl, i) => ctrl.action && !lastInput[i].action)) {
      this.triggerEvent('done');
    }
  }

  draw(delta, ts) {
    // Move boats
    // Draw bottom
    // etc...
  }
}
