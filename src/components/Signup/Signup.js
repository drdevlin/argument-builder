import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIdAndSession } from '../../store/userSlice';
import createUser from '../../services/createUser';
// import './Signup.css';

const Signup = () => {
  const [ fields, setFields ] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { email, password, confirmPassword } = fields;
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
    const isConfirmed = password === confirmPassword;
    if (!isConfirmed) setFeedback("Passwords don't match");
    const canSubmit = isValid && isConfirmed;
    if (canSubmit) {
      const response = await createUser({ email, password });
      let status;
      if (response.ok) {
        const body = await response.json();
        dispatch(updateIdAndSession(body));
        status = 'User created';
      } else {
        status = response.statusText;
      }
      setFeedback(status);
    }
  }

  return (
    <div className='Signup'>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input autoFocus type='email' id='email' name='email' value={email} onChange={handleFieldChange} required />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' value={password} onChange={handleFieldChange} pattern='.{8,}' required />
        <label htmlFor='confirm'>Confirm Password:</label>
        <input type='password' id='confirm' name='confirmPassword' value={confirmPassword} onChange={handleFieldChange} pattern='.{8,}' required />
        <button type='submit' value='submit'>Signup</button>
      </form>
      <p>{feedback}</p>
    </div>
  )
}

export default Signup;