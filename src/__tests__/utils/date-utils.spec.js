import { DateUtils } from "../../utils/date-utils";

describe("Test different format dates", () => {
  test("it formats a date string with custom formats", () => {
    const INPUT_FORMAT = "YYYY-MM-DD HH:mm:ss";
    const OUTPUT_FORMAT = "MM/DD YYYY";

    let formattedDate = DateUtils.formatDate(
      "2019-12-30 13:25:47",
      OUTPUT_FORMAT,
      INPUT_FORMAT
    );
    const expectedDate = "12/30 2019";

    expect(formattedDate).toBe(expectedDate);

    // If no parameters are set, then it will use the defaults
    formattedDate = DateUtils.formatDate("2019-12-30 13:25:47");
    const defaultExpectedDate = "30/12/2019";

    expect(formattedDate).toBe(defaultExpectedDate);
  });

  test("it formats a date string with default formats", () => {
    // If no parameters are set, then it will use the defaults
    const formattedDate = DateUtils.formatDate("2019-12-30 13:25:47");
    const defaultExpectedDate = "30/12/2019";

    expect(formattedDate).toBe(defaultExpectedDate);
  });

  test("it tries to format a non-valid date string with default formats", () => {
    // If no parameters are set, then it will use the defaults
    const formattedDate = DateUtils.formatDate("0000-00-30 13:25:47");
    const expectedDate = "0000-00-30 13:25:47";

    expect(formattedDate).toBe(expectedDate);
  });

  test("it formats a milliseconds date", () => {
    // new Date(year, monthIndex, day, hours, minutes, seconds)
    // Be aware the second parameter is an index (zero-based) not the month number
    // that means January = 0 and December = 11.
    const millisecondsDate = new Date(2019, 11, 30, 9, 43, 22).valueOf();
    const defaultExpectedDate = "30/12/2019";

    const resultingDate = DateUtils.formatDate(
      millisecondsDate,
      "DD/MM/YYYY",
      "MILLIS"
    );

    expect(resultingDate).toBe(defaultExpectedDate);
  });

  test("it formats a specific date depending on date, timezone inputs and outputs arguments", () => {
    const outputFormattedDate = "23/02/2019";
    const resultingDate = DateUtils.formatDate(
      "2019-02-23T20:43:23",
      "DD/MM/YYYY",
      "SIMPLE_ISO",
      "z",
      "America/Chicago"
    );
    expect(resultingDate).toBe(outputFormattedDate);
  });

  test("it formats a specific date depending on default arguments", () => {
    const outputFormattedDate = "23/02/2019";
    const resultingDate = DateUtils.formatDate("2019-02-23T20:43:23");

    expect(resultingDate).toBe(outputFormattedDate);
  });

  test("it formats a specific date adding the timezone", () => {
    const outputFormattedDate = "23/02/2019, CST";
    const resultingDate = DateUtils.formatDate(
      "2019-02-23T20:43:23",
      "DD/MM/YYYY",
      "SIMPLE_ISO",
      "z",
      "America/Chicago",
      true
    );

    expect(resultingDate).toBe(outputFormattedDate);
  });
});

describe("it parses a data", () => {
  test("with default input format", () => {
    const inputDate = "2020-12-30 13:44:23";

    const resultingDateObj = DateUtils.parseDate(inputDate);
    const expectedDateAsString = "2020-12-30T18:44:23.000Z";

    expect(resultingDateObj instanceof Date).toBe(true);

    expect(resultingDateObj.toISOString()).toBe(expectedDateAsString);
  });

  test("setting a custom input format", () => {
    const inputDate = "12/30/2020 13:44:23";

    const inputFormat = "MM/DD/YYYY HH:mm:ss";

    const resultingDateObj = DateUtils.parseDate(inputDate, inputFormat);
    const expectedDateAsString = "2020-12-30T18:44:23.000Z";

    expect(resultingDateObj instanceof Date).toBe(true);

    expect(resultingDateObj.toISOString()).toBe(expectedDateAsString);
  });

  test("setting a custom input format", () => {
    const inputDate = "12/30/2020 13:44:23";

    const inputFormat = "MM/DD/YYYY HH:mm:ss";

    const resultingDateObj = DateUtils.parseDate(inputDate, inputFormat);
    const expectedDateAsString = "2020-12-30T18:44:23.000Z";

    expect(resultingDateObj instanceof Date).toBe(true);

    expect(resultingDateObj.toISOString()).toBe(expectedDateAsString);
  });

  test("with no valid date as input", () => {
    const inputDate = undefined;

    const inputFormat = "MM/DD/YYYY HH:mm:ss";

    const resultingDateObj = DateUtils.parseDate(inputDate, inputFormat);

    // When no valid date is sent to "parseDate" it will return "today's date"
    const expectedDateAsString = new Date().getDate();

    expect(resultingDateObj instanceof Date).toBe(true);

    expect(resultingDateObj.getDate()).toBe(expectedDateAsString);
  });
});

describe("it gets a relative date", () => {
  test("with default input format", () => {
    const startDate = "2020-12-30 13:44:23";
    const endDate = "2021-06-10 13:44:23";

    const resultingDateObj = DateUtils.relativeDateFromInterval(
      startDate,
      endDate
    );

    const expectedRelativeDate = "5 months";

    expect(typeof expectedRelativeDate).toBe("string");

    expect(resultingDateObj).toBe(expectedRelativeDate);
  });

  test("with custom input format", () => {
    const startDate = "2020/30/12 13:44:23";
    const endDate = "2021/10/06 13:44:23";

    const resultingDateObj = DateUtils.relativeDateFromInterval(
      startDate,
      endDate,
      "YYYY/DD/MM HH:mm:ss"
    );

    const expectedRelativeDate = "5 months";

    expect(typeof expectedRelativeDate).toBe("string");

    expect(resultingDateObj).toBe(expectedRelativeDate);
  });

  test("with dates not matching the input format", () => {
    const startDate = "2020-12-30 13:44:23";
    const endDate = "2020-12-30 13:44:23";

    const resultingDateObj = DateUtils.relativeDateFromInterval(
      startDate,
      endDate,
      "YYYY/DD/MM HH:mm:ss"
    );

    const expectedRelativeDate = "2020-12-30 13:44:23 - 2020-12-30 13:44:23";

    expect(typeof expectedRelativeDate).toBe("string");

    expect(resultingDateObj).toBe(expectedRelativeDate);
  });
});

describe("it formats a date with a params object", () => {
  test("using a params object where inputFormat === 'SIMPLE_ISO'", () => {
    const outputFormattedDate = "23/02/2019, CST";
    const params = {
      showTimeZone: true,
      outputTimeZone: "z",
      outputFormat: "DD/MM/YYYY",
      inputTimeZone: "America/Chicago",
      inputFormat: "SIMPLE_ISO",
      date: "2019-02-23T20:43:23z"
    };

    const resultingDate = DateUtils.formatDateByObj(params);

    expect(resultingDate).toBe(outputFormattedDate);
  });


  test("using a params object where outputFormat is unique date", () => {
    const outputFormattedDate = "02/23/2019";


    const params = {
      showTimeZone: false,
      outputFormat: "MM/DD/YYYY",
      date: "2019-02-23T22:43:23.656Z"
    };

    const resultingDate = DateUtils.formatDateByObj(params);

    expect(resultingDate).toBe(outputFormattedDate);
  });

  test("using a params object where inputFormat === 'ISO'", () => {
    const outputFormattedDate = "Feb, CST";
    const params = {
      showTimeZone: true,
      outputTimeZone: "z",
      outputFormat: "MMM",
      inputTimeZone: "America/Chicago",
      inputFormat: "ISO",
      date: "2019-02-23T20:43:23.656Z"
    };

    const resultingDate = DateUtils.formatDateByObj(params);

    expect(resultingDate).toBe(outputFormattedDate);
  });
});

test("returns moment object", () => {
  const momentVersion = "2.24.0";

  const momentJS = DateUtils.getMomentJS();

  expect(momentJS.version).toBe(momentVersion);
});


test("returns moment object", () => {
  const momentTZ = DateUtils.getMomentJS().tz;

  expect(typeof momentTZ).toBe("function");
});
