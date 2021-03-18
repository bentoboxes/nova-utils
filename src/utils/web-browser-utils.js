/** Utilities related to the web browser */
class WebBrowserUtils {
  /**
   * Returns the version of Internet Explorer {7|8|9|10|etc..} or a -1
   * (indicating the use of another browser).
   * @static
   * @return {number} The Internet Explorer version as number
   */
  static getInternetExplorerVersion() {
    let rv = -1; // indicating the use of another browser.
    if (navigator.appName === "Microsoft Internet Explorer") {
      const ua = navigator.userAgent;
      const re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }

  /**
   * Returns the cookie value by cookie name
   * @static
   * @param {string} cookieName - The name of the cookie to get its value
   * @return {string} The cookie value
   */
  // eslint-disable-next-line max-statements
  static getCookie(cookieName) {
    let cookieValue = document.cookie;
    let cookieStart = cookieValue.indexOf(" " + cookieName + "=");

    if (cookieStart === -1) {
      cookieStart = cookieValue.indexOf(cookieName + "=");
    }
    if (cookieStart === -1) {
      cookieValue = null;
    } else {
      cookieStart = cookieValue.indexOf("=", cookieStart) + 1;
      let cookieEnd = cookieValue.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = cookieValue.length;
      }
      cookieValue = unescape(cookieValue.substring(cookieStart, cookieEnd));
    }
    return cookieValue;
  }

  /**
   * Creates a new cookie setting a value and defining an expiration time when it is a cookie session.
   * @static
   * @param {string} cookieName - The name of the cookie to be created
   * @param {string} cookieValue - The value of the cookie
   * @param {boolean} cookieSession - If it is a cookie session or not
   */
  static createCookie(cookieName, cookieValue, cookieSession) {
    const date = new Date();
    const expirationTime = 730 * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + expirationTime);
    const expires =
      cookieSession === true ? "" : "; expires=" + date.toUTCString();

    cookieValue = escape(cookieValue) + expires;
    cookieValue =
      cookieValue + ";domain=" + document.location.hostname + ";path=/";
    document.cookie = cookieName + "=" + cookieValue;
  }

  /**
   * Deletes a cookie given the cookie name
   * @static
   * @param {string} cookieName - The name of the cookie to be deleted
   */
  static deleteCookie(cookieName) {
    // In order to delete a cookie set the expires date to something in the past. A function that does this
    // would be.
    document.cookie =
      cookieName + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  /**
   * Gets all the query string parameters as a key-value object.
   * This is an "impure" method since it uses the global "window.location" object
   * @static
   * @return {object} - An object with the params or empty if not params were detected
   */
  static getQueryStringParamsAsObject() {
    const params = window.location.search.substr(1).split("&");

    if (params.length === 0) {
      return {};
    }

    const output = {};

    for (let i = 0; i < params.length; ++i) {
      // param => paramName=paramValue
      const paramAsArray = params[i].split("=");

      if (paramAsArray.length === 2) {
        output[paramAsArray[0]] = decodeURIComponent(
          paramAsArray[1].replace(/\+/g, " ")
        );
      }
    }
    return output;
  }

  /**
   * Transforms a params object in a query string like output
   *
   * -> const input = { "name": "John", "lastName": "Doe", "email": "john.doe@example.com" };
   * -> const output = NovaUtils.WebBrowserUtils.transformParamsObjectToQueryString(input);
   *
   * -> "name=John&lastName=Doe&email=john.doe@example.com"
   *
   * @param paramsObject - The object to transform
   * @param useDecodeURIComponent - A boolean indicating if the method should use "decodeURIComponent"
   * @default true
   * @return {string} - The query string compatible output
   */
  static transformParamsObjectToQueryString(
    paramsObject,
    useDecodeURIComponent = true
  ) {
    const urlParams = new URLSearchParams(Object.entries(paramsObject));

    if (useDecodeURIComponent) {
      return decodeURIComponent(urlParams.toString());
    }

    return urlParams.toString();
  }

  static hasCookie(key) {
    let cookie = WebBrowserUtils.getCookie(key) || "";
    return cookie.length > 0;
  }

  static setCookie(data) {
    document.cookie = WebBrowserUtils.createCookieStr(data) || "";
  }

  static createCookieStr(data) {
    let cookieStr = "";
    if (typeof data === "object") {
      let keys = Object.keys(data) || [];
      let length = keys.length - 1;
      keys.forEach((key, index) => {
        let separator = index < length ? ";" : "";
        let value = data[key];
        value = value ? "=" + value : "";
        cookieStr += key + value + separator;
      });
    }
    return cookieStr;
  }

  static createElement(tagName, attrs) {
    let $el = document.createElement(tagName);
    if (typeof attrs === "object") {
      Object.keys(attrs).forEach(key => {
        const val = attrs[key];
        $el.setAttribute(key, val);
      });
    }
    return $el;
  }

  static downloadBlob(blob, fileName) {
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, fileName);
    } else {
      const url = URL.createObjectURL(blob);
      let $anchor = this.createElement("a", {
        target: "_blank",
        href: url,
        download: fileName
      });
      $anchor.style.visibility = "hidden";
      document.body.appendChild($anchor);
      $anchor.click();
      document.body.removeChild($anchor);
    }
  }

  static emit(name, detail, options, $root = document) {
    let customEvent = this.createCustomEvent(name, detail, options);
    $root.dispatchEvent(customEvent);
  }

  static on(name, handler, $root = document) {
    $root.addEventListener(name, handler);
  }

  static removeListener(name, handler, $root) {
    $root.removeListener(name, handler);
  }

  static createCustomEvent(name, detail, options = {}) {
    let customEvent;
    try {
      customEvent = new CustomEvent(name, {
        ...options,
        detail
      });
    } catch (e) {
      // IE
      customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(
        name,
        options.bubbles,
        options.cancelable,
        detail
      );
    }
    return customEvent;
  }
}

export { WebBrowserUtils };
