/** Class with static methods related to operations usually required when working with front-end components in IBM WCM */
class IBMWCMUtils {
  /**
   * Obtains the target of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getTargetFromWCMLink helper.
   * @static
   * @param {string} link - the HTML of an HTML anchor tag
   * @return {string} the "target" HTML attribute
   */
  static getTargetFromWCMLink(link) {
    let target = "_self";
    if (typeof link === "string") {
      const pattern = /.*target="(\w*)".*/;
      target = link.replace(pattern, "$1").trim();
    }
    return target;
  }

  /**
   * Obtains the URL of a WCM link, e.g. <a href="http://base22.com" target="_blank"></a>
   * This is used by the getURLFromWCMLink helper.
   * @static
   * @param {string} link - the HTML of an HTML anchor tag
   * @return {string} the "href" HTML attribute
   */
  static getURLFromWCMLink(link) {
    let url = "#";
    if (typeof link === "string") {
      const pattern = /.*href="(\w*)".*/;
      url = link.replace(pattern, "$1").trim();
    }
    return url;
  }

  /**
   * Re-writes a WCM URL to its corresponding URI path.
   * @static
   * @param {string} url - The url to be re-written
   * @param {string} portalContext - The portal context (IBM WCM virtual portal), which is undefined by default
   * @return {string} a URI path ready to be used to redirect with the IBM portal theme context
   */
  static getURIPathFromWCMURL(url, portalContext = undefined) {
    // We look for the portalContext variable, usually this variable is set in the portal theme
    if (typeof url === "string") {
      let virtualPortalContext = "";

      if (typeof portalContext !== "undefined") {
        virtualPortalContext = portalContext;
      } else if (
        typeof window.portalContext !== "undefined" &&
        window.portalContext !== "none"
      ) {
        virtualPortalContext = window.portalContext;
      }

      return url
        .replace(
          "/wps/wcm/myconnect/" + virtualPortalContext,
          "?1dmy&urile=wcm%3apath%3a"
        )
        .replace(
          "/wps/wcm/connect/" + virtualPortalContext,
          "?1dmy&urile=wcm%3apath%3a"
        );
    } else {
      return "#";
    }
  }

  /**
   * writes a WCM URL to its corresponding URI path.
   * @static
   * @param {string} target - The target path to be written
   * @return {string} a URI path ready to be used to redirect with the IBM portal theme context
   */
  static getURIPath(target) {
    if (typeof target === "string") {
      return "?1dmy&urile=wcm%3apath%3a" + encodeURIComponent(target);
    }
  }

  /**
   * Re-writes a Youtube URL like: https://www.youtube.com/watch?v=THfkgvI_60o
   * to create a new URL to embed the video: https://www.youtube.com/embed/THfkgvI_60o
   * @static
   * @param {string} youtubeURL - The Youtube URL the user could copy directly from a web browser
   * @return {string} a Youtube URL ready to be embedded in an iframe
   */
  static convertYoutubeUrlToBeEmbedded(youtubeURL) {
    if (typeof youtubeURL === "string") {
      const youtubeKey = youtubeURL.substring(
        youtubeURL.indexOf("watch?v=") + 8
      );
      return "https://www.youtube.com/embed/" + youtubeKey;
    }
    return "#";
  }

  /**
   * Re-writes a Vimeo URL like: https://vimeo.com/163231391
   * to create a new URL to embed the video: https://player.vimeo.com/video/163231391
   * @static
   * @param {string} vimeoURL - The Vimeo URL the user could copy directly from a web browser
   * @return {string} a Vimeo URL ready to be embedded in an iframe
   */
  static convertVimeoUrlToBeEmbedded(vimeoURL) {
    if (typeof vimeoURL === "string") {
      const vimeoKey = vimeoURL.substring(vimeoURL.indexOf(".com/") + 5);
      return "https://player.vimeo.com/video/" + vimeoKey;
    }
    return "#";
  }

  /**
   * Fix Portal's link URLs special characters such as "&amp;"
   * @static
   * @param {string} linkURL - The link URL to be fixed
   * @return {string} a link URL without characters that prevent the redirection works as expected
   */
  static fixPortalLinkURL(linkURL) {
    return linkURL.replace(/&amp;/gi, "&");
  }

  /**
   * Fix Portal's link URLs in an array of items this can be used before sending the data.items
   * to be rendered by a Nova component, e. g. data.items = NovaUtils.IBMWCMUtils.fixURLsInItems(data.items, "linkURL")
   * @static
   * @param {object[]} items -  The array of items to be processed
   * @param {string} linkURLField - The field in each item that has the link URL to be fixed
   */
  static fixURLsInItems(items = [], linkURLField = "link") {
    if (Array.isArray(items)) {
      items.forEach(item => {
        item[linkURLField] = this.fixPortalLinkURL(item[linkURLField]);
      });
      return items;
    }
    return items;
  }
}

export { IBMWCMUtils };
