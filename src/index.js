import { DateUtils } from "./utils/date-utils";
import { StringUtils } from "./utils/string-utils";
import { IBMWCMUtils } from "./utils/wcm-utils";
import { ArrayUtils } from "./utils/array-utils";
import { WebBrowserUtils } from "./utils/web-browser-utils";
import { VueUtils } from "./utils/vue-utils";
import { LodashUtils } from "./utils/lodash-utils";
import { DeviceUtils } from "./utils/device-utils";
import { HttpClient } from "./http-client";
import { Solr } from "./utils/solr";
import SessionStorageStateAPI from "./utils/session-state";
import BrowserHistoryStateAPI from "./utils/browser-history-state";
import { VERSION_MANAGER } from "./utils/version";
import { MIME_TYPES } from "./enums/mime-types";

const version = VERSION_MANAGER.version;

export {
  StringUtils,
  DateUtils,
  IBMWCMUtils,
  ArrayUtils,
  WebBrowserUtils,
  VueUtils,
  LodashUtils,
  DeviceUtils,
  HttpClient,
  version,
  MIME_TYPES,
  Solr,
  SessionStorageStateAPI,
  BrowserHistoryStateAPI
};

//  Following code is not needed anymore thanks to Rollup configuration
// class WindowNamespaceGenerator {
//   static init(global) {
//     if (typeof global !== 'undefined' && typeof global.NovaUtils !== 'undefined') {
//       const NovaUtils = {
//         StringUtils, DateUtils, IBMWCMUtils, ArrayUtils, WebBrowserUtils,
//       };
//
//       // Register our namespace as a global
//       global.NovaUtils = NovaUtils;
//     }
//   }
// }

// WindowNamespaceGenerator.init(window);
