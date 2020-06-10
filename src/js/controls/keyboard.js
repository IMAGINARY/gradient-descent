import Controls from "./controls";

const keyMap = {
  'ArrowLeft': { id: 0, prop: 'left' },
  'ArrowRight': { id: 0, prop: 'right' },
  'ArrowDown': { id: 0, prop: 'action' },
  'Space': { id: 0, prop: 'action' },
  'KeyA': { id: 1, prop: 'left' },
  'KeyD': { id: 1, prop: 'right' },
  'KeyS': { id: 1, prop: 'action' },
};
const keyCodes = Object.keys(keyMap);

/**
 * Certain default actions like scrolling should be prevented for the keys used for the game.
 */
function preventDefaultActionForKeys(e) {
  if (keyCodes.includes(e.code))
    e.preventDefault();
}

/**
 * Component that handles keyboard controls
 *
 * Supports up to two players at the moment.
 *
 */
export default class KeyboardControls extends Controls {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  constructor(count) {
    super(count);

    const keyCallback = ev => {
      const key = keyMap[ev.code];
      if (key && key.id < count)
        this.modifyState(key.id, key.prop, ev.type === 'keydown');
    };

    window.addEventListener('keydown', keyCallback);
    window.addEventListener('keyup', keyCallback);
    window.addEventListener("keydown", preventDefaultActionForKeys, false);
  }
}
