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
      cookieSession === true
        ? 0 // Set a 0 expiration time when cookieSession is equals true
        : date.toUTCString();
    cookieValue = escape(cookieValue) + "; expires=" + expires;
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
      cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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
}

export { WebBrowserUtils };
