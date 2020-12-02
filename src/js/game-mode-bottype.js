/* globals IMAGINARY */
import MenuMode from './game-mode-menu';

const BOT_TYPE_ORDER = ['none', 'random', 'gradient-descent', 'tangent-intersection'];

export default class BotTypeMode extends MenuMode {
  getMenuTitle() {
    return IMAGINARY.i18n.t('choose-bot-type')[this.game.config.botTypeLabels];
  }

  getMenuItems() {
    const botTypeStrings = IMAGINARY.i18n.t('bot-types')[this.game.config.botTypeLabels];
    console.log(botTypeStrings);
    return BOT_TYPE_ORDER.map(key => botTypeStrings[key]);
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
