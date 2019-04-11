import {StringUtils} from '..';

test('performs a global search and replace within a string', () => {
  const inputString = 'We are     just trying to remove white spaces here :)';
  const search = ' ';
  const replace = '-';
  const trim = true;

  const resultingString = StringUtils.separateStringBySeparator(inputString, search, replace, trim);

  // Would you like to have a cleaner "slug", take a look at StringUtils.createSlug();
  const expectedString = 'We-are-----just-trying-to-remove-white-spaces-here-:)';
  expect(resultingString).toBe(expectedString);
});

test('creates an slug string', () => {
  const inputString = 'We are     just trying to remove white spaces here :)';

  const resultingString = StringUtils.createSlug(inputString);
  const expectedString = 'we-are-just-trying-to-remove-white-spaces-here-';

  expect(resultingString).toBe(expectedString);
});
