import _ from "lodash";

/** Class with static method for lodash */

class LodashUtilsSingleton {
  /**
   * Constructor restricted to this class itself
   */
  constructor() {
    if (!LodashUtilsSingleton.instance) {
      LodashUtilsSingleton.instance = _;
    }

    return LodashUtilsSingleton.instance;
  }
}

const LodashUtils = new LodashUtilsSingleton();

export { LodashUtils };
