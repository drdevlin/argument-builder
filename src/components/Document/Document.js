import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateIdAndTitle } from './documentSlice';
import loadDocument from '../../services/loadDocument';

const Document = () => {
  const [ title, setTitle ] = useState('');
  const [ feedback, setFeedback ] = useState('');

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const handleTitleChange = ({ target: { value }}) => {
    setTitle(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await loadDocument(user, title);
      let status;
      if (response.ok) {
        const body = await response.json();
        dispatch(updateIdAndTitle(body));
        status = body.id;
      } else {
        status = response.statusText;
      }
      setFeedback(status);
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