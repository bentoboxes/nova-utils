export default class BrowserHistoryStateAPI {
  constructor() {
    this.isStorageAvailable = this.getIsStorageAvailable();
    if (!this.isStorageAvailable) {
      console.error(
        "Browser history API isn't available in this web browser. Aborting ..."
      );
    }
    this.state = this.getState() || {};
  }

  get isDataValid() {
    return this.isStorageAvailable;
  }

  getIsStorageAvailable() {
    return window && window.history;
  }

  getState() {
    if (this.isDataValid) {
      let state = history.state;
      return this.isObjectValid(state) ? state : {};
    }
  }

  add(key, value) {
    if (this.isStringValid(key)) {
      this.state[key] = value;
    } else {
      console.error("The key must be a valid string");
    }
    return this;
  }

  get(key) {
    if (this.isStringValid(key)) {
      return this.state[key];
    } else {
      console.error("The key must be a valid string");
    }
  }

  remove(key) {
    if (this.isStringValid(key)) {
      delete this.state[key];
    } else {
      console.error("The key must be a valid string");
    }
    return this;
  }

  replace(state) {
    if (this.isObjectValid(state)) {
      this.state = { ...state };
    } else {
      console.error("The state must be a valid object");
    }
    return this;
  }

  clear() {
    this.state = {};
  }

  get currentURL() {
    return new URL(window.location).toString();
  }

  save() {
    if (this.isDataValid) {
      let title = this.state.title || "";
      let url = this.state.url || this.currentURL;
      let state = {
        ...this.state,
        url,
        title
      };
      history.replaceState(state, title, url);
    }
    return this;
  }

  isStringValid(str) {
    return typeof str === "string" && str.trim() !== "";
  }

  isObjectValid(obj) {
    return obj !== null && typeof obj === "object";
  }
}
