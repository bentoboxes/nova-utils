import moment from 'moment';

class DateUtils {

  static formatDate(date, outputFormat = 'DD/MM/YYYY', inputFormat = 'YYYY-MM-DDTHH:mm:ss') {
    let dateParsed = '';

    if (typeof date === 'number') {
      date = parseInt(date);
      dateParsed = moment(date); // Date in milliseconds
    } else {
      // Parse date using moment.js
      if (typeof inputFormat !== 'undefined') {
        dateParsed = moment(date, inputFormat);
      } else {
        dateParsed = moment(date);
      }
    }

    return (dateParsed.isValid() && typeof outputFormat !== 'undefined') ?
        dateParsed.format(outputFormat) // It uses the format() of moment.js
        : date;
  }
}

export {DateUtils};
