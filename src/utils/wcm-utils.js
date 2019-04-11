/** Class with static methods related to operations usually required when working with front-end components in IBM WCM */
class IBMWCMUtils {
  /**
   * Obtains the target of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getTargetFromWCMLink helper.
   * @param {string} link - the HTML of an HTML anchor tag
   * @return {string} the "target" HTML attribute
   */
  static getTargetFromWCMLink(link) {
    let target = '_self';
    if (typeof link === 'string') {
      const pattern = /.*target="(\w*)".*/;
      target = link.replace(pattern, '$1').trim();
    }
    return target;
  }

  /**
   * Obtains the URL of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getURLFromWCMLink helper.
   * @param {string} link - the HTML of an HTML anchor tag
   * @return {string} the "href" HTML attribute
   */
  static getURLFromWCMLink(link) {
    let url = '#';
    if (typeof link === 'string') {
      const pattern = /.*href="(\w*)".*/;
      url = link.replace(pattern, '$1').trim();
    }
    return url;
  }

  /**
   * Re-write a WCM URL to its corresponding URI path.
   * @param {string} url - The url to be re-written
   * @param {string} portalContext - The portal context (IBM WCM virtual portal), which is undefined by default
   * @return {string} a URI path ready to be used to redirect with the IBM portal theme context
   */
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

  /**
   * Re-write a Youtube URL like: https://www.youtube.com/watch?v=THfkgvI_60o
   * In a new URL to embed the video: https://www.youtube.com/embed/THfkgvI_60o
   * @param {string} youtubeURL - The Youtube URL the user could copy directly from a web browser
   * @return {string} a Youtube URL ready to be embedded in an iframe
   * */
  static convertYoutubeUrlToBeEmbedded(youtubeURL) {
    if (typeof youtubeURL !== 'undefined') {
      const youtubeKey = youtubeURL.substring(youtubeURL.indexOf('watch?v=') + 8);
      return 'https://www.youtube.com/embed/' + youtubeKey;
    }
    return '#';
  }

}

export {IBMWCMUtils};
