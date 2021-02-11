const db = require('./db.js');

describe('create(table, rows)', () => {
  it('returns something', async () => {
    const result = await db.create('users', [{ email: 'foo@bar.com', password: 'baz' }]);
    expect(result).toBeTruthy();
  });
  it('creates a single row in Postgres db', async () => {
    const result = await db.create('users', [{ email: 'goo@car.com', password: 'caz' }]);
    expect(result[0].rowCount).toBe(1);
  });
  it('creates multiple rows in Postgres db', async () => {
    const results = await db.create('users', [{ email: 'hoo@dar.com', password: 'daz' }, { email: 'joo@far.com', password: 'faz' }]);
    const rowCounts = results.map(({ rowCount }) => rowCount );
    const completeSuccess = rowCounts.every(rowCount => rowCount === 1);
    expect(completeSuccess).toBeTruthy();
  });
})