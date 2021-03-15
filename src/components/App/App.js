import { useSelector } from 'react-redux';
import { selectDocumentId } from '../Document/documentSlice';

import './App.css';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Document from '../Document/Document';
import Thesis from '../Thesis/Thesis';

function App() {
  const documentId = useSelector(selectDocumentId);

  return (
    <div className="App">
      <Login />
      <Signup />
      <Document />
      { Boolean(documentId) && <Thesis /> }
    </div>
  );
}

export default App;
