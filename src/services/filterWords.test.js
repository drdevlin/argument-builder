import filterWords from './filterWords';

describe('filterWords(claim)', () => {
  it('returns an array of significant words', () => {
    const claim = 'On this day, over the mountains, a goat spit at the moon.';

    const expected = [ 'day', 'mountains', 'goat', 'spit', 'moon' ];

    const result = filterWords(claim);

    expect(result).toMatchObject(expected);
  });
});