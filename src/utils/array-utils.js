/** Class with static methods for arrays processing */
class ArrayUtils {
  /**
   * Allows to get the index of an object in an array
   * @static
   * @param {object[]} array - The input array to find an object
   * @param {object} object - The object to be found
   * @param {string} field - The field name to be used to compare and find the object
   * @return {number} The index of the object, -1 if not found
   */
  static getObjectIndexInArrayByField(array, object, field) {
    for (let i = 0, length = array.length; i < length; i++) {
      if (
        array[i][field] === object[field] &&
        array[i][field] === object[field]
      ) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Allows get unique elements in an array, the "unicity" is given by a determinate field
   * Sample array of items = [{title: "News 1"}, {title: "News 2"}, {title: "News 1"}]
   * -> ArrayUtils.getUniqueItemsInArrayByFieldName(items, "title")
   * -> [{title: "News 1"}, {title: "News 2"}]
   * @static
   * @param {object[]} array - The input array to get unique objects from
   * @param {string} fieldToBeUnique - The field to be used for "uniqueness" determination
   * @return {object[]} The array with only unique objects in it
   */
  static getUniqueItemsInArrayByFieldName(array, fieldToBeUnique) {
    let temporaryArray = [];

    for (let i = 0, length = array.length; i < length; i++) {
      let current = array[i];

      if (
        this.getObjectIndexInArrayByField(
          temporaryArray,
          current,
          fieldToBeUnique
        ) < 0
      ) {
        temporaryArray.push(current);
      }
    }
    return temporaryArray;
  }

  /**
   * Allows to move and item in an array of elements (mutable operation)
   * Sample array of items = [1,2,3]
   * -> ArrayUtils.moveItemInArray(items, 0, 2)
   * -> [2, 3, 1]
   * @static
   * @param {object[]} array - The input array where to run the "move" operation
   * @param {number} oldIndex - The original index where the object is located
   * @param {number} newIndex - The index where the object will be moved to
   * @return {object[]} returns a reference to the array (it is the same array, since this operation is mutable)
   */
  static moveItemInArray(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
      let k = newIndex - array.length;
      while (k-- + 1) {
        array.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array; // For testing purposes we return a reference
  }

  /**
   * Converts a key-value object to an array
   * -> ArrayUtils.arrayFromObject(obj)
   * -> []
   * @static
   * @param obj - The input object to be converted
   * @return {Array} returns an array keeping the "key" for further usage
   */
  static arrayFromObject(obj) {
    const array = [];

    /*
     * {
     *    key1 : { index: 1, value: 'a'},
     *    key2 : { index: 2, value: 'b'}
     * }
     * =>
     * [ { key: "key1", index: 1, value: 'a' }, { key: "key2", index: 2, value: 'b' } ]
     */

    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        array.push({ key, ...obj[key] });
      }
    }

    return array;
  }

  /**
   * Flats a key-value object to be just key-value without any other properties
   * -> obj = {
   *    key1 : { index: 1, value: 'a'},
   *    key2 : { index: 2, value: 'b'}
   * }
   * -> ArrayUtils.flattenKeyValueObject(obj)
   * -> { key1: 'a', key2: 'b' }
   * @static
   * @param obj - The key-value object to be flatten
   * @return {object} - The flatten object
   */
  static flattenKeyValueObject(obj) {
    const flatObj = {};

    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        flatObj[key] = obj[key].value;
      }
    }

    return flatObj;
  }
}

export { ArrayUtils };
