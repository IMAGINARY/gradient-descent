/* globals IMAGINARY */
import GameMode from './game-mode';

export default class PlayerNumberMode extends GameMode {
  async preLoadAssets() {
  }

  async handleEnterMode() {
    const $overlay = $(this.game.overlay);
    const { maxPlayers } = this.game.config;

    this.selectedNumber = 1;
    this.selectorItems = {};
    $('<div class="text text-center numPlayers-title" />')
      .text(IMAGINARY.i18n.t('choose-num-players'))
      .appendTo($overlay);
    const $selector = $('<div class="numPlayers-selector" />')
      .addClass(`numPlayers-selector-with-${maxPlayers}`)
      .appendTo($overlay);
    for (let i = 1; i <= maxPlayers; i += 1) {
      this.selectorItems[i] = $('<div class="item" />')
        .addClass(`item-${i}`)
        .toggleClass('selected', this.selectedNumber === i)
        .text(i)
        .appendTo($selector);
    }
  }

  async handleExitMode() {
    // Cleanup timers, etc. created on handleEnterMode
  }

  handleInput(input, lastInput) {
    const { maxPlayers } = this.game.config;

    let newSelection = null;
    if (input.find((ctrl, i) => (
      ctrl.direction === -1 && lastInput[i].direction !== -1))) {
      newSelection = Math.max(1, this.selectedNumber - 1);
    } else if (input.find((ctrl, i) => (
      ctrl.direction === 1 && lastInput[i].direction !== 1))) {
      newSelection = Math.min(maxPlayers, this.selectedNumber + 1);
    }

    if (newSelection && newSelection !== this.selectedNumber) {
      this.selectorItems[this.selectedNumber].removeClass('selected');
      this.selectorItems[newSelection].addClass('selected');
      this.selectedNumber = newSelection;
    }

    // If any button was pressed
    if (input
      .find((ctrl, i) => ctrl.action && !lastInput[i].action)) {
      this.game.numPlayers = this.selectedNumber;
      this.triggerEvent('done');
    }
  }

  draw(ts) {
    // Move boats
    // Draw bottom
    // etc...
  }
}
