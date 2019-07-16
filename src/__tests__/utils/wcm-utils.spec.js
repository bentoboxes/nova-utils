/**
 * @jest-environment jsdom
 */
import { IBMWCMUtils } from "../../utils/wcm-utils";

test("it gets target from an anchor HTML string", () => {
  const link = `
    <a href="https://alex-arriaga.com/" data-target="#something" target="_blank" title="Link">Go to a great blog</a>
  `;

  const target = IBMWCMUtils.getTargetFromWCMLink(link);

  expect(target).toBe("_blank");
});

test("it gets target from an invalid input", () => {
  const link = document.createElement("a");

  const target = IBMWCMUtils.getTargetFromWCMLink(link);

  expect(target).toBe("_self");
});
//
// test("it gets URL from an anchor HTML string", () => {
//   const link = `
//      <a href="https://alex-arriaga.com/" data-target="#something" target="_blank" title="Link">Go to a great blog</a>
//    `;
//
//   const url = IBMWCMUtils.getURLFromWCMLink(link);
//
//   expect(url).toBe("https://alex-arriaga.com/");
// });

test("it re-writes a WCM URL to its corresponding URI path", () => {
  const relativeURL =
    "/wps/wcm/connect/virtual/library+content+english/home/news/what-is-going-on-in-the-front-end-word";
  const resultingURIPath = IBMWCMUtils.getURIPathFromWCMURL(relativeURL);
  const expectedURIPath =
    "?1dmy&urile=wcm%3apath%3avirtual/library+content+english/home/news/what-is-going-on-in-the-front-end-word";
  expect(resultingURIPath).toBe(expectedURIPath);
});

test("it tries to re-write a non-WCM URL to its corresponding URI path", () => {
  const badURL = 2324323;
  const resultingURIPath = IBMWCMUtils.getURIPathFromWCMURL(badURL);

  expect(resultingURIPath).toBe("#");
});

test("it re-writes a WCM URL to its corresponding URI path using a virtual context", () => {
  const relativeURL =
    "/wps/wcm/connect/virtual/library+content+english/home/news/what-is-going-on-in-the-front-end-word";
  const virtualContext = "virtual";
  const resultingURIPath = IBMWCMUtils.getURIPathFromWCMURL(
    relativeURL,
    virtualContext
  );
  const expectedURIPath =
    "?1dmy&urile=wcm%3apath%3a/library+content+english/home/news/what-is-going-on-in-the-front-end-word";

  expect(resultingURIPath).toBe(expectedURIPath);
});

test("it re-writes a WCM URL to its corresponding URI path using a virtual context defined as global variable", () => {
  // Global definition
  window.portalContext = "virtual";

  const relativeURL =
    "/wps/wcm/connect/virtual/library+content+english/home/news/what-is-going-on-in-the-front-end-word";
  const resultingURIPath = IBMWCMUtils.getURIPathFromWCMURL(relativeURL);
  const expectedURIPath =
    "?1dmy&urile=wcm%3apath%3a/library+content+english/home/news/what-is-going-on-in-the-front-end-word";

  expect(resultingURIPath).toBe(expectedURIPath);
});

test("it re-writes a Youtube URL to be embedded", () => {
  const youtubeURL = "https://www.youtube.com/watch?v=8P48t_f9JhA";
  const resultingYoutubeURL = IBMWCMUtils.convertYoutubeUrlToBeEmbedded(
    youtubeURL
  );
  const expectedURL = "https://www.youtube.com/embed/8P48t_f9JhA";

  expect(resultingYoutubeURL).toBe(expectedURL);
});

test("it re-writes a non-valid Youtube URL to be embedded", () => {
  const youtubeURL = 234234;
  const resultingYoutubeURL = IBMWCMUtils.convertYoutubeUrlToBeEmbedded(
    youtubeURL
  );
  const expectedURL = "#";

  expect(resultingYoutubeURL).toBe(expectedURL);
});

test("it re-writes a Vimeo URL to be embedded", () => {
  const vimeoURL = "https://player.vimeo.com/163231391";
  const resultingVimeoURL = IBMWCMUtils.convertVimeoUrlToBeEmbedded(vimeoURL);
  const expectedURL = "https://player.vimeo.com/video/163231391";

  expect(resultingVimeoURL).toBe(expectedURL);
});

test("it re-writes a non-valid Vimeo URL to be embedded", () => {
  const vimeoURL = 234234;
  const resultingVimeoURL = IBMWCMUtils.convertVimeoUrlToBeEmbedded(vimeoURL);
  const expectedURL = "#";

  expect(resultingVimeoURL).toBe(expectedURL);
});

test("it fixes a link URL provided by IBM / HCL Portal", () => {
  const expectedLinkURL =
    "?-9dmy&urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-2";
  const inputLinkURL =
    "?-9dmy&amp;urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-2";

  const resultingLinkURL = IBMWCMUtils.fixPortalLinkURL(inputLinkURL);

  expect(resultingLinkURL).toBe(expectedLinkURL);
});

describe("it fixes link URLs in an array of items", () => {
  test("using an invalid input", () => {
    const invalidInputArray = {};

    const resultingArray = IBMWCMUtils.fixURLsInItems(
      invalidInputArray,
      "linkURL"
    );

    // When no valid array is provided, the method only returns the same parameter
    expect(resultingArray).toEqual({});
  });

  test("using a valid input array", () => {
    const inputArray = [
      {
        title: "A great convention is about to start!",
        linkURL:
          "?-9dmy&amp;urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-1"
      },
      {
        title: "Another great convention is about to start!",
        linkURL:
          "?-9dmy&amp;urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-2"
      },
      {
        title: "A third conference about awesome things!",
        linkURL:
          "?-9dmy&amp;urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-3"
      }
    ];

    const expectedArray = [
      {
        title: "A great convention is about to start!",
        linkURL:
          "?-9dmy&urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-1"
      },
      {
        title: "Another great convention is about to start!",
        linkURL:
          "?-9dmy&urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-2"
      },
      {
        title: "A third conference about awesome things!",
        linkURL:
          "?-9dmy&urile=wcm%3apath%3a%2Fcontent-english%2Fhome%2Fnews%2F2019-convention-3"
      }
    ];

    const resultingArray = IBMWCMUtils.fixURLsInItems(inputArray, "linkURL");

    expect(resultingArray).toEqual(expectedArray);
  });
});
