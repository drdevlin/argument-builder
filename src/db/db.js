require('./env-config.js')();
const { Pool } = require('pg');
const schemas = require('./schemas.js');

const pool = new Pool();

const create = (table, rows) => {
  const schemaKeys = Object.keys(schemas[table]);
  const columns = '(' + schemaKeys.join(', ') + ')';

  const rowsValues = rows.map(row => Object.values(row));

  return Promise.all(rowsValues.map(values => pool.query(`INSERT INTO ${table} ${columns} VALUES ($1, $2)`, values)));
};

module.exports = { create };