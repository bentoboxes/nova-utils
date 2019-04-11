/** Utilities related to the web browser */
class WebBrowserUtils {
  /**
   * Returns the version of Internet Explorer {7|8|9|10|etc..} or a -1
   * (indicating the use of another browser).
   * @return {number} the Internet Explorer version as number
   */
  static getInternetExplorerVersion() {
    let rv = -1; // indicating the use of another browser.
    if (navigator.appName === 'Microsoft Internet Explorer') {
      const ua = navigator.userAgent;
      const re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
      if (re.exec(ua) !== null) {
        rv = parseFloat(RegExp.$1);
      }
    }
    return rv;
  }
}

export {WebBrowserUtils};
