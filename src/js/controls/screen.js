import Controls from "./controls";

/**
 * Component that handles on-screen controls
 *
 * Supports both mouse and multitouch input.
 *
 */
export default class ScreenControls extends Controls {
  /**
   * Constructor
   *
   * @param {Number} count
   *  (Integer) Number of controllers to show
   */
  constructor(count) {
    super(count);
    this.element = document.createElement('div');
    this.element.classList.add('screen-controls');
    this.element.classList.add(`with-${count}-controls`);

    for (let i = 0; i < this.states.length; ++i)
      this.element.appendChild(this.buildControl(i));

    // Global mouseup handling for all buttons
    this.mousePressedButton = null;
    window.addEventListener('mouseup', () => {
      if (this.mousePressedButton !== null) {
        this.modifyState(this.mousePressedButton.id, this.mousePressedButton.name, false);
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
          this.modifyState(id, name, true);
          button.classList.add('active');
        } else {
          this.modifyState(id, name, false);
          button.classList.remove('active');
        }
        ev.preventDefault();
      };

      button.addEventListener('touchstart', checkTouches, { passive: false });
      button.addEventListener('touchmove', checkTouches, { passive: false });
      button.addEventListener('touchend', checkTouches, { passive: false });
      button.addEventListener('touchcancel', checkTouches, { passive: false });

      button.addEventListener('mousedown', () => {
        this.modifyState(id, name, true);
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
}
