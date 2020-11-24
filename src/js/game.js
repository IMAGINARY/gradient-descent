/* globals SVG */
import "@wessberg/pointer-events";

import PlayMode from './game-mode-play';
import TitleMode from './game-mode-title';
import PlayerNumberMode from './game-mode-numplayers';
import GamepadControls from "./controls/gamepad";
import ScreenControls from './controls/screen';
import KeyboardControls from "./controls/keyboard";
import FullScreenToggle from './full-screen-toggle';
import BotTypeMode from './game-mode-bottype';

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

    this.inputs = this.createInputs();
    this.inputsLast = this.createInputs();

    this.animationFrameRequestId = 0;
    this.gameLoop = null;
    this.isPaused = false;
    this.modes = {};
    this.currentMode = null;

    this.controls = {};
    this.debugControlsPane = null;

    this.botType = this.config.botType;
    this.numPlayers = this.config.maxPlayers;

    this.map = config.map;
  }

  /**
   * Initializes the app and downloads any external assets
   *
   * @return {Promise<void>}
   */
  async init() {
    const [width, height] = [1920, 864];

    const minAspectRatioContainer = document.createElement('div')
    minAspectRatioContainer.classList.add('min-aspect-ratio');
    this.container.append(minAspectRatioContainer);

    const viewContainer = document.createElement('div');
    viewContainer.classList.add('game-view');
    minAspectRatioContainer.append(viewContainer);

    this.svgDoc = SVG().addTo(viewContainer);
    this.svgDoc
      .viewbox(0, 0, width, height)
      .attr('preserveAspectRatio', 'xMinYMin meet');

    this.draw = this.svgDoc.nested().size(width, height);

    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    minAspectRatioContainer.append(this.overlay);

    if (this.config.useScreenControls) {
      this.controls.screen = new ScreenControls(this.config.maxPlayers);
      minAspectRatioContainer.appendChild(this.controls.screen.element);
    }
    if (this.config.useGamepads) {
      this.controls.gamepad = new GamepadControls(this.config.maxPlayers);
    }

    if (this.config.fullScreenButton) {
      this.fullScreenToggle = new FullScreenToggle();
      minAspectRatioContainer.appendChild(this.fullScreenToggle.element);
    }

    if (this.config.useKeyboardControls) {
      this.controls.keyboard = new KeyboardControls(this.config.maxPlayers);
    }

    if (this.config.debugControls) {
      this.debugControlsPane = document.createElement('div');
      this.debugControlsPane.classList.add('debug-pane');
      this.debugControlsPane.classList.add('debug-pane-controls');
      minAspectRatioContainer.appendChild(this.debugControlsPane);
    }

    await this.registerMode('title', new TitleMode(this));
    await this.registerMode('bottype', new BotTypeMode(this));
    await this.registerMode('numplayers', new PlayerNumberMode(this));
    await this.registerMode('play', new PlayMode(this));

    if (this.config.continuousGame) {
      this.transition('play', 'done', 'play');
      await this.setMode('play');
    } else {
      const showBotType = this.config.botType === null;
      const showNumPlayers = this.config.maxPlayers > 1;

      const afterNumPlayers = showBotType ? 'bottype' : 'play';
      const afterTitle = showNumPlayers ? 'numplayers' : afterNumPlayers;

      this.transition('title', 'done', afterTitle);
      this.transition('numplayers', 'done', afterNumPlayers);
      this.transition('bottype', 'done', 'play');
      this.transition('play', 'done', 'title');
      await this.setMode('title');
    }
  }

  /**
   * Loads an external SVG file into a symbol within the main svg element
   *
   * @param {string} uri
   * @param {boolean} clearStyles
   *  If true removes the style elements from the file
   * @return {Promise<SVG.Symbol>}
   */
  async loadSVGSymbol(uri, clearStyles = true) {
    const response = await fetch(uri);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Server returned status ${response.status} (${response.statusText}) loading ${uri}.`);
    }
    const newSymbol = this.svgDoc.symbol().svg(await response.text());
    if (clearStyles) {
      newSymbol.find('style').forEach(s => s.remove());
    }

    return newSymbol;
  }

  /**
   * Initializes the input state
   *
   * @private
   */
  initInputs() {
    this.inputs = this.createInputs();
  }

  createInputs() {
    return Array(this.config.maxPlayers)
      .fill(null)
      .map(() => ({ direction: 0, action: false }));
  }

  /**
   * Reads the input state from all enabled controller types
   *
   * Loads the new input state in this.input and the previous
   * state in this.inputLast.
   *
   * @private
   */
  readInputs() {
    this.inputsLast = this.inputs;
    const states = Object.values(this.controls).map(c => c.getStates());
    const inputReducer = (accInput, curState) => ({
      direction: curState.right ? 1 : (curState.left ? -1 : accInput.direction),
      action: curState.action || accInput.action,
    });
    this.inputs = this.createInputs().map(
      (input, i) => states.map(s => s[i]).reduce(inputReducer, input)
    );

    if (this.debugControlsPane) {
      this.debugControlsPane.textContent = this.inputs.map((ctrl, i) => (
        `C${i}: d=${ctrl.direction} a=${ctrl.action ? 'T' : 'F'}`
      )).join('\u00a0\u00a0\u00a0\u00a0'); // four &nbsp;
    }
  }

  /**
   * Game loop
   */
  run() {
    window.cancelAnimationFrame(this.animationFrameRequestId);
    if (!this.gameLoop) {
      let lastTs = 0;
      let lag = 0;
      const MAX_DELTA = 125;
      this.gameLoop = (ts) => {
        if (!this.isPaused) {
          this.readInputs();
          lag += Math.max(0, (ts - lag) - lastTs - MAX_DELTA);
          ts -= lag;
          const delta = ts - lastTs;
          this.currentMode.handleInputs(this.inputs, this.inputsLast, delta, ts);
          this.currentMode.draw(delta, ts);
          lastTs = ts;
          
          this.animationFrameRequestId = window.requestAnimationFrame(this.gameLoop);
        }
      };
    }
    this.animationFrameRequestId = window.requestAnimationFrame(this.gameLoop);
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
    await mode.preLoadAssets();
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
    this.draw.clear();
    this.overlay.innerHTML = '';
    await this.currentMode.handleEnterMode();

    this.resume();
  }

  transition(modeId, event, nextModeId = null, callback = null) {
    if (this.modes[modeId] === undefined) {
      throw new Error(`Can't define transition from unknown game mode '${modeId}'`);
    }
    if (nextModeId && this.modes[nextModeId] === undefined) {
      throw new Error(`Can't define transition to unknown game mode '${nextModeId}'`);
    }
    this.modes[modeId].events.on(event, () => {
      if (this.currentMode !== this.modes[modeId]) {
        throw new Error(`Mode ${modeId} triggered the event ${event} while not active. Something was not cleaned up?`);
      }
      if (nextModeId !== null) {
        this.setMode(nextModeId);
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }

  /**
   * Set a custom sea floor map that will be used the next time the play mode is entered.
   *
   * @param map {number[]|null} An array containing distance values between 0 and 1. 0 is closest
   *  to the water surface, 1 is farthest away from the water surface. The map will only be used if
   *  it contains at least distance values (distances at the left and right edge). If {null} is
   *  provided, no custom map will be used and a new map will be generated each time the game
   *  restarts.
   */
  setMap(map) {
    this.map = (!Array.isArray(map) || map.length < 2) ? null : map;
  }

  async showSeaFloor(animate = true) {
    if (this.currentMode && typeof this.currentMode.uncoverGround === 'function') {
      if (animate)
        await this.currentMode.uncoverGround();
      else
        await this.currentMode.uncoverGround(0);
    }
  }
}
