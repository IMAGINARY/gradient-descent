import PlayMode from './game-mode-play';
import { localeInit } from './i18n';

// todo: The constants below were copied from game-mode-play.js
//  but they really should be exported by the PlayMode class
const WATER_DISTANCE = 260;
const TERRAIN_DISTANCE = 300;

class DemoGame {
  constructor(propOverrides) {
    this.propOverrides = propOverrides;
  }

  get(target, prop, receiver) {
    if (this.propOverrides[prop] !== undefined) {
      return this.propOverrides[prop];
    }
    return Reflect.get(...arguments);
  }
}

export default class DemoMode extends PlayMode {
  constructor(game, options) {
    const config = {...game.config, ...{
      maxProbes: Infinity,
      maxTime: Infinity,
    }};
    const demoGame = new Proxy(game, new DemoGame({
      config,
      numPlayers: 0,
      botType: 'tangent-intersection',
    }));
    super(demoGame);
    this.options = {...DemoMode.defaultOptions, ...options};
  }

  async handleEnterMode() {
    await super.handleEnterMode();
    this.remainingTime = this.options.duration;
    this.showDemoText();
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    const { numPlayers } = this.game;

    if (inputs.find((ctrl, i) => ctrl.action && !lastInputs[i].action)) {
      this.demoOver();
      this.triggerEvent('done');
      return;
    }

    // Update remaining time
    const newRemainingTime = Math.max(0, this.remainingTime - delta);
    if (this.remainingTime !== newRemainingTime) {
      this.remainingTime = newRemainingTime;
    }
    if (this.remainingTime === 0) {
      this.demoOver();
      this.triggerEvent('timeout');
      return;
    }

    // Discard inputs that don't belong to an active player
    inputs = inputs.slice(0, numPlayers);
    lastInputs = lastInputs.slice(0, numPlayers);

    if (this.bot !== null) {
      const { input, lastInput } = PlayMode.buildBotInput(this.bot);
      inputs.push(input);
      lastInputs.push(lastInput);
    }

    // Regular move & probe logic
    this.processInputs(inputs, lastInputs, delta, ts);
  }

  async gameOver(endingSequenceCallback) {
    // Do nothing. The demo cannot be won.
  }

  async demoOver() {
    await Promise.all(this.players.map(p => p.probingDone()));
  }

  async showGameStartSequence() {
    return null;
  }

  showDemoText() {
    const { draw } = this.game;
    const top = 100 * (WATER_DISTANCE * 1.3 ) / draw.height();
    this.$demoExplanationContainer = $('<div>')
      .addClass('demo-explanation')
      .css('top', `${top}%`)
      .appendTo(this.$overlay);
    localeInit(this.$demoExplanationContainer, 'demo-explanation');

    this.$pressToStart = $('<div>')
      .addClass('title-press-to-start')
      .appendTo(this.$overlay);
    localeInit(this.$pressToStart,'press-to-start');
  }
}

DemoMode.defaultOptions = {
  duration: 15 * 1000,
};
