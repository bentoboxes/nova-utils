import { getDefaultHttpOptions } from "./http-options";

export class HttpClient {
  static get(url, options = getDefaultHttpOptions()) {
    options.url = url;
    return this.makeRequest(options);
  }

  static post(url, options = getDefaultHttpOptions()) {
    options.url = url;
    options.method = "POST";
    return this.makeRequest(options);
  }

  static put(url, options = getDefaultHttpOptions()) {
    options.url = url;
    options.method = "PUT";
    return this.makeRequest(options);
  }

  static delete(url, options = getDefaultHttpOptions()) {
    options.url = url;
    options.method = "DELETE";
    return this.makeRequest(options);
  }

  static makeRequest(options) {
    return fetch(options.url, options);
  }
}
