import moment from "moment";
import tz from "moment-timezone";

moment.tz = tz;

const INPUT_FORMATS = {
  ISO: "YYYY-MM-DDTHH:mm:ss.sssZ",
  SIMPLE_ISO: "YYYY-MM-DD HH:mm:ss",
  MILLISECONDS: "x",
  CALENDAR_DATE: "YYYY-MM-DD",
  ORDINAL_DATE: "YYYY-DDD"
};

const DEFAULT_INPUT_FORMAT = INPUT_FORMATS.SIMPLE_ISO;
const DEFAULT_OUTPUT_FORMAT = "DD/MM/YYYY";
const DEFAULT_TIME_ZONE_INPUT = "America/Los_Angeles";
const DEFAULT_TIME_ZONE_OUTPUT = "z";

/** Class with static methods related to dates' management */
class DateUtils {
  /**
   * Formats a string or milliseconds date using an output format and input format
   * @static
   * @param {string|number} date - The date string to be formatted
   * @param {string} outputFormat='DD/MM/YYYY' - The desired output format
   * @param {string} inputFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the date parameter
   * @param {string} inputTimeZone='America/Los_Angeles' - The desired input time zone format
   * @param {boolean} showTimeZone=true - Used to define if the time zone should be displayed
   * @param {string} outputTimeZone='z' - The desired output time zone format
   * @retun {string} The formatted date
   */
  static formatDate(
    date,
    outputFormat = DEFAULT_OUTPUT_FORMAT,
    inputFormat = DEFAULT_INPUT_FORMAT,
    outputTimeZone = DEFAULT_TIME_ZONE_OUTPUT,
    inputTimeZone = DEFAULT_TIME_ZONE_INPUT,
    showTimeZone = true
  ) {
    let dateParsed = null;

    if (inputFormat !== INPUT_FORMATS.SIMPLE_ISO)
      dateParsed = moment(date, INPUT_FORMATS[inputFormat]);
    else dateParsed = moment(date, inputFormat);

    dateParsed = moment.tz(dateParsed, inputTimeZone);

    return dateParsed.isValid()
      ? showTimeZone
        ? dateParsed.format(`${outputFormat}, ${outputTimeZone}`)
        : dateParsed.format(outputFormat) // It uses the format() of moment.js
      : date;
  }

  /**
   * Parses a string date to a JavaScript Date object
   * @static
   * @param {string} date - The date string to be parsed
   * @param {string} inputFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the date parameter
   * @retun {string} The JavaScript Date object
   */
  static parseDate(date, inputFormat = DEFAULT_INPUT_FORMAT) {
    let dateParsed = null;

    if (inputFormat !== INPUT_FORMATS.SIMPLE_ISO)
      dateParsed = moment(date, INPUT_FORMATS[inputFormat]);
    else dateParsed = moment(date, inputFormat);

    return dateParsed.isValid()
      ? dateParsed.toDate() // It uses the format() of moment.js
      : date;
  }

  /**
   * Returns a relative date using an start date, end date and input formats
   * @static
   * @param {string|number} startDate - The start date string
   * @param {string|number} endDate - The end date string
   * @param {string} inputFormat='YYYY-MM-DD HH:mm:ss' - The format of the input string, it is used to parse the startDate parameter and validate it.
   * @retun {string} The relative date
   */
  static relativeDate(startDate, endDate, inputFormat = DEFAULT_INPUT_FORMAT) {
    let startDateParsed = null;
    let endDateParsed = null;

    if (inputFormat !== INPUT_FORMATS.SIMPLE_ISO) {
      startDateParsed = moment(startDate, INPUT_FORMATS[inputFormat]);
      endDateParsed = moment(endDate, INPUT_FORMATS[inputFormat]);
    } else {
      startDateParsed = moment(startDate, inputFormat);
      endDateParsed = moment(endDate, inputFormat);
    }

    return startDateParsed.isValid() && endDateParsed.isValid()
      ? moment(endDate).from(startDate, true)
      : startDate + " - " + endDate;
  }
}

export { DateUtils };
