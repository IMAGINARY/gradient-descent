/* eslint-disable class-methods-use-this,no-unused-vars,no-empty-function */
import EventEmitter from 'events';

/**
 * Abstract class for GameMode
 *
 * A GameMode does the actual handling of the input and drawing
 */
export default class GameMode {
  /**
   * Constructor
   *
   * @param {GradientDescentGame} game
   */
  constructor(game) {
    // noinspection JSUnusedGlobalSymbols
    this.game = game;
    this.events = new EventEmitter();
  }

  /**
   * Preload any external assets that will be needed during the game
   *
   * This method runs during game initialization.
   * @return {Promise<void>}
   */
  async preLoadAssets() {

  }

  /**
   * Called by the game when the mode is entered.
   *
   * Can be used to add DOM elements, event handlers and initialize
   * internal state. Anything done here must be cleaned up in
   * handleExitMode.
   */
  async handleEnterMode() {

  }

  /**
   * Called by the game when the mode is going to be exited
   *
   * Should be used to remove DOM elements, event handlers
   * or anything else that was created on handleEnterMode.
   */
  async handleExitMode() {

  }

  /**
   * Called once per frame so the mode can handle controller input
   *
   * Current input state and the previous one are passed
   * to help with state change detection.
   *
   * Both are arrays with N objects with shape:
   * - direction {integer}: Either -1, 0 or 1.
   * - action {bool}
   *
   * @param {[{direction: Number, action: Boolean}]} inputs
   * @param {[{direction: Number, action: Boolean}]} lastInputs
   * @param {Number} delta
   *  Amount of milliseconds since the last call (capped to a maximum)
   * @param {Number} ts
   *  Timestamp received via requestAnimationFrame

   *
   */
  handleInputs(inputs, lastInputs, delta, ts) {

  }

  /**
   * Called once per frame so the mode can draw based on the game's state
   *
   * @param {Number} delta
   *  Amount of milliseconds since the last call (capped to a maximum)
   * @param {Number} ts
   *  Timestamp received via requestAnimationFrame
   */
  draw(delta, ts) {

  }

  /**
   * Triggers an event for the game to handle
   *
   * Events can be used to transition to another mode, etc.
   *
   * @param {string} name
   */
  triggerEvent(name) {
    this.events.emit(name);
  }
}
