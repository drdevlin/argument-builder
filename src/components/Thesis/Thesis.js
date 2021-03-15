import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveEntry, selectDocumentId, selectThesis } from '../Document/documentSlice';

const Thesis = () => {
  const [ thesis, setThesis ] = useState(useSelector(selectThesis).thesis);

  const user = useSelector(state => state.user);
  const id = useSelector(selectThesis).id;
  const documentId = useSelector(selectDocumentId);
  const dispatch = useDispatch();
  
  const handleThesisChange = ({ target: { value }}) => {
    setThesis(value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const type = 'theses';
      const entry = (id) ? { id, thesis } : { thesis };
      dispatch(saveEntry({ user, type, entry, documentId }));
  }

  return (
    <div className='Thesis'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='thesis'>What is the ultimate claim that the author is trying to convince you to believe?</label>
        <input type='text' id='thesis' name='thesis' value={thesis} onChange={handleThesisChange} required />
        <button type='submit' value='submit'>Save Thesis</button>
      </form>
    </div>
  )
}

export default Thesis;