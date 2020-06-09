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
    pressToStart.classList.add('title-press-to-start');
    pressToStart.textContent = IMAGINARY.i18n.t('press-to-start');
    this.game.overlay.append(pressToStart);

    const colorBegin = '#00368a';
    const colorEnd = '#34c6ff';

    const gradientLogo = draw.use(this.logoSprite)
      .size(1200, 400)
      .stroke({ color: colorBegin, width: 2 })
      .fill('transparent')
      .center(1920 / 2, 1080 / 2.5);
    const gradientText = this.logoSprite.findOne('#gradient')
      .stroke('none')
      .fill(colorEnd)
      .opacity(0);

    gradientText.animate({ duration: 7000 }).opacity(1);
    gradientLogo.animate({ duration: 5000 }).stroke({ color: colorEnd });
    this.wavyStep = WavyAnimation(this.logoSprite, { duration: 3500 });

    this.animCounter = 0;
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode

    // The animation must be set to its final state such that it can restart properly
    // when this mode is re-entered.
    this.wavyStep(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
  }

  handleInputs(inputs, lastInputs, delta, ts0) {
    // If any button was pressed
    if (inputs
      .find((ctrl, i) => ctrl.action && !lastInputs[i].action)) {
      this.triggerEvent('done');
    }
  }

  draw(delta, ts) {

    this.wavyStep(delta, ts);
  }
}
