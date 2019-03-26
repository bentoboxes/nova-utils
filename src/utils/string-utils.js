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
}

export {StringUtils};
