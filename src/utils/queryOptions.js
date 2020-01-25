class QueryOptions {

  constructor(query) {
    this.query = query;
  }

  and(leftClause, rightClause) {
    this.query += `(${leftClause} AND ${rightClause})`;
  }

  or(leftClause, rightClause) {
    this.query += `(${leftClause} OR ${rightClause})`;
  }

  not(clause) {
    this.query += `(! ${clause})`;
  }

  prohibit(clause) {
    this.query += `(- ${clause})`;
  }

}


class Q extends QueryOptions {

  constructor(query) {
    super();
  }


}


class FQ extends QueryOptions {

  constructor() {
    super();
    this.query = "fq=";
  }

  fq() {
    return this.query;
  }

}

export { QueryOptions, Q, FQ };
