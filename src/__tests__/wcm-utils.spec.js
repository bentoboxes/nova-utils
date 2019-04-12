import {IBMWCMUtils} from '../utils/wcm-utils';

test('it gets target from an anchor HTML string', () => {

  const link = `
    <a href="https://alex-arriaga.com/" data-target="#something" target="_blank" title="Link">Go to a great blog</a>
  `;

  const target = IBMWCMUtils.getTargetFromWCMLink(link);

  expect(target).toBe('_blank');

});

// test('it gets URL from an anchor HTML string', () => {
//
//   const link = `
//     <a href="https://alex-arriaga.com/" data-target="#something" target="_blank" title="Link">Go to a great blog</a>
//   `;
//
//   const url = IBMWCMUtils.getURLFromWCMLink(link);
//
//   expect(url).toBe('https://alex-arriaga.com/');
//
// });
