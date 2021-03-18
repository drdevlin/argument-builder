import { useState } from "react";
import clarifyingQuestion from "../../services/clarifyingQuestion";

const ClarifyingSentence = ({ word, supportingClaim }) => {
  const clarifyingSentences = supportingClaim.clarifyingSentences;
  const storedClarifyingSentence = clarifyingSentences.find(el => el.word === word.word);
  const storedSentence = (storedClarifyingSentence) ? storedClarifyingSentence.sentence : '';
  const [ sentence, setSentence ] = useState(storedSentence);
  
  const id = (storedClarifyingSentence) ? storedClarifyingSentence.id : word.word + Math.floor(Math.random() * 1000);
  const question = clarifyingQuestion(word);

  const handleSentenceChange = (event) => {
    setSentence(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor={id}>{question}</label>
        <input type='text' id={id} name={id} value={sentence} onChange={handleSentenceChange} required />
        <button type='submit' value='submit'>Save Sentence</button>
    </form>
  )
}

export default ClarifyingSentence;