/* globals IMAGINARY */
import MenuMode from './game-mode-menu';

const BOT_TYPE_ORDER = ['none', 'random', 'tangent-intersection'];

export default class BotTypeMode extends MenuMode {
  getMenuTitle() {
    return IMAGINARY.i18n.t('choose-bot-type');
  }

  getMenuItems() {
    const botTypeStrings = IMAGINARY.i18n.t('bot-types');
    return BOT_TYPE_ORDER.map(key => botTypeStrings[key]);
  }

  processSelection(selectedIndex) {
    super.processSelection(selectedIndex);
    this.game.botType = BOT_TYPE_ORDER[selectedIndex];
  }
}
