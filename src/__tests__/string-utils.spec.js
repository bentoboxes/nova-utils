import { StringUtils } from "..";

test("it capitalizes a string", () => {
  const inputString = "this string should be capitalized";
  const resultingString = StringUtils.capitalize(inputString);
  const expectedString = "This String Should Be Capitalized";
  expect(resultingString).toBe(expectedString);
});

test("it transforms a string from kebab-case to camelCase notation", () => {
  const inputString = "label-component-title";
  const resultingString = StringUtils.kebabToCamelCase(inputString);
  const expectedString = "labelComponentTitle";

  expect(resultingString).toBe(expectedString);
});

test("it checks if a string contains a substring", () => {
  const inputString =
    "Let's find a substring like this emoji 🐯 in this string";
  const wordToFind = "🐯";
  const resultingString = StringUtils.contains(inputString, wordToFind);
  expect(resultingString).toBe(true);
});

test("it creates an slug string", () => {
  const inputString = "We are     just trying to remove white spaces here :)";

  const resultingString = StringUtils.createSlug(inputString);
  const expectedString = "we-are-just-trying-to-remove-white-spaces-here-";

  expect(resultingString).toBe(expectedString);
});

describe("it deletes special characters in a given string", () => {
  test("with a valid input string", () => {
    const inputString =
      "this-string$%-may-be-useful-&to create and id or class";
    const resultingString = StringUtils.cleanString(inputString);
    const expectedString = "thisstringmaybeusefultocreateandidorclass";
    expect(resultingString).toBe(expectedString);
  });

  test("with a non-valid input string", () => {
    const inputThatIsNotAString = 234324;
    const result = StringUtils.cleanString(inputThatIsNotAString);
    const expectedResult = "";
    expect(result).toBe(expectedResult);
  });
});

describe("it performs a global search and replace within a string", () => {
  test("using default trim=true argument", () => {
    const inputString = "We are     just trying to remove white spaces here :)";
    const search = " ";
    const replace = "-";
    // const trim = true;

    const resultingString = StringUtils.replaceStringSequence(
      inputString,
      search,
      replace
    );

    // Would you like to have a cleaner "slug"? Take a look at StringUtils.createSlug();
    const expectedString =
      "We-are-----just-trying-to-remove-white-spaces-here-:)";
    expect(resultingString).toBe(expectedString);
  });

  test("with no trim enabled", () => {
    const inputString =
      "  We-are-just-trying-to-remove-some-special-chars :)  ";
    const search = ":)";
    const replace = "-";
    const trim = false;

    const resultingString = StringUtils.replaceStringSequence(
      inputString,
      search,
      replace,
      trim
    );

    // Would you like to have a cleaner "slug"? Take a look at StringUtils.createSlug();
    const expectedString =
      "  We-are-just-trying-to-remove-some-special-chars -  ";
    expect(resultingString).toBe(expectedString);
  });

  test("using a non-string argument", () => {
    const inputNotAString = 213213123;
    const search = " ";
    const replace = "-";
    const trim = true;

    const result = StringUtils.replaceStringSequence(
      inputNotAString,
      search,
      replace,
      trim
    );

    // Would you like to have a cleaner "slug"? Take a look at StringUtils.createSlug();
    const expectedString = "";
    expect(result).toBe(expectedString);
  });
});

describe("it cuts a string in an specific characters length", () => {
  test("with valid parameters", () => {
    const inputString =
      "We are just trying to cut some characters because this string is too long";
    const resultingString = StringUtils.cutString(inputString, 30);
    const expectedString = "We are just trying to cut...";
    expect(resultingString).toBe(expectedString);
  });

  test("using a bigger number that the string's length", () => {
    const inputString = "This string will not be cut";
    const resultingString = StringUtils.cutString(inputString, 255);
    const expectedString = "This string will not be cut";
    expect(resultingString).toBe(expectedString);
  });

  test("using the default length argument", () => {
    const inputString = `
      In this tutorial, we are going to be creating an awesome blog engine using two great tools: Angular and Carbon LDP,
      this tutorial was inspired by the official one published by the Carbon LDP team in https://carbonldp.com/blog/2018/11/23/build-a-blog-with-carbon-ldp-and-react-part-1/
      In order to successfully go through this tutorial, JavaScript and CSS knowledge is required.
    `;
    const resultingString = StringUtils.cutString(inputString);
    const expectedString =
      "In this tutorial, we are going to be creating an awesome blog engine using two great tools: Angular and Carbon LDP,...";

    expect(resultingString).toBe(expectedString);
  });
});
