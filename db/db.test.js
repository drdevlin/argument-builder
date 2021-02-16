const db = require('./db.js');

const user1 = {
  email: 'foo@bar.com',
  id: '0b353e5e-3f1c-4879-ae71-919495574887',
  password: 'a179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09'
};

const user2 = {
  email: 'goo@car.com',
  id: '1b353e5e-3f1c-4879-ae71-919495574887',
  password: 'b179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09'
};

const user3 = {
  email: 'hoo@dar.com',
  id: '2b353e5e-3f1c-4879-ae71-919495574887',
  password: 'c179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09'
};

const user4 = {
  email: 'joo@far.com',
  id: '3b353e5e-3f1c-4879-ae71-919495574887',
  password: 'd179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09'
};

const user5 = {
  id: '4b353e5e-3f1c-4879-ae71-919495574887',
  email: 'koo@gar.com',
  password: 'e179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09'
};

const user6 = {
  email: 'loo@har.com',
  password: 'f179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09',
  id: '5b353e5e-3f1c-4879-ae71-919495574887'
};


describe('db', () => {
  describe('create(table, rows)', () => {
    it('returns something', async () => {
      const result = await db.create('users', [user1]);
      expect(result).toBeTruthy();
    });
    it('creates a single row in Postgres db', async () => {
      const result = await db.create('users', [user2]);
      expect(result[0].rowCount).toBe(1);
    });
    it('creates multiple rows in Postgres db', async () => {
      const results = await db.create('users', [user3, user4]);
      const rowCounts = results.map(({ rowCount }) => rowCount );
      const completeSuccess = rowCounts.every(rowCount => rowCount === 1);
      expect(completeSuccess).toBeTruthy();
    });
    it('works with different ordering', async () => {
      const result1 = await db.create('users', [user5]);
      expect(result1[0].rowCount).toBe(1);
      const result2 = await db.create('users', [user6]);
      expect(result2[0].rowCount).toBe(1);
    });
  });
  describe('read(table, conditions)', () => {
    it('returns all columns under the specified conditions', async () => {
      const expectedResults = [user1];
      const actualResults = await db.read('users', { email: 'foo@bar.com' });
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