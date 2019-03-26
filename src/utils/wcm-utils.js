class WCMUtils {
  /*******************************************************************************************
   * Obtains the target of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getTargetFromWCMLink helper.
   *******************************************************************************************/
  static getTargetFromWCMLink(link) {
    var target = '_self';
    if (typeof link !== 'undefined' && typeof $ !== 'undefined') {
      // TODO: this was using jQuery, change it to use Vanilly JS
      target = $(link).attr('target');
    }
    return target;
  }

  /*******************************************************************************************
   * Obtains the URL of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getURLFromWCMLink helper.
   *******************************************************************************************/
  static getURLFromWCMLink(link) {
    var url = '#';
    if (typeof link !== 'undefined' && typeof $ !== 'undefined') {
      // TODO: this was using jQuery, change it to use Vanilly JS
      url = $(link).attr('href');
    }
    return url;
  }

  /*******************************************************************************************
   * Re-write a WCM URL to its corresponding URI path.
   *******************************************************************************************/
  static getURIPathFromWCMURL(url, portalContext = undefined) {
    // We look for the portalContext variable, usually this variable is set in the portal theme
    if (typeof url === 'string') {
      const virtualPortalContext = window.portalContext && window.portalContext !== 'none'
          ? window.portalContext
          : '';

      return url
          .replace(
              '/wps/wcm/myconnect/' + virtualPortalContext,
              '?1dmy&urile=wcm%3apath%3a',
          )
          .replace(
              '/wps/wcm/connect/' + virtualPortalContext,
              '?1dmy&urile=wcm%3apath%3a',
          );
    } else {
      return '#';
    }
  }

  /*******************************************************************************************
   * Re-write a Youtube URL like: https://www.youtube.com/watch?v=THfkgvI_60o
   * In a new URL to embed the video: https://www.youtube.com/embed/THfkgvI_60o
   *******************************************************************************************/
  static getYoutubeUrl(youtubeURL) {
    if (typeof youtubeURL !== 'undefined') {
      const youtubeKey = youtubeURL.substring(youtubeURL.indexOf('watch?v=') + 8);
      return 'https://www.youtube.com/embed/' + youtubeKey;
    }
    return '#';
  }

  /*******************************************************************************************
   * Processes the given string to escape special meta characters used within
   * Regular Expressions. This is used by the replace helper.
   *******************************************************************************************/
  static escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  /*******************************************************************************************
   * Performs a global search and replace within a string.
   * str - the input string within which the search and replace will be performed
   * search - the character or sequence to search
   * replace - the character or sequence used to replace
   * trim - when 'true', will trim the string before returning result.
   * str = "my test", search = " ", replace = "-", trim = "true"
   * -> WCMUtils.separateStringBySeparator(str, search, replace, trim)
   * -> result = "my-test"
   *******************************************************************************************/
  static separateStringBySeparator(str, search, replace, trim = true) {
    if (typeof str === 'string') {
      if (trim) {
        str = str.trim();
      }

      return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
    }
    return '';
  }

}

export {WCMUtils};
