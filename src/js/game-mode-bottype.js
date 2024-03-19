/* globals IMAGINARY */
import MenuMode from './game-mode-menu';

const BOT_TYPE_ORDER = ['none', 'random', 'gradient-descent', 'tangent-intersection'];

export default class BotTypeMode extends MenuMode {
  getMenuTitleKeys() {
    return ['choose-bot-type', this.game.config.botTypeLabels];
  }

  getMenuItems() {
    const keysPrefix = ['bot-types', this.game.config.botTypeLabels];
    return BOT_TYPE_ORDER.map(key => [...keysPrefix, key]);
  }

  getMenuItemTips() {
    if (this.game.config.showBotTypeTips) {
      const keysPrefix = ['bot-types', this.game.config.botTypeLabels];
      return BOT_TYPE_ORDER.map(key => [...keysPrefix, `${key}-tip`]);
    }
    return null;
  }

  getDefaultItemIndex() {
    const index = BOT_TYPE_ORDER.indexOf(this.game.botType);
    return index !== -1 ? index : 0;
  }

  processSelection(selectedIndex) {
    super.processSelection(selectedIndex);
    this.game.botType = BOT_TYPE_ORDER[selectedIndex];
  }
}
