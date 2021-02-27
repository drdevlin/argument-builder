import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIdAndSession } from '../../store/userSlice';
import loginUser from '../../services/loginUser';

const Login = () => {
  const [ fields, setFields ] = useState({
    email: '',
    password: ''
  });
  const { email, password } = fields;
  const [ feedback, setFeedback ] = useState('');

  const dispatch = useDispatch();
  
  const handleFieldChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    if (!isValid) setFeedback('Invalid email or password');
    if (isValid) {
      const response = await loginUser({ email, password });
      let status;
      if (response.ok) {
        const body = await response.json();
        dispatch(updateIdAndSession(body));
        status = 'Logged in';
      } else {
        status = response.statusText;
      }
      setFeedback(status);
    }
  }

  return (
    <div className='Login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input autoFocus type='email' id='email' name='email' value={email} onChange={handleFieldChange} required />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' value={password} onChange={handleFieldChange} pattern='.{8,}' required />
        <button type='submit' value='submit'>Login</button>
      </form>
      <p>{feedback}</p>
    </div>
  )
}

export default Login;