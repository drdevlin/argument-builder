const Word = (props) => {
  const word = props.word;
  const id = word + Math.floor(Math.random() * 1000);
  
  return (
    <>
    <label htmlFor={id}>{word}</label>
    <select name='quality' id={id}>
      <option value=''>--Quality--</option>
      <option value='vague'>Vague</option>
      <option value='abstract'>Abstract</option>
      <option value='general'>General</option>
      <option value='ambiguous'>Ambiguous</option>
      <option value='precise'>Precise</option>
      <option value='particular'>Particular</option>
      <option value='specific'>Specific</option>
      <option value='obvious'>Obvious</option>
      <option value='ignore'>Ignore</option>
    </select>
    </>
  )
}

export default Word;
