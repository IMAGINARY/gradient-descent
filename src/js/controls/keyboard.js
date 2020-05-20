import Controls from "./controls";

const keyMap = {
  'ArrowLeft': { id: 0, prop: 'left' },
  'ArrowRight': { id: 0, prop: 'right' },
  'ArrowDown': { id: 0, prop: 'action' },
  'KeyA': { id: 1, prop: 'left' },
  'KeyD': { id: 1, prop: 'right' },
  'KeyS': { id: 1, prop: 'action' },
};

/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
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
  }
}
