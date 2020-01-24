import { HttpClient } from "../http-client/index";

const SORT = {
  ASC: "asc",
  DESC: "desc"
};


class Solr {

  /**
   * It receives the base url to Solr
   * @param baseUrl
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queryParams = {};
    this.filterParams = {};
    this.sort = "";
    this.query = "";
    this.parseMap = {};
  };

  /**
   * @param {String} paramName
   * @param {String, Array} values
   */
  addQueryParams(paramName, values) {
    this.queryParams[paramName] = values;
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
   *
   * @param paramName
   * @param asc
   */
  addSortParam(paramName, asc = true) {
    this.sort = `${paramName} ${asc ? SORT["ASC"] : SORT["DESC"]}`;
  }

  /**
   * @static
   * @returns {string}
   */
  buildQuery() {
    const queryParams = this.queryParams;
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
   * @param data
   * @returns {*}
   */
  parseData(data) {
    if (
      data &&
      data.response &&
      data.response.docs
    ) {

      let response = data.response.docs;
      const keys = Object.keys(this.parseMap);

      if (keys.length) {
        response.reduce((acc, curr) => {
          let obj = {};
          keys.forEach(key => {
            obj[this.parseMap[key]] = curr[key];
          });
          acc.push(obj);
        }, []);
      }

      return response;
    }
    return [];
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
  }

  /**
   *
   * @param obj
   */

  addParseObject(obj) {
    this.parseMap = Object.assign(this.parseMap, obj);
  }


  /**
   *
   * @returns {Promise|*|Promise<T | Array>|*}
   */
  makeQuery() {

    this.addToQuery(this.buildQuery());
    this.addToQuery(this.buildFilters());
    this.addToQuery(this.sort);

    return HttpClient.get(this.baseUrl + this.query)
      .then((response) => response.json())
      .then(jsonResponse => {
        return this.parseData(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

}

export { Solr };
