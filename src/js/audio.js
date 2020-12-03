import { Howl } from 'howler';

const SOUND_FADE_DURATION = 250;
const MUSIC_FADE_DURATION = 500;

const SILENCE_DATA_URI = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';

class Loader {
  constructor(loadFunc) {
    this._loadFunc = loadFunc;
    this._cache = {};
  }

  async load(obj) {
    const id = JSON.stringify(obj);
    this._cache[id] ??= this._loadFunc(obj);
    return await this._cache[id];
  }
}


class Sound {
  constructor(loadedHowl) {
    this._howl = loadedHowl;
    this._howl.on('fade', id => this._howl.stop(id));
    this._howl.on('stop', id => Sound._playingSounds.delete(id));
    this._howl.on('end', id => Sound._playingSounds.delete(id));
  }

  play() {
    const id = this._howl.play();
    const isPlaying = () => this._howl.playing(id);
    const stop = () => {
      if (isPlaying()) {
        const v = this._howl.volume(id);
        this._howl.fade(v, 0.0, v * SOUND_FADE_DURATION, id);
      }
    }

    const playingSound = { isPlaying, stop };
    Sound._playingSounds.set(id, playingSound);

    return playingSound;
  }

  static stop() {
    Sound._playingSounds.forEach(ps => ps.stop());
  }

  static async create(resources) {
    resources = typeof resources === 'string' ? [resources] : resources;
    return await Sound._loader.load(resources);
  }
}

Sound._loader = new Loader(preloadSound);
Sound._playingSounds = new Map();

class Loop {
  constructor(loadedHowl) {
    this._howl = loadedHowl;
    this._howl.on('fade', id => this._howl.stop(id));
    this._isPlaying = false;
    this._id = null;
  }

  play() {
    if (!this._isPlaying) {
      this._isPlaying = true;
      this._id = this._howl.play();
    }
  }

  stop() {
    if (this._isPlaying) {
      this._isPlaying = false;
      if (this._id !== null) {
        const v = this._howl.volume(this._id);
        this._howl.fade(v, 0.0, v * MUSIC_FADE_DURATION, this._id);
        this._id = null;
      }
    }
  }

  isPlaying() {
    return this._isPlaying;
  }
}

class MusicController {
  constructor() {
    this._loader = new Loader(preloadLoop);
    this._loops = {
      0: new Loop(new Howl({ src: [SILENCE_DATA_URI], preload: true, loop: true })),
    };
    this._currentLoopId = 0;
    this._counter = 0;
  }

  isPlaying(id) {
    const loop = this._loops[id];
    if (typeof loop === 'undefined') {
      return false;
    } else {
      return loop.isPlaying();
    }
  }

  play(id = this._currentLoopId) {
    if (this._currentLoopId !== id) {
      const currentLoop = this._loops[this._currentLoopId];
      currentLoop.stop();
    }

    this._currentLoopId = id;
    const newLoop = this._loops[id];
    if (!newLoop.isPlaying()) {
      newLoop.play();
    } else {
      // Keep playing the current loop
    }
  }

  stop(id) {
    if (typeof id === 'undefined' || id === this._currentLoopId) {
      this._loops[this._currentLoopId].stop();
    }
  }

  async addLoop(resources) {
    const id = ++this._counter;
    this._loops[id] = await this._loader.load(resources);
    return id;
  }
}

class Music {
  constructor(id) {
    this._id = id;
  }

  get name() {
    return this._id;
  }

  isPlaying() {
    return Music._controller.isPlaying(this._id);
  }

  play() {
    Music._controller.play(this._id);
  }

  playFromStart() {
    this.play();
    this.stop();
  }

  stop() {
    Music._controller.stop(this._id);
  }

  static stop() {
    Music._controller.stop();
  }

  static async create(resources) {
    resources = typeof resources === 'string' ? [resources] : resources;
    const id = await Music._controller.addLoop(resources);
    return new Music(id);
  }
}

Music._controller = new MusicController();

async function preloadSound(resources) {
  const loadedHowl = await preloadHowl({ src: resources, loop: false });
  return new Sound(loadedHowl);
}

async function preloadLoop(resources) {
  const loadedHowl = await preloadHowl({ src: resources, loop: true });
  return new Loop(loadedHowl);
}

async function preloadHowl(howlOptions) {
  const howl = new Howl({ ...howlOptions, preload: false });
  await new Promise((resolve, reject) => {
    howl.once('load', resolve);
    howl.once('loaderror', reject);
    howl.load();
  });
  return howl;
}

export default class Jukebox {
  static async registerSound(name, resources) {
    if (typeof this._sounds[name] !== 'undefined') {
      throw new Error(`Sound with name ${name} already registered.`);
    } else {
      return this._sounds[name] = await Sound.create(resources);
    }
  }

  static hasSound(name) {
    return typeof this._sounds[name] !== 'undefined';
  }

  static getSound(name) {
    return this._sounds[name];
  }

  static async registerMusic(name, resources) {
    if (typeof this._musics[name] !== 'undefined') {
      throw new Error(`Music with name ${name} already registered.`);
    } else {
      return this._musics[name] = await Music.create(resources);
    }
  }

  static hasMusic(name) {
    return typeof this._musics[name] !== 'undefined';
  }

  static getMusic(name) {
    return this._musics[name];
  }
}

Jukebox._sounds = {};
Jukebox._musics = {};

export { Sound, Music, Jukebox };
