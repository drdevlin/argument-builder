import { useState } from "react";

const ClarifyingSentence = ({ word }) => {
  const [ sentence, setSentence ] = useState('');
  
  const id = word + Math.floor(Math.random() * 1000);

  const handleSentenceChange = (event) => {
    setSentence(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor={id}>Write a sentence that clarifies &quot;{word}&quot;.</label>
        <input type='text' id={id} name={id} value={sentence} onChange={handleSentenceChange} required />
        <button type='submit' value='submit'>Save Sentence</button>
    </form>
  )
}

export default ClarifyingSentence;