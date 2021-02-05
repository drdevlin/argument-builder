import { useState } from 'react';
// import './Signup.css';

const Signup = () => {
  const [ fields, setFields ] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { email, password, confirmPassword } = fields;

  // const isValid = () => {
  //   return (
  //     password === confirmPassword &&
  //     email &&
  //     password
  //   );
  // }
  
  const handleFieldChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [name]: value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    const isValid = event.target.checkValidity() && password === confirmPassword;
    if (isValid) console.log('Valid!');
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
    </div>
  )
}

export default Signup;