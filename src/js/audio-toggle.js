import Jukebox from './audio';

export default class AudioToggle {
  constructor() {
    this.audioButton = document.createElement('div');
    this.audioButton.classList.add('audio-button');

    this.muteIcon = document.createElement('i');
    this.muteIcon.classList.add('fas', 'fa-sm', 'fa-volume-up');
    this.audioButton.appendChild(this.muteIcon);

    this.unmuteIcon = document.createElement('i');
    this.unmuteIcon.classList.add('fas', 'fa-volume-mute');
    this.audioButton.appendChild(this.unmuteIcon);

    const listener = this.audioChangeHandler.bind(this);
    Jukebox.on('mute', listener);
    Jukebox.on('unmute', listener);
    Jukebox.on('unlock', listener);
    this.audioChangeHandler();

    this.audioButton.onpointerup = () => this.tryToggleAudio();

    this.element = this.audioButton;
  }

  _isOn() {
    return !Jukebox.isMuted() && Jukebox.isUnlocked();
  }

  audioChangeHandler() {
    const isOn = this._isOn();
    this.muteIcon.style.display = !isOn ? 'none' : 'block';
    this.unmuteIcon.style.display = isOn ? 'none' : 'block';
  }

  tryToggleAudio() {
    Jukebox.mute(this._isOn());
  }
}
