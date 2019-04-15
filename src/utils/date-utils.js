import moment from "moment";

const DEFAULT_INPUT_FORMAT = "YYYY-MM-DD HH:mm:ss";
const DEFAULT_OUTPUT_FORMAT = "DD/MM/YYYY";

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
  static formatDate(
    date,
    outputFormat = DEFAULT_OUTPUT_FORMAT,
    inputFormat = DEFAULT_INPUT_FORMAT
  ) {
    let dateParsed = null;

    if (typeof date === "number") {
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

    return dateParsed.isValid()
      ? dateParsed.format(outputFormat) // It uses the format() of moment.js
      : date;
  }

  /**
   * Returns a relative date using an start date, end date and input formats
   * @static
   * @param {string|number} startDate - The start date string
   * @param {string|number} endDate - The end date string
   * @param {string} startDateFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the startDate parameter and validate it.
   * @param {string} endDateFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the endDate parameter and validate it.
   * @retun {string} The relative date
   */
  static relativeDate(
    startDate,
    endDate,
    startDateFormat = DEFAULT_INPUT_FORMAT,
    endDateFormat = DEFAULT_INPUT_FORMAT
    ) {
      let startDateParsed = null;
      let endDateParsed = null;

      if (typeof startDate === "number" && typeof endDate === "number") {
        startDate = parseInt(startDate);
        endDate = parseInt(endDate);

        startDateParsed = moment(startDate);
        endDateParsed = moment(endDate);

      } else {
        startDateParsed = moment(startDate, startDateFormat);
        endDateParsed = moment(startDate, endDateFormat);
      }

      return dateParsed.isValid()
      ? moment(endDateParsed).from(startDateParsed, true)
      : "from: " + startDate + " to: " + endDate;
  }
}

export { DateUtils };
