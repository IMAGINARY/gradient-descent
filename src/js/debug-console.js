class DebugConsole {
  constructor() {
    this.active = false;
  }

  setActive(state) {
    this.active = state;
  }

  log(...args) {
    if (this.active) {
      console.log(...args);
    }
  }

  assert(...args) {
    console.assert(...args);
  }
}

const singleton = new DebugConsole();
export default singleton;
