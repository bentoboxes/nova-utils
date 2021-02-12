export default class SessionStorageStateAPI {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.isStorageAvailable = this.getIsStorageAvailable();
    if (!this.isStorageAvailable) {
      console.error(
        "Session storage isn't available in this web browser. Aborting ..."
      );
    }
    this.state = this.getState();
  }

  get isDataValid() {
    return (
      this.isStorageAvailable &&
      this.isStorageKeyValid &&
      this.isParserAvailable
    );
  }

  get isStorageKeyValid() {
    return this.isStringValid(this.storageKey);
  }

  get isParserAvailable() {
    return window && window.JSON;
  }

  getIsStorageAvailable() {
    return window && window.sessionStorage;
  }

  getState() {
    if (this.isDataValid) {
      let data = sessionStorage.getItem(this.storageKey);
      let state = this.parseData(data);
      return this.isObjectValid(state) ? state : {};
    }
  }

  parseData(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
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

  save() {
    if (this.isDataValid) {
      let value = this.stringify(this.state);
      sessionStorage.setItem(this.storageKey, value);
    }
    return this;
  }

  stringify(data) {
    return JSON.stringify(data);
  }

  isStringValid(str) {
    return typeof str === "string" && str.trim() !== "";
  }

  isObjectValid(obj) {
    return obj !== null && typeof obj === "object";
  }
}
