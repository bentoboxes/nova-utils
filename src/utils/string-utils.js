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
}

export {StringUtils};
