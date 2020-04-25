/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
 *
 */
export default class ScreenControls {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  constructor(count) {
    this.element = document.createElement('div');
    this.element.classList.add('screen-controls');
    this.element.classList.add(`with-${count}-controls`);
    this.state = [];

    // Initialize the state of each controller
    for (let i = 0; i < count; i += 1) {
      this.state.push({
        left: false,
        right: false,
        action: false,
      });
      this.element.appendChild(this.buildControl(i));
    }

    // Global mouseup handling for all buttons
    this.mousePressedButton = null;
    window.addEventListener('mouseup', () => {
      if (this.mousePressedButton !== null) {
        this.state[this.mousePressedButton.id][this.mousePressedButton.name] = false;
        this.mousePressedButton.element.classList.remove('active');
        this.mousePressedButton = null;
      }
    });
  }

  /**
   * Builds a single on-screen controller
   *
   * @private
   * @param {Number} id
   *  Zero-based integer index of the controller
   * @return {HTMLDivElement}
   */
  buildControl(id) {
    const root = document.createElement('div');
    root.classList.add('screen-control', `screen-control-${id}`);

    const newButton = (name) => {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add(name);

      const checkTouches = (ev) => {
        if (ev.targetTouches.length > 0) {
          this.state[id][name] = true;
          button.classList.add('active');
        } else {
          this.state[id][name] = false;
          button.classList.remove('active');
        }
        ev.preventDefault();
      };

      button.addEventListener('touchstart', checkTouches, { passive: false });
      button.addEventListener('touchmove', checkTouches, { passive: false });
      button.addEventListener('touchend', checkTouches, { passive: false });
      button.addEventListener('touchcancel', checkTouches, { passive: false });

      button.addEventListener('mousedown', () => {
        this.state[id][name] = true;
        button.classList.add('active');
        this.mousePressedButton = {
          id,
          name,
          element: button,
        };
      });

      return button;
    };

    root.appendChild(newButton('left'));
    root.appendChild(newButton('action'));
    root.appendChild(newButton('right'));

    return root;
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
  getState() {
    return this.state;
  }
}
