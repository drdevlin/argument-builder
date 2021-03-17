import pos from 'pos';

const filterWords = (claim) => {
  const toRemove = [ 'CC', 'CD', 'DT', 'IN', 'LS', 'POS', 'RP', 'SYM', 'TO', 'UH', 'URL', ',', '.', ':', '$', '#', '"', '(', ')' ]

  const splitClaim = new pos.Lexer().lex(claim);
  const taggedWords = new pos.Tagger().tag(splitClaim);
  const filteredWords = taggedWords.filter(el => !toRemove.some(code => code === el[1]));
  const words = filteredWords.map(el => el[0]);
  return words;
}

export default filterWords;