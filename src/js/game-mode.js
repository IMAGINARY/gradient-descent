/**
 * Abstract class for GameMode
 *
 * A GameMode does the actual handling of the input and drawing
 */
export default class GameMode {
  constructor(game) {
    this.game = game;
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
   */
  handleInput() {

  }

  /**
   * Called once per frame so the mode can draw based on the game's state
   */
  draw(ts) {

  }
}
