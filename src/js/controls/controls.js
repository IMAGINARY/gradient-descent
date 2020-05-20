/**
 * Component that handles gamepad controls
 *
 */
export default class Controls {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to handle
   */
  constructor(count) {
    this.states = Array(count)
      .fill(null)
      .map(_ => ({
        left: false,
        right: false,
        action: false,
      }));
    this.statesModified = false;
  }

  /**
   * Builds a single on-screen controller
   *
   * @protected
   */
  modifyState(id, key, value) {
    if (this.states[id][key] !== value) {
      this.states[id][key] = value;
      this.statesModified = true;
    }
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
   *   action: Boolean
   * }]}
   */
  getStates() {
    if (this.statesModified) {
      const result = this.states;
      this.states = this.states.map(s => Object.assign({}, s)); // immutability: use cloned array for future changes
      this.statesModified = false;
      return result;
    } else {
      return this.states;
    }
  }
}
