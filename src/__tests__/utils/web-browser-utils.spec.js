/**
 * @jest-environment jsdom
 */
import { WebBrowserUtils } from "../../utils";

test("it returns the version of Internet Explorer", () => {
  const ieVersion = WebBrowserUtils.getInternetExplorerVersion();

  expect(ieVersion).toEqual(-1);
});

describe("it transforms a params object in a 'query string compatible' output", () => {
  test("with decoding using decodeURIComponent", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com"
    };

    const output = WebBrowserUtils.transformParamsObjectToQueryString(input);

    const expectedValue = "name=John&lastName=Doe&email=john.doe@example.com";

    expect(output).toBe(expectedValue);
  });

  test("with no decoding", () => {
    const input = {
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com"
    };

    const useEncodeURIComponent = false;

    const output = WebBrowserUtils.transformParamsObjectToQueryString(
      input,
      useEncodeURIComponent
    );

    const expectedValue = "name=John&lastName=Doe&email=john.doe%40example.com";

    expect(output).toBe(expectedValue);
  });
});
