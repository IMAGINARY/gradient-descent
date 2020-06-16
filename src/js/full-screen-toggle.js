export default class FullScreenToggle {
  constructor() {
    this.fullScreenButton = document.createElement('div');
    this.fullScreenButton.classList.add('fullscreen-button');

    this.expandIcon = document.createElement('i');
    this.expandIcon.classList.add('fas', 'fa-sm', 'fa-expand');
    this.fullScreenButton.appendChild(this.expandIcon);

    this.compressIcon = document.createElement('i');
    this.compressIcon.classList.add('fas', 'fa-compress');
    this.fullScreenButton.appendChild(this.compressIcon);

    window.addEventListener('fullscreenchange', () => this.fullScreenChangeHandler());
    this.fullScreenChangeHandler();

    this.fullScreenButton.onpointerup = () => this.toggleFullScreen();

    this.element = this.fullScreenButton;
  }

  fullScreenChangeHandler() {
    this.expandIcon.style.display = document.fullscreenElement ? 'none' : 'block';
    this.compressIcon.style.display = !document.fullscreenElement ? 'none' : 'block';
  }

  toggleFullScreen() {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        document.exitFullscreen().catch(err => console.log(err));
      }
    } else {
      console.log('Your browser cannot use fullscreen right now');
    }
  }
}
