class StringUtils {
  /*******************************************************************************************
   * Cut an string into an specific length of chars
   *******************************************************************************************/
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

  /*******************************************************************************************
   * Processes the given string to delete special characters
   * This is used by the getParentLabelByKey and getMultilingualLabelByKey helpers.
   *******************************************************************************************/
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

  static capitalize(str) {
    const splitStr = str.toLowerCase().split(' ');
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

  /*******************************************************************************************
   * Processes the given string to escape special meta characters used within
   * Regular Expressions. This is used by the replace helper.
   *******************************************************************************************/
  static escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  /*******************************************************************************************
   * Performs a global search and replace within a string.
   * inputString - the input string within which the search and replace will be performed
   * search - the character or sequence to search
   * replace - the character or sequence used to replace
   * trim - when 'true', will trim the string before returning result.
   * inputString = "my test", search = " ", replace = "-", trim = "true"
   * -> WCMUtils.separateStringBySeparator(inputString, search, replace, trim)
   * -> result = "my-test"
   *******************************************************************************************/
  static separateStringBySeparator(inputString, search, replace, trim = true) {
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
