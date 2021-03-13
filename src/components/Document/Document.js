import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDocument } from './documentSlice';

const Document = () => {
  const [ title, setTitle ] = useState('');

  const user = useSelector(state => state.user);
  const feedback = useSelector(state => state.document.fetchStatus);
  const dispatch = useDispatch();
  
  const handleTitleChange = ({ target: { value }}) => {
    setTitle(value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(loadDocument({ user, title }));
  }

  return (
    <div className='Document'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input type='text' id='title' name='title' value={title} onChange={handleTitleChange} required />
        <button type='submit' value='submit'>Load Document</button>
      </form>
      <p>{feedback}</p>
    </div>
  )
}

export default Document;