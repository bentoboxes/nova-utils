import {IBMWCMUtils} from '../utils/wcm-utils';

test('', () => {

  const link = `
    <a href="https://alex-arriaga.com/" data-target="#something" target="_blank" title="Link">Go to a great blog</a>
  `;

  const target = IBMWCMUtils.getTargetFromWCMLink(link);

  expect(target).toBe('_blank');

});
