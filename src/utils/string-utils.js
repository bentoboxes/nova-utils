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
}

export {StringUtils};
