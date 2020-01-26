import { HttpClient } from "../http-client/index";
import { DateUtils, INPUT_FORMATS } from "./date-utils";

const SORT = {
  ASC: "asc",
  DESC: "desc"
};

const SOLR_FORMAT_DATE = "YYYY-MM-DDThh:mm:ss";

class Solr {

  /**
   * It receives the base url to Solr
   * @param baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queryString = "";
    this.parseMap = {};
    this.useJSON = false;
    this.postQuery = {};
    this.isQueryIncluded = false;
  };


  /**
   * @method and: The AND operator matches documents where both terms exist anywhere
   * in the text of a single document.
   * @param leftClause
   * @param rightClause
   * @returns {string}
   */
  static and(leftClause, rightClause) {
    if (!this.prototype.__validString(leftClause) && !this.prototype.__validString(rightClause)) return "";

    return `(${leftClause} AND ${rightClause})`;
  }

  /**
   * @method or: The OR operator links two terms and finds a matching document if either
   * of the terms exist in a document.
   * @param leftClause
   * @param rightClause
   * @returns {string}
   */
  static or(leftClause, rightClause) {
    if (!this.prototype.__validString(leftClause) && !this.prototype.__validString(rightClause)) return "";

    return `(${leftClause} OR ${rightClause})`;
  }

  /**
   * @method not: The NOT operator excludes documents that contain the term after NOT.
   * @param {string} clause
   * @returns {string}
   */
  static not(clause) {
    if (!this.prototype.__validString(clause)) return "";

    return `(! ${clause})`;
  }

  /**
   * @method prohibit: Prohibits the following term (that is, matches on fields or documents
   * that do not include that term).
   * @param {string} clause
   * @returns {string}
   */
  static prohibit(clause) {
    if (!this.prototype.__validString(clause)) return "";

    return `(- ${clause})`;
  }

  /**
   * @method required: requires that the term after required symbol exist somewhere in a field
   * in at least one document in order for the query to return a match.
   * @param {string} clause
   * @returns {string}
   */
  static required(clause) {
    if (!this.prototype.__validString(clause)) return "";

    return `(+ ${clause})`;
  }

  /**
   * @method date: Add date value parsing the inputs to Solr valid format.
   * @param {string} startDate
   * @param {string} inputFormatDate | default: YYYY-MM-DD HH:mm:ss
   * @param {string} finishDate | default: *
   * @returns {string}
   */
  static date(startDate, inputFormatDate = INPUT_FORMATS.ISO, finishDate = "*") {
    if (!this.prototype.__validString(startDate) && !this.prototype.__validString(finishDate)) return "";
    startDate = DateUtils.formatCustomDate(startDate, SOLR_FORMAT_DATE, inputFormatDate);
    if (finishDate !== "*") {
      finishDate = DateUtils.formatCustomDate(finishDate, SOLR_FORMAT_DATE, inputFormatDate);
    }

    return `[${startDate}Z TO ${finishDate}]`;
  }

  /**
   * @method dateFromNow: Add value to filter from today to an specific date or to any date.
   * @param {string} finishDate | default: *
   * @param {string} inputFormatDate | default: YYYY-MM-DD HH:mm:ss
   * @returns {string}
   */
  static dateFromNow(finishDate = "*", inputFormatDate = INPUT_FORMATS.ISO) {
    if (!this.prototype.__validString(finishDate)) return "";

    if (finishDate !== "*") {
      finishDate = DateUtils.formatCustomDate(finishDate, SOLR_FORMAT_DATE, inputFormatDate);
    }
    return `[NOW/DAY TO ${finishDate}]`;
  }


  /**
   * @method post: this method allow the POST request.
   * @returns {Solr}
   */
  post() {
    this.useJSON = true;
    return this;
  }

  /**
   * @method addMapperKeyValue: Add a pair (key, value) with the equivalences
   * that you expect to receive after the query.
   * @param key
   * @param value
   */
  addMapperKeyValue(key, value) {
    if (!this.__validString(key) && !this.__validString(value)) return this;
    this.parseMap[key] = value;
    return this;
  }

  /**
   * @method addMapperObject: Add a object with the equivalences that you expect
   * to receive after the query.
   * @param {Object} obj
   */
  addMapperObject(obj) {
    if (!this.__validObj(obj)) return this;
    this.parseMap = Object.assign(this.parseMap, obj);
    return this;
  }

  /**
   * @method fq: fq is used to reduce the superset of documents that can be returned.
   * @param params
   * @returns {Solr}
   */
  fq(params) {
    if (!this.__validString(params)) return this;
    if (this.useJSON) {
      this.postQuery.filter.push(params);
    } else {
      this.queryString += this.__addQueryParam(params ? `fq=${params}` : "");
    }
    return this;
  }

  /**
   * @method q: q is used to restrict Solr query.
   * @param params
   * @returns {Solr}
   */
  q(params) {
    if (!this.__validString(params)) return this;
    if (this.useJSON) {
      this.postQuery.query.push(params);
    } else {
      this.queryString += this.__addQueryParam(params ? `q=${params}` : "");
    }
    this.isQueryIncluded = true;
    return this;
  }


  /**
   * @method fl: fields list is used to limit the fields that you are expecting from Solr.
   * @param elements
   * @returns {Solr}
   */
  fl(elements) {
    if (this.useJSON) {
      this.postQuery.fields = elements;
    } else {
      if (Array.isArray(elements) && elements.length) {
        this.queryString += this.__addQueryParam(`fl=${elements.join(",")}`);
      }
    }
    return this;
  }

  /**
   * @method sort: Add sort parameter to query.
   * @param paramName
   * @param asc
   * @returns {Solr}
   */
  sort(paramName, asc = true) {
    if (this.useJSON) {
      this.postQuery.sort = `${paramName} ${asc ? SORT["ASC"] : SORT["DESC"]}`;
    } else {
      this.queryString += this.__addQueryParam(`sort=${paramName} ${asc ? SORT["ASC"] : SORT["DESC"]}`);
    }
    return this;
  }

  /**
   * @method: start: Add start number to return documents from that index.
   * @param {number} start
   * @returns {Solr}
   */
  start(start = 0) {
    if (!this.__validNumber(start)) return this;
    if (this.useJSON) {
      this.postQuery.start = start;
    } else {
      this.queryString += this.__addQueryParam(`start=${start}`);
    }
    return this;
  }

  /**
   * @method: limit: Add end number to return documents until that index.
   * @param {number} limit
   * @returns {Solr}
   */
  limit(limit) {
    if (!this.__validNumber(limit)) return this;
    if (this.useJSON) {
      this.postQuery.limit = limit;
    } else {
      this.queryString += this.__addQueryParam(`rows=${limit}`);
    }
    return this;
  }

  /**
   * @method execute: this function make an ajax call to Solr and retrieve the response.
   * @returns {Promise|*|Promise<T | Array>|*}
   */
  execute() {
    let query = this.useJSON ?
      HttpClient.post(this.baseUrl, this.postQuery) :
      HttpClient.get(this.baseUrl + this.queryString);

    return query
      .then((response) => response.json())
      .then(jsonResponse => {
        return this.__parseData(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }


  /**
   * @method __parseData: this method allows the parse of the information retrieving for Solr,
   * if a parse map was added it will be use to return this data.
   * @param {Array} data
   * @returns {Array} response
   * @private
   */
  __parseData(data) {
    if (
      data &&
      data.response &&
      data.response.docs
    ) {

      let response = data.response.docs;
      const keys = Object.keys(this.parseMap);

      if (keys.length) {
        response = response.reduce((acc, curr) => {
          let obj = {};
          keys.forEach(key => {
            if (Array.isArray(curr[key])) {
              for (let item of curr[key]) {
                obj[item] = curr[key];
              }
            } else {
              obj[this.parseMap[key]] = curr[key];
            }
          });
          acc.push(obj);

          return acc;
        }, []);
      }

      return response;
    }
    return [];
  }

  /**
   * @method __addQueryParam: use this method to determine if the query string should use & or ?.
   * @param {string} param
   * @returns {string}
   * @private
   */
  __addQueryParam(param) {
    if (param) {
      return this.queryString ? `&${param}` : `?${param}`;
    }
    return "";
  }

  /**
   * @method __validString: validation to avoid add empty strings
   * @param input
   * @returns {boolean}
   * @private
   */
  __validString(input) {
    return typeof input === "string" && input.trim() !== "";
  }

  /**
   * @method __validObj: validation to avoid empty objects.
   * @param obj
   * @private
   */
  __validObj(obj) {
    const keys = Object.keys(obj);
    return typeof obj === "object" && keys.length && !keys.some(k => !this.__validString(obj[k]));
  }

  /**
   * @method __validNumber: validation to avoid no numbers.
   * @param {Number} number
   * @private
   */
  __validNumber(number) {
    return !Number.isNaN(number) || !Number.isNaN(+number);
  }
}

export { Solr };
