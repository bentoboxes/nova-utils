class ArrayUtils {
  /*******************************************************************************************
   * Allows to get the index of an object in an array
   *******************************************************************************************/
  static getObjectIndexInArrayByField(array, object, field) {
    for (var i = 0, length = array.length; i < length; i++) {
      if (
          array[i][field] === object[field] &&
          array[i][field] === object[field]
      ) {
        return i;
      }
    }
    return -1;
  }

  /*******************************************************************************************
   * Allows get unique elements in an array, the "unicity" is given by a determinate field
   * Sample array of items = [{title: "News 1"}, {title: "News 2"}, {title: "News 1"}]
   * -> ArrayUtils.getUniqueItemsInArrayByFieldName(items, "title")
   * -> [{title: "News 1"}, {title: "News 2"}]
   *******************************************************************************************/
  static getUniqueItemsInArrayByFieldName(array, fieldToBeUnique) {
    var temporaryArray = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var current = array[i];
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

  /*******************************************************************************************
   * Allows to move and item in an array of elements
   * Sample array of items = [1,2,3]
   * -> ArrayUtils.moveItemInArray(items, 0, 2)
   * -> [2, 3, 1]
   *******************************************************************************************/
  static moveItemInArray(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
      var k = newIndex - this.length;
      while (k-- + 1) {
        this.push(undefined);
      }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array; // For testing purposes we return a reference
  }
}

export {ArrayUtils};
