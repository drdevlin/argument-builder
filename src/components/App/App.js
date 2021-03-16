import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDocumentId } from '../Document/documentSlice';

import './App.css';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Document from '../Document/Document';
import Thesis from '../Thesis/Thesis';

function App() {
  const [ loginSignupToggle, setLoginSignupToggle ] = useState(true);
  const buttonText = (loginSignupToggle) ? 'Create New User' : 'Already Have Account';

  const userId = useSelector(state => state.user.id);
  const loggedIn = Boolean(userId);

  const documentId = useSelector(selectDocumentId);

  const handleToggle = () => {
    setLoginSignupToggle(!loginSignupToggle);
  }

  return (
    <div className="App">
      { !loggedIn && loginSignupToggle && <Login /> }
      { !loggedIn && !loginSignupToggle && <Signup /> }
      { !loggedIn && <button onClick={handleToggle}>{buttonText}</button>}
      { loggedIn && <Document /> }
      { Boolean(documentId) && <Thesis /> }
    </div>
  );
}

export default App;
