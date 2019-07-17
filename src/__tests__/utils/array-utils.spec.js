import { ArrayUtils } from "../..";

test("it flats a key-value object", () => {
  const object = {
    key2: { value: "b", index: 2 },
    key1: { value: "a", index: 1 }
  };

  const expectedObj = { key2: "b", key1: "a" };

  const resultingObj = ArrayUtils.flattenKeyValueObject(object);

  expect(resultingObj).toEqual(expectedObj);
});

test("it converts a key-value object to an array", () => {
  const object = {
    key2: { value: "b", index: 2 },
    key1: { value: "a", index: 1 }
  };

  const expectedArray = [
    { value: "b", key: "key2", index: 2 },
    { value: "a", key: "key1", index: 1 }
  ];

  const resultingArray = ArrayUtils.arrayFromObject(object);

  expect(resultingArray).toEqual(expectedArray);
});

test("it finds an object by comparing an specific field", () => {
  const array = [
    { title: "A", summary: "SA" },
    { title: "B", summary: "SB1" },
    { title: "B", summary: "SB2" },
    { title: "C", summary: "SC" }
  ];

  const object = { title: "B", summary: "SB" };

  // It will return the first occurrence of an object with the same title as the object passed as second parameter
  const index = ArrayUtils.getObjectIndexInArrayByField(array, object, "title");

  expect(index).toBe(1);
});

test("it gets unique elements in an array ", () => {
  const array = [
    { title: "A", summary: "SA" },
    { title: "B", summary: "SB1" },
    { title: "B", summary: "SB2" },
    { title: "B", summary: "SB3" },
    { title: "C", summary: "SC" }
  ];

  const expectedArray = [
    { title: "A", summary: "SA" },
    { title: "B", summary: "SB1" },
    { title: "C", summary: "SC" }
  ];

  const arrayWithUniqueElements = ArrayUtils.getUniqueItemsInArrayByFieldName(
    array,
    "title"
  );

  expect(arrayWithUniqueElements).toEqual(expectedArray);
});

test("it moves an object in an array from one position (oldIndex) to another (newIndex < array.length)", () => {
  const array = [{ title: "A" }, { title: "B" }, { title: "C" }];
  const arrayMoved = [{ title: "B" }, { title: "C" }, { title: "A" }];

  // Be aware this operation is mutable
  ArrayUtils.moveItemInArray(array, 0, 2);

  expect(array).toEqual(arrayMoved);
});

test("it moves and object in an array from one position (index) to another (newIndex >= array.length)", () => {
  const array = [{ title: "A" }, { title: "B" }, { title: "C" }];
  const arrayMoved = [
    { title: "B" },
    { title: "C" },
    undefined,
    undefined,
    { title: "A" }
  ];

  // Be aware this operation is mutable
  ArrayUtils.moveItemInArray(array, 0, 4);

  expect(array).toEqual(arrayMoved);
});
