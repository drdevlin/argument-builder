const db = require('./db.js');

describe('db', () => {
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
  });
  describe('read(table, conditions)', () => {
    it('returns all columns under the specified conditions', async () => {
      const expectedResults = [{ email: 'foo@bar.com', password: 'baz' }];
      const actualResults = await db.read('users', "email = 'foo@bar.com'");
      expect(actualResults.rows).toMatchObject(expectedResults);
    });
  });
  describe('update(table, rowIdentifier, data', () => {
    it('updates one cell at the row identified', async () => {
      const result = await db.update('users', { email: 'foo@bar.com' }, { password: 'updated!' });
      expect(result.rowCount).toBe(1);
    });
    it('updates multiple cells at the row identified', async () => {
      const result = await db.update('users', { email: 'goo@car.com' }, { email: 'updated!', password: 'updated!' });
      expect(result.rowCount).toBe(1);
    });
  });
  describe('del(table, rowIdentifier', () => {
    it('deletes the row identified', async () => {
      const result = await db.del('users', { email: 'joo@far.com' });
      expect(result.rowCount).toBe(1);
    })
  })
});