import {DateUtils} from '../utils/date-utils';

test('it formats a date string with custom formats', () => {
  const INPUT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const OUTPUT_FORMAT = 'MM/DD YYYY';

  let formattedDate = DateUtils.formatDate('2019-12-30 13:25:47', OUTPUT_FORMAT, INPUT_FORMAT);
  const expectedDate = '12/30 2019';

  expect(formattedDate).toBe(expectedDate);

  // If no parameters are set, then it will use the defaults
  formattedDate = DateUtils.formatDate('2019-12-30 13:25:47');
  const defaultExpectedDate = '30/12/2019';

  expect(formattedDate).toBe(defaultExpectedDate);

});

test('it formats a date string with default formats', () => {

  // If no parameters are set, then it will use the defaults
  const formattedDate = DateUtils.formatDate('2019-12-30 13:25:47');
  const defaultExpectedDate = '30/12/2019';

  expect(formattedDate).toBe(defaultExpectedDate);

});

test('it tries to format a non-valid date string with default formats', () => {

  // If no parameters are set, then it will use the defaults
  const formattedDate = DateUtils.formatDate('0000-00-30 13:25:47');
  const expectedDate = '0000-00-30 13:25:47';

  expect(formattedDate).toBe(expectedDate);

});

test('it formats a milliseconds date', () => {
  // new Date(year, monthIndex, day, hours, minutes, seconds)
  // Be aware the second parameter is an index (zero-based) not the month number
  // that means January = 0 and December = 11.
  const millisecondsDate = new Date(2019,11, 30, 9,43,22).valueOf();
  const defaultExpectedDate = '30/12/2019';

  const resultingDate = DateUtils.formatDate(millisecondsDate);

  expect(resultingDate).toBe(defaultExpectedDate);
});

