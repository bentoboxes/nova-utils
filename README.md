# Nova Utils

This set of utilities are intended to 

Status:

## Install

```bash
$ npm install --save @bentoboxes/nova-utils
```

## Usage

```javascript
const { DateUtils } = require("@bentoboxes/nova-utils");

const dateString = "2019-12-30T12:34:18";
const inputFormat = "YYYY-MM-DDTHH:mm:ss";
const outputFormat = "MM/YYYY";

DateUtils.format(dateString, inputFormat, outputFormat);
```

## File Structure
```
.
├── CHANGELOG.md
├── CODE-OF-CONDUCT.md
├── LICENSE.md
├── README.md
├── babel.config.js                         Used by Jest for allowing the "import" instructions in *.spec.js files
├── dist
│   ├── nova-utils.bundle.browser.js
│   ├── nova-utils.bundle.esm.js
│   └── nova-utils.bundle.umd.js
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── rollup.config.js
├── src
│   ├── __tests__
│   ├── index.js
│   └── utils
└── yarn.lock

```

## License

[The MIT License](http://opensource.org/licenses/MIT)

