/**
 * Database CRUD module
 * @module
 */

require('./env-config.js')();
const { Pool } = require('pg');
//const schemas = require('./schemas.js');

const pool = new Pool();

/**
 * CREATES rows in the given table
 * @param   {string}            table Name of table
 * @param   {(Object|Object[])} rows  Rows to create { [column]: [value], ... }
 * @returns {Promise.<Result[]>}      An array of Result objects from node-postgres
 */
exports.create = (table, rows) => {
  if (typeof rows === 'object') rows = [rows];
  if (table && rows) {
    const queries = rows.map(row => {
      let columnStatement = '(';
      let valuesStatement = '($';
      let values = [];
      let count = 1;
      for (const [key, value] of Object.entries(row)) {
        columnStatement += `${key}, `;
        valuesStatement += `${count}, $`;
        values.push(value);
        count++;
      }
      columnStatement = columnStatement.slice(0, -2) + ')';
      valuesStatement = valuesStatement.slice(0, -3) + ')';
      return pool.query(`INSERT INTO ${table} ${columnStatement} VALUES ${valuesStatement}`, values);
    });
    return Promise.all(queries);
  } else {
    return Promise.reject('Faulty call to function');
  }
  
};

/**
 * READS the row that matches the identifier
 * @param   {string} table         Name of table
 * @param   {Object} rowIdentifier { [column]: [value to match] }
 * @returns {Promise.<Result>}     The matched row. Found at Result.rows[0]
 */
exports.read = (table, rowIdentifier) => {
  if (table) {
    let [ identifierKey, identifierValue ] = Object.entries(rowIdentifier)[0];
    if (typeof identifierValue === 'string') identifierValue = `'${identifierValue}'`;
    const conditionStatement = ` WHERE ${identifierKey} = ${identifierValue}`;

    return new Promise(resolve => resolve(pool.query(`SELECT * FROM ${table}${conditionStatement}`)));
  } else {
    return Promise.reject('Faulty call to function');
  }
};

/**
 * UPDATES the row that matches the identifier with the given data
 * @param   {string} table         Name of the table
 * @param   {Object} rowIdentifier { [column]: [value to match] }
 * @param   {Object} data          { [column]: [value to update], ... }
 * @returns {Promise.<Result>}     A Result object from node-postgres
 */
exports.update = (table, rowIdentifier, data) => {
  if (table && rowIdentifier && data) {
    let [ identifierKey, identifierValue ] = Object.entries(rowIdentifier)[0];
    if (typeof identifierValue === 'string') identifierValue = `'${identifierValue}'`;
    const conditionStatement = ` WHERE ${identifierKey} = ${identifierValue}`;
  
    let setStatement = ' SET ';
    for (let [ key, value ] of Object.entries(data)) {
      if (typeof value === 'string') value = `'${value}'`;
      setStatement += `${key} = ${value},`;
    }
    setStatement = setStatement.slice(0, -1);
   
    return new Promise(resolve => resolve(pool.query(`UPDATE ${table}${setStatement}${conditionStatement}`)));
  } else {
    return Promise.reject('Faulty call to function');
  }
}

/**
 * DELETES the row that matches the identifier
 * @param   {string} table         Name of table
 * @param   {Object} rowIdentifier { [column]: [value to match] }
 * @returns {Promise<Result>}      A Result object from node-postgres
 */
exports.del = (table, rowIdentifier) => {
  if (table && rowIdentifier) {
    let [ identifierKey, identifierValue ] = Object.entries(rowIdentifier)[0];
    if (typeof identifierValue === 'string') identifierValue = `'${identifierValue}'`;
    const conditionStatement = ` WHERE ${identifierKey} = ${identifierValue}`;

    return new Promise(resolve => resolve(pool.query(`DELETE FROM ${table}${conditionStatement}`)));
  } else {
    return Promise.reject('Faulty call to function');
  }
}