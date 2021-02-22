const encrypted = require('./encrypted');

describe('encrypted(password)', () => {
  describe('.forStorage', () => {
    it('returns "<salt>:<hash>" string of given password (in a Promise)', async () => {
      const password = 'foobarbazitron';

      const result = await encrypted(password).forStorage;
      expect(result).toBeDefined();
      expect(result.length).toBe(161);

      const runAgain = await encrypted(password).forStorage;
      expect(runAgain).not.toEqual(result);
    });
  });
  describe('.matches(storedPassword)', () => {
    it('compares the given password with the stored and returns the appropriate Boolean (in a Promise)', async () => {
      const matchingPassword = 'foobarbazitron';
      const unmatchingPassword = 'oilypatterns';
      const storedPassword = 'a179f081c3402bd9f2a24e5491890f12:7a35894a1cd23ebc3cfa01500e491b10875755af52869cf3165423f4a9f7b7ded2e92264c9624fc4b507c05dc55aa68b245d124643edcd379e44edd23951af09';
      
      const match = await encrypted(matchingPassword).matches(storedPassword);
      const mismatch = await encrypted(unmatchingPassword).matches(storedPassword);
      expect(match).toBe(true);
      expect(mismatch).toBe(false);
    });
  });
});