/* globals IMAGINARY */
import GameMode from './game-mode';
import WavyAnimation from './wavy-animation';

export default class TitleMode extends GameMode {
  async preLoadAssets() {
    this.logoSprite = await this.game.loadSVGSymbol('assets/img/descent-logo.svg');
    this.poly = this.logoSprite.findOne('#descent');
  }

  async handleEnterMode() {
    const { draw } = this.game;
    const pressToStart = document.createElement('div');
    pressToStart.classList.add('blinking', 'text', 'text-center', 'text-vcenter');
    pressToStart.textContent = IMAGINARY.i18n.t('press-to-start');
    this.game.overlay.append(pressToStart);

    const gradientLogo = draw.use(this.logoSprite)
      .size(1200, 400)
      .stroke({ color: '#00368a', width: 2 })
      .fill('transparent')
      .center(1920 / 2, 1080 / 2.5);

    gradientLogo.animate({ duration: 5000 }).stroke({ color: '#34c6ff' });
    this.wavyStep = WavyAnimation(this.logoSprite, { duration: 3500 });

    this.animCounter = 0;
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

  draw(delta,ts) {

    this.wavyStep(delta, ts);
  }
}
