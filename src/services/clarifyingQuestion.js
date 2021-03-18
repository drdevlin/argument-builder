const clarifyingQuestion = (wordQuality) => {
  const word = wordQuality.word;
  switch (wordQuality.quality) {
    case 'vague':
      return `Write a sentence to make "${word}" more precise:`;
    case 'ambiguous':
      return `Write a description of your use of "${word}":`;
    case 'technical':
      return `Define "${word}":`
    default:
      return `Write a sentence that clarifies "${word}":`;
  }
}

export default clarifyingQuestion;