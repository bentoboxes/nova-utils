import _ from "lodash";

/** Class with static method for lodash */

class LodashUtils {

  /**
   * Constructor restricted to this class itself
   */
  constructor() {
    if (!LodashUtils.instance) {
      LodashUtils.instance = _;
    }
  }

  /**
   * Static method to return instance of LodashUtils class
   * @return {object} LodashUtils instance that point to lodash object
   * */
  static getInstance() {
    return LodashUtils.instance;
  }
}

export { LodashUtils };
