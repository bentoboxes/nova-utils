import moment from 'moment';

const DEFAULT_INPUT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_OUTPUT_FORMAT = 'DD/MM/YYYY';

/** Class with static methods related to dates' management */
class DateUtils {

  /**
   * Formats a string or milliseconds date using an output format and input format
   * @static
   * @param {string|number} date - The date string to be formatted
   * @param {string} outputFormat='DD/MM/YYYY' - The desired output format
   * @param {string} inputFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the date parameter
   * @retun {string} The formatted date
   */
  static formatDate(date,
                    outputFormat = DEFAULT_OUTPUT_FORMAT, inputFormat = DEFAULT_INPUT_FORMAT) {
    let dateParsed = null;

    if (typeof date === 'number') {
      date = parseInt(date);
      dateParsed = moment(date); // Date in milliseconds
    } else {
      // Parse date using moment.js
      // if (typeof inputFormat !== 'undefined') {
      dateParsed = moment(date, inputFormat);
      // }
      // else {
      //   dateParsed = moment(date);
      // }
    }

    return (dateParsed.isValid() && typeof outputFormat !== 'undefined') ?
        dateParsed.format(outputFormat) // It uses the format() of moment.js
        : date;
  }
}

export {DateUtils};
