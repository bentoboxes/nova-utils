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
    this.queryParam = {};
    this.filterParams = {};
    this.query = "";
    this.parseMap = {};
    this.useJSON = false;
    this.postQuery = {
      query: "",
      filter: "",
      rows: "",
      sort: ""
    };
  };


  /**
   * @method post: this method allow the POST request.
   * @returns {Solr}
   */
  post() {
    this.useJSON = true;
    return this;
  }


  /**
   * @param {String} paramName
   * @param {String, Array} values
   */
  addQueryParams(paramName, values) {
    this.queryParam[paramName] = values;
  }

  /**
   * @static
   * @param paramName
   * @param values
   */
  addFilterParams(paramName, values) {
    this.filterParams[paramName] = values;
  }


  /**
   * @static
   * @returns {string}
   */
  buildQuery() {
    const queryParams = this.queryParam;
    let queryString = Object.keys(queryParams).reduce((acc, curr) => {
      let currentValues = queryParams[curr];
      if (Array.isArray(currentValues)) {
        acc += `${acc !== "" ? " AND " : ""}${curr}:${currentValues.join(",")}`;
      } else {
        acc += `${acc !== "" ? " AND " : ""}${curr}:${currentValues}`;
      }
      return acc;
    }, "");

    return queryString !== "" ? `q=${queryString}` : "";
  }


  /**
   *
   * @returns {string}
   */

  buildFilters() {
    const filterParams = this.filterParams;
    let filterString = Object.keys(filterParams).reduce((acc, curr) => {
      let currentValues = filterParams[curr];
      if (Array.isArray(currentValues)) {
        acc += `${acc !== "" ? " AND " : ""}${curr}:${currentValues.join(",")}`;
      } else {
        acc += `${acc !== "" ? " AND " : ""}${curr}:${currentValues}`;
      }
      return acc;
    }, "");

    return filterString !== "" ? `fq=${filterString}` : "";
  }


  /**
   *
   * @param str
   */
  addToQuery(str) {
    if (str !== "") {
      this.query += this.query === "" ? `?${str}` : `&${str}`;
    }
  }


  /**
   *
   * @param key
   * @param value
   */
  addParseKeyValue(key, value) {
    this.parseMap[key] = value;
    return this;
  }

  /**
   *
   * @param obj
   */

  addParseObject(obj) {
    this.parseMap = Object.assign(this.parseMap, obj);
    return this;
  }

  /**
   *
   * @param leftClause
   * @param rightClause
   * @returns {string}
   */
  static and(leftClause, rightClause) {
    return `(${leftClause} AND ${rightClause})`;
  }

  /**
   *
   * @param leftClause
   * @param rightClause
   * @returns {string}
   */
  static or(leftClause, rightClause) {
    return `(${leftClause} OR ${rightClause})`;
  }

  /**
   *
   * @param clause
   * @returns {string}
   */
  static not(clause) {
    return `(! ${clause})`;
  }

  /**
   *
   * @param clause
   * @returns {string}
   */
  static prohibit(clause) {
    return `(- ${clause})`;
  }

  /**
   *
   * @param {string} startDate
   * @param {string} inputFormatDate | default: YYYY-MM-DD HH:mm:ss
   * @param {string} finishDate | default: *
   * @returns {string}
   */
  static date(startDate, inputFormatDate = INPUT_FORMATS.ISO, finishDate = "*") {

    startDate = DateUtils.formatCustomDate(startDate, SOLR_FORMAT_DATE, inputFormatDate);
    if (finishDate !== "*") {
      finishDate = DateUtils.formatCustomDate(finishDate, SOLR_FORMAT_DATE, inputFormatDate);
    }

    return `[${startDate}Z TO ${finishDate}]`;
  }

  /**
   *
   * @param {string} finishDate | default: *
   * @param {string} inputFormatDate | default: YYYY-MM-DD HH:mm:ss
   * @returns {string}
   */
  static dateFromNow(finishDate = "*", inputFormatDate = INPUT_FORMATS.ISO) {
    if (finishDate !== "*") {
      finishDate = DateUtils.formatCustomDate(finishDate, SOLR_FORMAT_DATE, inputFormatDate);
    }
    return `[NOW/DAY TO ${finishDate}]`;
  }

  /**
   *
   * @param params
   * @returns {Solr}
   */
  fq(params) {
    this.query += this.__addQueryParam(params ? `fq=${params}` : "");
    return this;
  }

  /**
   *
   * @param params
   * @returns {Solr}
   */
  q(params) {
    this.query += this.__addQueryParam(params ? `q=${params}` : "");
    return this;
  }


  /**
   * @method fl: fields list is used to limit the fields that you are expecting from Solr.
   * @param elements
   * @returns {Solr}
   */
  fl(elements) {
    if (Array.isArray(elements) && elements.length) {
      this.query += this.__addQueryParam(`fl=${elements.join(",")}`);
    }
    return this;
  }

  /**
   *
   * @param paramName
   * @param asc
   * @returns {Solr}
   */
  sort(paramName, asc = true) {
    this.query += this.__addQueryParam(`${paramName} ${asc ? SORT["ASC"] : SORT["DESC"]}`);
    return this;
  }

  /**
   *
   * @returns {Promise|*|Promise<T | Array>|*}
   */
  execute() {
    return HttpClient.get(this.baseUrl + this.query)
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
            obj[this.parseMap[key]] = curr[key];
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
      return this.query ? `&${param}` : `?${param}`;
    }
    return "";
  }

}

export { Solr };
