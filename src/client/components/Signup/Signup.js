import { useState } from 'react';
import createUser from '../../services/createUser';
// import './Signup.css';

const Signup = () => {
  const [ fields, setFields ] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { email, password, confirmPassword } = fields;
  
  const handleFieldChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = event.target.checkValidity() && password === confirmPassword;
    if (isValid) await createUser({ email, password });
  }

  return (
    <div className='Signup'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input autoFocus type='email' id='email' name='email' value={email} onChange={handleFieldChange} required />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' value={password} onChange={handleFieldChange} pattern='.{8,}' required />
        <label htmlFor='confirm'>Confirm Password:</label>
        <input type='password' id='confirm' name='confirmPassword' value={confirmPassword} onChange={handleFieldChange} pattern='.{8,}' required />
        <button type='submit' value='submit'>Signup</button>
      </form>
      <p>{fields.test}</p>
    </div>
  )
}

export default Signup;