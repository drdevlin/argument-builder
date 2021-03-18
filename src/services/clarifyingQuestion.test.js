import clarifyingQuestion from './clarifyingQuestion.js';

describe('clarifyingQuestion(wordQuality)', () => {
  it('returns the question to ask from the word and its quality', () => {
    const wordQuality = { word: 'foo', quality: 'vague' };

    const expected = 'Write a sentence to make "foo" more precise:';

    const question = clarifyingQuestion(wordQuality);

    expect(question).toBe(expected);
  })
})