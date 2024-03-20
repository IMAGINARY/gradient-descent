import localize from "./i18n";
import debugConsole from './debug-console';

export default class LanguageCycleButton {
  constructor(elementToLocalize, languageCodes) {
    this.elementToLocalize = elementToLocalize;
    this.languageCodes = languageCodes;

    this.languageButton = document.createElement("div");
    this.languageButton.classList.add("language-button");

    this.languageIcon = document.createElement("i");
    this.languageIcon.classList.add("fas", "fa-sm", "fa-language");
    this.languageButton.appendChild(this.languageIcon);

    this.languageButton.onpointerup = () => this.handleLanguageChange();

    this.element = this.languageButton;
  }

  async handleLanguageChange() {
    const currentLangIdx = this.languageCodes.indexOf(IMAGINARY.i18n.getLang());
    const nextLangIdx = (currentLangIdx + 1) % this.languageCodes.length;
    const nextLang = this.languageCodes[nextLangIdx];
    await IMAGINARY.i18n.setLang(nextLang);
    localize(this.elementToLocalize);
    debugConsole.log(`Language switched: ${nextLang}`);
  }
}
