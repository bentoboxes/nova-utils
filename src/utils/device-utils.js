import isMobile from "ismobilejs";

/** Class with static method for lodash */

class DeviceUtilsSingleton {
  /**
   * Constructor restricted to this class itself
   */
  constructor() {
    if (!DeviceUtilsSingleton.instance) {
      DeviceUtilsSingleton.instance = { isMobile };
    }

    return DeviceUtilsSingleton.instance;
  }
}

const DeviceUtils = new DeviceUtilsSingleton();

export { DeviceUtils };
