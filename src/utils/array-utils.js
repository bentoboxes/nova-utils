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
   */
  static getUniqueItemsInArrayByFieldName(array, fieldToBeUnique) {
    let temporaryArray = [];

    for (let i = 0, length = array.length; i < length; i++) {
      let current = array[i];

      if (
          this.getObjectIndexInArrayByField(
              temporaryArray,
              current,
              fieldToBeUnique,
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
}

export {ArrayUtils};
