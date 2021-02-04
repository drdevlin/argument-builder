import './Thesis.css';

const Thesis = ({ thesis }) => {
  
  const handleThesisChange = event => {

  }

  return (
    <div className='Thesis'>
      <form>
        <label htmlFor='thesis'>What is the overall thesis?</label>
        <input type='text' id='thesis' name='thesis' value={thesis} onChange={handleThesisChange} />
      </form>
    </div>
  )
}

export default Thesis;