/* globals IMAGINARY */
import GameMode from './game-mode';
import {localeInit} from "./i18n";

export default class MenuMode extends GameMode {

  constructor(game) {
    super(game);
  }

  handleEnterMode() {
    super.handleEnterMode();
    const $overlay = $(this.game.overlay);

    const menuItemsSpecs = this.getMenuItems();
    const menuItemTipsSpecs = this.getMenuItemTips();

    this.selectedIndex = this.getDefaultItemIndex();
    const $menuTitle = $('<div class="text text-center menu-title" />')
        .appendTo($overlay);
    localeInit($menuTitle, ...this.getMenuTitleKeys());
    const $selector = $('<div class="menu-selector" />')
        .addClass(`menu-selector-with-${menuItemsSpecs.length}`)
        .appendTo($overlay);
    // Build menu items
    for (let i = 0; i < menuItemsSpecs.length; ++i) {
      const menuItemSpec = menuItemsSpecs[i];
      const $menuItem = $('<div class="item" />')
          .addClass(`item-${i}`)
          .toggleClass('selected', this.selectedIndex === i)
          .appendTo($selector);

      if (typeof menuItemSpec === 'string') {
        $menuItem.text(menuItemSpec);
      } else if (Array.isArray(menuItemSpec)) {
        localeInit($menuItem, ...menuItemSpec);
      } else {
        console.error(`Menu item ${i} must be of type (string|string[])[].`);
      }
    }
    this.$selectorItems = $selector.children();
    if (menuItemTipsSpecs) {
      this.$menuTip = $('<div class="text text-center menu-tip" />')
        .appendTo($overlay);
      this.updateMenuTip();
    }
  }

  updateMenuTip() {
    if (this.$menuTip) {
      const tipsSpec = this.getMenuItemTips();
      if (typeof tipsSpec === 'string') {
        this.$menuTip.text(tipsSpec[this.selectedIndex]);
      } else if (Array.isArray(tipsSpec)) {
        localeInit(this.$menuTip, ...tipsSpec[this.selectedIndex]);
      }
    }
  }

  handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
    super.handleExitMode();
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    const clampIndex = i => Math.max(0, Math.min(i, this.$selectorItems.length - 1));

    for (let i = 0; i < inputs.length; ++i) {
      const [input, lastInput] = [inputs[i], lastInputs[i]];

      if (input.direction !== 0 && input.direction * lastInput.direction <= 0) {
        this.$selectorItems.eq(this.selectedIndex).removeClass('selected');
        this.selectedIndex = clampIndex(this.selectedIndex + input.direction);
        this.$selectorItems.eq(this.selectedIndex).addClass('selected');
        this.updateMenuTip();
      }

      if (input.action && !lastInput.action) {
        this.processSelection(this.selectedIndex);
        this.triggerEvent('done');
        break;
      }
    }
  }

  /**
   * Get the menu title i18n key.
   *
   * Overwrite this method in a subclass to provide the menu title.
   * I will be called whenever this game mode is entered.
   *
   * @returns {string[]}
   */
  getMenuTitleKeys() {
    return ["menu"];
  }

  /**
   * Get the menu items.
   *
   * Overwrite this method in a subclass to provide the list of menu items.
   * I will be called whenever this game mode is entered to also reflect possible language changes.
   *
   *  @returns {(string|string[])[]} Either an array of strings to use as labels or and an array of arrays of strings
   *                                 that will be used as keys into the i18n database.
   */
  getMenuItems() {
    return ['One', 'Two'];
  }

  /**
   * Get the menu item tips.
   *
   * Menu items tips are longer descriptions about each menu item that are shown when the user
   * moves through them.
   *
   * Overwrite this method in a subclass to provide the list of menu item tips.
   * I will be called whenever this game mode is entered to also reflect possible language changes.
   *
   * @returns {null|(string|string[])[]}
   *  Either an array of strings to use as labels or and an array of arrays of strings
   *  that will be used as keys into the i18n database. Can be null if no tips are available.
   */
  getMenuItemTips() {
    return null;
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
