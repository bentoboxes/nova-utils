# WCM Utils

This set of utilities are intended to 

Status:

## Install

```bash
$ npm install --save @bentoboxes/wcm-utils
```

## Usage

```javascript
const { DateUtils } = require("@bentoboxes/wcm-utils");

const dateString = "2019-12-30T12:34:18";
const inputFormat = "YYYY-MM-DDTHH:mm:ss";
const outputFormat = "MM/YYYY";

DateUtils.format(dateString, inputFormat, outputFormat);
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

