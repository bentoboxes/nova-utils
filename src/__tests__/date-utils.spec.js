import {DateUtils} from '../utils/date-utils';

test('formats a date string with custom formats', () => {
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

test('formats a date string with default formats', () => {

  // If no parameters are set, then it will use the defaults
  const formattedDate = DateUtils.formatDate('2019-12-30 13:25:47');
  const defaultExpectedDate = '30/12/2019';

  expect(formattedDate).toBe(defaultExpectedDate);

});

