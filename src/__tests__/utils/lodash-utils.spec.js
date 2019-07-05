import { LodashUtils } from "../..";

test("it checks Lodash is correctly loaded", () => {
  const lodashInstance = LodashUtils;
  const anyLodashMethod = typeof lodashInstance.sortBy;

  expect(anyLodashMethod).not.toBe("undefined");
});
