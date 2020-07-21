/* globals IMAGINARY */
import GameMode from './game-mode';

export default class MenuMode extends GameMode {

  constructor(game) {
    super(game);
  }

  async handleEnterMode() {
    const $overlay = $(this.game.overlay);

    const menuItems = this.getMenuItems();

    this.selectedIndex = this.getDefaultItemIndex();
    $('<div class="text text-center menu-title" />')
      .text(this.getMenuTitle())
      .appendTo($overlay);
    const $selector = $('<div class="menu-selector" />')
      .addClass(`menu-selector-with-${menuItems.length}`)
      .appendTo($overlay);
    for (let i = 0; i < menuItems.length; ++i) {
      $('<div class="item" />')
        .addClass(`item-${i}`)
        .toggleClass('selected', this.selectedIndex === i)
        .text(menuItems[i])
        .appendTo($selector);
    }
    this.$selectorItems = $selector.children();
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    const clampIndex = i => Math.max(0, Math.min(i, this.$selectorItems.length - 1));

    for (let i = 0; i < inputs.length; ++i) {
      const [input, lastInput] = [inputs[i], lastInputs[i]];

      if (input.direction !== 0 && input.direction * lastInput.direction <= 0) {
        this.$selectorItems.eq(this.selectedIndex).removeClass('selected');
        this.selectedIndex = clampIndex(this.selectedIndex + input.direction);
        this.$selectorItems.eq(this.selectedIndex).addClass('selected');
      }

      if (input.action && !lastInput.action) {
        this.processSelection(this.selectedIndex);
        this.triggerEvent('done');
        break;
      }
    }
  }

  /**
   * Get the menu title.
   *
   * Overwrite this method in a subclass to provide the menu title.
   * I will be called whenever this game mode is entered to also reflect possible language changes.
   *
   * @returns {string}
   */
  getMenuTitle() {
    return "Menu"
  }

  /**
   * Get the menu items.
   *
   * Overwrite this method in a subclass to provide the list of menu items.
   * I will be called whenever this game mode is entered to also reflect possible language changes.
   *
   *  @returns {string[]}
   */
  getMenuItems() {
    return ['One', 'Two'];
  }

  /**
   * Get the index of the default menu item. This can be used to preselect menu items in subclasses.
   *
   * @returns {number}
   */
  getDefaultItemIndex() {
    return 0;
  }

  processSelection(itemIndex) {
  }
}
