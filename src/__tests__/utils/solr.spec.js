import { Solr } from "../../utils/solr";

describe("Test new Solr instance", () => {
  test("it has base url", () => {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    expect(query.baseUrl).toBe(baseUrl);
  });
});

describe("Test query string", () => {
  test("it has valid query", ()=> {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    expect(query.baseUrl + query.buildQuery() + query.buildFilters()).toBe(baseUrl);
  });

  test("it has valid params", ()=> {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    query.addQueryParams('authtemplate', 'news');

    expect(query.buildQuery()).toBe('q=authtemplate:news');
  })

  test("it has valid query params one param", ()=> {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    query.addQueryParams('authtemplate', 'news');
    query.addToQuery(query.buildQuery());
    expect(query.query).toBe('?q=authtemplate:news');
  })

  test("it has valid query params two params", ()=> {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    query.addQueryParams('authtemplate', 'news');
    query.addFilterParams('authtemplate', 'news');
    query.addToQuery(query.buildQuery());
    query.addToQuery(query.buildFilters());
    expect(query.query).toBe('?q=authtemplate:news&fq=authtemplate:news');
  });


  test("it has valid query extends", ()=> {
    const baseUrl = "/myservices/search-service/doRequest/dp-content/select";
    const query = new Solr(baseUrl);
    query.q('authtemplate:news')
    expect(query.query).toBe('?q=authtemplate:news');
  })
});

describe("Test Solr utils", () => {
  test("it has valid date format", ()=> {
    const date = Solr.date('2020/01/22 12:00:00', 'YYYY-MM-DD HH:mm:ss');
    expect(date).toBe('[2020-01-22T12:00:00Z TO *]');
  });

  test("it has valid from now date ", ()=> {
    const date = Solr.dateFromNow();
    expect(date).toBe('[NOW/DAY TO *]');
  });

});

