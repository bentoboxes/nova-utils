import { DateUtils } from "./utils/date-utils";
import { StringUtils } from "./utils/string-utils";
import { IBMWCMUtils } from "./utils/wcm-utils";
import { ArrayUtils } from "./utils/array-utils";
import { WebBrowserUtils } from "./utils/web-browser-utils";
import { VueUtils } from "./utils/vue-utils";
import { LodashUtils } from "./utils/lodash-utils";

export { StringUtils, DateUtils, IBMWCMUtils, ArrayUtils, WebBrowserUtils, VueUtils, LodashUtils };

//  Following code is not needed anymore thanks to Rollup configuration
// class WindowNamespaceGenerator {
//   static init(global) {
//     if (typeof global !== 'undefined' && typeof global.WCMUtils !== 'undefined') {
//       const WCMUtils = {
//         StringUtils, DateUtils, IBMWCMUtils, ArrayUtils, WebBrowserUtils,
//       };
//
//       // Register our namespace as a global
//       global.WCMUtils = WCMUtils;
//     }
//   }
// }

// WindowNamespaceGenerator.init(window);
