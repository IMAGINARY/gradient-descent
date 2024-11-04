import Controls from "./controls";

/**
 * Component that handles gamepad controls
 *
 */
export default class GamepadControls extends Controls {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  constructor(count) {
    super(count);
  }

  updateState() {
    // clone the current state such state objects are immutable
    this.states = [...this.states];
    Array.from(navigator.getGamepads())
      .filter(gp => gp !== null && gp.index < this.states.length)
      .forEach(gp => {
        this.modifyState(gp.index, "left", gp.axes[0] < -0.5 || (gp.buttons[14]?.pressed ?? false));
        this.modifyState(gp.index, "right", gp.axes[0] > 0.5 || (gp.buttons[15]?.pressed ?? false));
        this.modifyState(gp.index, "action", (gp.buttons[1]?.pressed ?? false) || (gp.buttons[2]?.pressed ?? false));
        this.modifyState(gp.index, "language", (gp.buttons[8]?.pressed ?? false) || (gp.buttons[9]?.pressed ?? false));
      });
  }

  /**
   * Returns state of all controllers
   *
   * State is returned as an array with one object per controller
   * with properties indicating the state of each button.
   *
   * @return {[{
   *   left: Boolean,
   *   right: Boolean,
   *   action: Boolean,
   *   language: Boolean,
   * }]}
   */
  getStates() {
    this.updateState();
    return super.getStates();
  }
}
