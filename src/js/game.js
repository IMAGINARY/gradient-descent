/* globals SVG */
import PlayMode from './game-mode-play';
import ScreenControls from './screen-controls';

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

    this.input = [];
    this.inputLast = [];
    this.initInput();

    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;

    this.screenControls = null;
    this.debugControlsPane = null;
  }

  /**
   * Initializes the app and downloads any external assets
   *
   * @return {Promise<void>}
   */
  async init() {
    this.svg = SVG().addTo(this.container);
    if (this.config.useScreenControls) {
      this.screenControls = new ScreenControls(this.config.maxPlayers);
      this.container.appendChild(this.screenControls.element);
    }

    if (this.config.debugControls) {
      this.debugControlsPane = document.createElement('div');
      this.debugControlsPane.classList.add('debug-pane');
      this.debugControlsPane.classList.add('debug-pane-controls');
      this.container.appendChild(this.debugControlsPane);
    }

    await this.registerMode('play', new PlayMode(this));

    const preloaders = Object.entries(this.modes)
      .map(async ([, mode]) => mode.preLoadAssets());
    await Promise.all(preloaders);

    await this.setMode('play');
  }

  /**
   * Initializes the input state
   *
   * @private
   */
  initInput() {
    this.input = Array(this.config.maxPlayers).fill(null).map(() => ({
      direction: 0, action: false,
    }));
  }

  /**
   * Reads the input state from all enabled controller types
   *
   * Loads the new input state in this.input and the previous
   * state in this.inputLast.
   *
   * @private
   */
  readInput() {
    this.inputLast = this.input;
    this.initInput();
    if (this.screenControls) {
      this.screenControls.getState().forEach((ctrl, i) => {
        if (ctrl.left) {
          this.input[i].direction = -1;
        }
        if (ctrl.right) {
          this.input[i].direction = 1;
        }
        this.input[i].action = this.input[i].action || ctrl.action;
      });
    }
    if (this.config.useGamepads) {
      Array.from(navigator.getGamepads())
        .forEach((gp, i) => {
          if (gp !== null) {
            if (gp.axes[0] < -0.5) {
              this.input[i].direction = -1;
            }
            if (gp.axes[0] > 0.5) {
              this.input[i].direction = 1;
            }
            this.input[i].action = this.input[i].action
              || gp.buttons[1].pressed || gp.buttons[2].pressed;
          }
        });
    }
    if (this.debugControlsPane) {
      this.debugControlsPane.textContent = this.input.map((ctrl, i) => (
        `C${i}: d=${ctrl.direction} a=${ctrl.action ? 'T' : 'F'}`
      )).join('\u00a0\u00a0\u00a0\u00a0'); // four &nbsp;
    }
  }

  /**
   * Game loop
   */
  run() {
    const gameLoop = (ts) => {
      if (!this.isPaused) {
        this.readInput();
        this.currentMode.handleInput(this.input, this.inputLast);
        this.currentMode.draw(ts);

        window.requestAnimationFrame(gameLoop);
      }
    };
    window.requestAnimationFrame(gameLoop);
  }

  /**
   * Pauses the game.
   *
   * While paused the main game loop not run.
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resumes the game.
   *
   * Enables the main game loop.
   */
  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.run();
    }
  }

  /**
   * Registers a game mode
   *
   * @private
   * @param {string} id
   *  A name that identifies the mode
   * @param {GameMode} mode
   *  A GameMode subclass
   * @return {Promise<void>}
   */
  async registerMode(id, mode) {
    this.modes[id] = mode;
  }

  /**
   * Changes the current game mode
   *
   * @param {string} modeID
   *  Name of a previously registered mode
   * @return {Promise<void>}
   */
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
