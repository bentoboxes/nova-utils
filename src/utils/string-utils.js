/** A class with static methods related to strings manipulation */
class StringUtils {
  /**
   * Cuts an string into an specific length of chars
   * @static
   * @param {string} inputString - The input string to be cut
   * @param {number} [length=120] - The minimal characters the string should have
   * @return {string} The cut string
   */
  static cutString(inputString, length = 120) {
    inputString = inputString
        .replace(/\s{2,}/gi, ' ')
        .replace(/^\s+/gi, '')
        .replace(/\s+$/gi, '')
        .replace(/[-,._]+$/, '');

    if (inputString.length > length) {
      for (let i = length - 1; i >= 0; i--) {
        if (inputString.charAt(i) === ' ') {
          return inputString.substring(0, i) + '...';
        }
      }
    } else {
      return inputString;
    }
  }

  /**
   * Processes the given string to delete special characters
   * This is used by the getParentLabelByKey() and getMultilingualLabelByKey() helpers.
   * @static
   * @param {string} inputString - The input string to be cleaned
   * @return {string} The clean string
   */
  static cleanString(inputString) {
    if (typeof inputString === 'string') {
      return inputString.replace(
          /[\sÃ¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘\.\-_!Â¡\|&;\$%@"<>\(\)\+,#@%]/g,
          '',
      );
    } else {
      return '';
    }
  }

  /**
   * Capitalizes an input string
   * @static
   * @param {string} inputString - The input string to be capitalized
   * @return {string} The capitalized string
   * */
  static capitalize(inputString) {
    const splitStr = inputString.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  /**
   * Transforms a string from kebab-case to camelCase notation
   * @static
   * @param {string} inputString - The input string to be transformed
   * @return The camelCase string
   */
  static kebabToCamelCase(inputString) {
    return inputString.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
  }

  /**
   * Allows to check if a string contains a substring
   * @static
   * @param {string} inputString - The input string where to find the substring
   * @param {string} stringToBeFound - The substring to be found
   * @return {boolean} - True or false depending on the inputs
   * */
  static contains(inputString, stringToBeFound) {
    return inputString.indexOf(stringToBeFound) > -1;
  };

  /**
   * Processes the given string to escape special meta characters used within
   * regular Expressions. This is used by the replace helper.
   * @static
   * @param {string} inputString - The input string to be escaped
   * @return {string} The escaped string
   */
  static escapeRegExp(inputString) {
    return inputString.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  /**
   * Performs a global search and replace within a string.
   * inputString - the input string within which the search and replace will be performed
   * search - the character or sequence to search
   * replace - the character or sequence used to replace
   * trim - when 'true', will trim the string before returning result.
   * inputString = "my test", search = " ", replace = "-", trim = "true"
   * -> WCMUtils.separateStringBySeparator(inputString, search, replace, trim)
   * -> result = "my-test"
   * @static
   * @param {string} inputString - The input string where to search and replace a substring
   * @param {string} search - The string to be found
   * @param {string} replace - The string to be used as replacement
   * @param {boolean} trim=true - Remove whitespaces at the beginning and at the end of the resulting string
   * @return {string} The resulting string after replacing the desired substring
   */
  static replaceStringSequence(inputString, search, replace, trim = true) {
    if (typeof inputString === 'string') {
      if (trim) {
        inputString = inputString.trim();
      }

      return inputString.replace(new RegExp(this.escapeRegExp(search), 'g'), replace);
    }
    return '';
  }

  /**
   * Creates slug strings, based on https://github.com/alex-arriaga/slugify
   * @static
   * @param {string} inputString - The original string that will be the source of our slug
   * @return {string} The resulting slug
   */
  static createSlug(inputString) {
    inputString = inputString.replace(/^\s+|\s+$/g, ''); // trim
    inputString = inputString.toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
      inputString = inputString.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    inputString = inputString.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Collapse whitespace and replace by -
        .replace(/-+/g, '-'); // Collapse dashes

    return inputString;
  }
}

export {StringUtils};
