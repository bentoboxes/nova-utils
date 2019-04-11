import {StringUtils} from '..';

test('cuts a string in an specific characters length', () => {
  const inputString = 'We are just trying to cut some characters because this string is too long';
  const resultingString = StringUtils.cutString(inputString, 30);
  const expectedString = 'We are just trying to cut...';
  expect(resultingString).toBe(expectedString);
});

test('deletes special characters in a given string', () => {
  const inputString = 'this-string$%-may-be-useful-&to create and id or class';
  const resultingString = StringUtils.cleanString(inputString);
  const expectedString = 'thisstringmaybeusefultocreateandidorclass';
  expect(resultingString).toBe(expectedString);
});

test('capitalizes a string', () => {
  const inputString = 'this string should be capitalized';
  const resultingString = StringUtils.capitalize(inputString);
  const expectedString = 'This String Should Be Capitalized';
  expect(resultingString).toBe(expectedString);
});

test('transforms a string from kebab-case to camelCase notation', () => {
  const inputString = 'label-component-title';
  const resultingString = StringUtils.kebabToCamelCase(inputString);
  const expectedString = 'labelComponentTitle';

  expect(resultingString).toBe(expectedString);
});

test('checks if a string contains a substring', () => {
  const inputString = 'Let\'s find a substring like this emoji 🐯 in this string';
  const wordToFind = '🐯';
  const resultingString = StringUtils.contains(inputString, wordToFind);
  expect(resultingString).toBe(true);
});

test('performs a global search and replace within a string', () => {
  const inputString = 'We are     just trying to remove white spaces here :)';
  const search = ' ';
  const replace = '-';
  const trim = true;

  const resultingString = StringUtils.replaceStringSequence(inputString, search, replace, trim);

  // Would you like to have a cleaner "slug"? Take a look at StringUtils.createSlug();
  const expectedString = 'We-are-----just-trying-to-remove-white-spaces-here-:)';
  expect(resultingString).toBe(expectedString);
});

test('creates an slug string', () => {
  const inputString = 'We are     just trying to remove white spaces here :)';

  const resultingString = StringUtils.createSlug(inputString);
  const expectedString = 'we-are-just-trying-to-remove-white-spaces-here-';

  expect(resultingString).toBe(expectedString);
});
