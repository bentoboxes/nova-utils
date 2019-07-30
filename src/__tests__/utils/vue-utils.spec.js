import { VueUtils } from "../../utils/";

test("it checks if a parameter is undefined", () => {
  const param = undefined;

  const result = VueUtils._isUndefined(param);

  expect(result).toBe(true);
});
