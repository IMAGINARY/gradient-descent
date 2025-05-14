import PlayMode from './game-mode-play';
import { localeInit } from './i18n';

const PAGE_COUNT = 3;
const LINE_COUNT = 2;
// todo: The constant below was copied from game-mode-play.js
//  but they really should be exported by the PlayMode class
const WATER_DISTANCE = 260;

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
    this.currPage = 0;
  }

  handleEnterMode() {
    super.handleEnterMode();
    this.elapsedTime = 0;
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
    this.elapsedTime = this.elapsedTime + delta;
    if (this.elapsedTime > this.options.duration) {
      this.demoOver();
      this.triggerEvent('timeout');
      return;
    }

    const expectedPage = Math.floor((this.elapsedTime / this.options.duration) * PAGE_COUNT);
    if (expectedPage !== this.currPage) {
      this.setPage(expectedPage);
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

    this.$demoExplanationPages = [];
    // Todo: This below should be more flexible, but there are potential
    //  problems with how i18n is currently handled.
    for (let i = 0; i < PAGE_COUNT; i += 1) {
      const $page = $('<div>')
        .addClass('demo-explanation-page')
        .appendTo(this.$demoExplanationContainer);
      if (i === 0) {
        $page.addClass(['active', 'first']);
      }
      this.$demoExplanationPages.push($page);
      for (let j = 0; j < LINE_COUNT; j += 1) {
        const $line = $('<div>').addClass('line').appendTo($page);
        localeInit($line, 'demo-explanation', i, j);
      }
    }

    this.$pressToStart = $('<div>')
      .addClass('title-press-to-start')
      .appendTo(this.$overlay);
    localeInit(this.$pressToStart,'press-to-start');
  }

  setPage(pageNumber) {
    this.currPage = pageNumber;
    this.$demoExplanationPages.forEach(($page, i) => {
      if (i === pageNumber) {
        $page.addClass('active');
      } else {
        if ($page.hasClass('active')) {
          $page.removeClass('active');
          $page.addClass('leave');
        }
      }
    });
  }
}

DemoMode.defaultOptions = {
  duration: 18 * 1000,
};
