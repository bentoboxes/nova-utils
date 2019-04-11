/** A class with static methods related to strings manipulation */
class StringUtils {
  /**
   * Cuts an string into an specific length of chars
   * @param {string} inputString - The input string to be cut
   * @param {number} length - The minimal characters the string should have
   * @return {string} The cut string
   */
  static cutString(inputString, length) {
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

  static kebabToCamelCase(inputString) {
    return inputString.replace(/(\-\w)/g, (m) => m[1].toUpperCase());
  }

  static contains(inputString, wordToFind) {
    return inputString.indexOf(wordToFind) > -1;
  };

  /**
   * Processes the given string to escape special meta characters used within
   * Regular Expressions. This is used by the replace helper.
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

  // Based on https://github.com/alex-arriaga/slugify
  static createSlug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Collapse whitespace and replace by -
        .replace(/-+/g, '-'); // Collapse dashes

    return str;
  }
}

export {StringUtils};
