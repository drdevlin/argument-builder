require('./env-config.js')();
const { Pool } = require('pg');
//const schemas = require('./schemas.js');

const pool = new Pool();

/**
 * Creates rows in the given table
 * @param   {String}  table Name of table
 * @param   {Array}   rows  Rows to create [ { |column|: |value|, ... }, ... ]
 * @returns {Promise}       Resolves to an array of Result objects from node-postgres
 */
const create = (table, rows) => {
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
 * Returns the row that matches the identifier
 * @param   {String}  table         Name of table
 * @param   {Object}  rowIdentifier { |column|: |value to match| }
 * @returns {Promise}               Returned row bound to |Result|.rows[0]
 */
const read = (table, rowIdentifier) => {
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
 * Updates the row that matches the identifier with the given data
 * @param   {String}  table         Name of the table
 * @param   {Object}  rowIdentifier { |column|: |value to match| }
 * @param   {Object}  data          { |column|: |value to update|, ... }
 * @returns {Promise}               Resolves to a Result object from node-postgres
 */
const update = (table, rowIdentifier, data) => {
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
 * Deletes the row that matches the identifier
 * @param {String}    table         Name of table
 * @param {Object}    rowIdentifier { |column|: |value to match| }
 * @returns {Promise}               Resolves to a Result object from node-postgres
 */
const del = (table, rowIdentifier) => {
  if (table && rowIdentifier) {
    let [ identifierKey, identifierValue ] = Object.entries(rowIdentifier)[0];
    if (typeof identifierValue === 'string') identifierValue = `'${identifierValue}'`;
    const conditionStatement = ` WHERE ${identifierKey} = ${identifierValue}`;

    return new Promise(resolve => resolve(pool.query(`DELETE FROM ${table}${conditionStatement}`)));
  } else {
    return Promise.reject('Faulty call to function');
  }
}


module.exports = { create, read, update, del };