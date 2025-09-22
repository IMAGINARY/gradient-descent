/* globals IMAGINARY */
import GameMode from './game-mode';
import {localeInit} from "./i18n";

const NUM_PARAGRAPHS = 3;

export default class MenuMode extends GameMode {

  constructor(game) {
    super(game);
  }

  handleEnterMode() {
    super.handleEnterMode();
    const $overlay = $(this.game.overlay);

    const $infoWrapper = $("<div>").addClass('info-wrapper').appendTo($overlay);
    const $info = $("<div>").addClass('info').addClass('text').addClass('text-center').appendTo($infoWrapper);

    const $infoFontSizeContainer = $("<div>").addClass('info-font-size-container').appendTo($info);

    const $title = $("<h1>").addClass("info-title").appendTo($infoFontSizeContainer);
    localeInit($title, "info", "title");

    const $paragraphs = $("<div>").addClass("info-paragraphs").appendTo($infoFontSizeContainer);

    for(let i = 0; i < NUM_PARAGRAPHS; i++) {
      const $paragraph = $('<p>').addClass('info-paragraph').appendTo($paragraphs)
      localeInit($paragraph,"info", "paragraphs", i);
    }

    const pressToRestart = $('<div>').addClass('info-press-to-restart').appendTo($info);
    localeInit(pressToRestart,'press-to-restart');
  }

  handleInputs(inputs, lastInputs, delta, ts) {
    for (let i = 0; i < inputs.length; ++i) {
      const [input, lastInput] = [inputs[i], lastInputs[i]];

      if (input.action && !lastInput.action) {
        this.triggerEvent('done');
        break;
      }
    }
  }
}
