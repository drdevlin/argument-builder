require('./env-config.js')();
const { Pool } = require('pg');
//const schemas = require('./schemas.js');

const pool = new Pool();

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