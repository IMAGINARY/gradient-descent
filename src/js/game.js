/* globals SVG */
import PlayMode from './game-mode-play';

/**
 * The main application
 *
 * This class creates the main UI elements and runs the
 * main game loop (read input, draw).
 *
 * The game can be in one of various modes (see GameMode)
 * which decides how to draw and process input.
 */
export default class GradientDescentGame {
  constructor(container, config) {
    this.container = container;
    this.config = config;
    this.input = [
      { direction: 0, button: false },
      { direction: 0, button: false },
    ];
    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;
  }

  /**
   * Initializes the app and downloads any external assets
   *
   * @return {Promise<void>}
   */
  async init() {
    this.svg = SVG().addTo(this.container);

    this.registerMode('play', new PlayMode(this));

    this.setMode('play');
  }

  /**
   * Game loop
   */
  run() {
    const gameLoop = (ts) => {
      if (!this.isPaused) {
        // To do: Read input from virtual and real gamepads
        this.currentMode.handleInput();
        this.currentMode.draw(ts);

        window.requestAnimationFrame(gameLoop);
      }
    };
    window.requestAnimationFrame(gameLoop);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.run();
  }

  registerMode(id, mode) {
    this.modes[id] = mode;
  }

  async setMode(modeID) {
    this.pause();

    if (this.currentMode) {
      await this.currentMode.handleExitMode();
    }
    if (this.modes[modeID] === undefined) {
      throw new Error(`Can't change to unknown mode ${modeID}`);
    }
    this.currentMode = this.modes[modeID];
    await this.currentMode.handleEnterMode();

    this.resume();
  }
}
