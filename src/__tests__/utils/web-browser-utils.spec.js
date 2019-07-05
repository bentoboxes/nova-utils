/**
 * @jest-environment jsdom
 */
import { WebBrowserUtils } from "../../utils/web-browser-utils";

test("it returns the version of Internet Explorer", () => {
  const ieVersion = WebBrowserUtils.getInternetExplorerVersion();

  expect(ieVersion).toEqual(-1);
});
