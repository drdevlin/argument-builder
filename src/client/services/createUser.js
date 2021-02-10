const createUser = async (user) => {
  try {
    const response = await fetch('http://localhost:4545/users', { 
      method: 'POST',
      body: JSON.stringify(user)
    });
    return response;
  } catch(error) {
    return error.message;
  }
}

export default createUser;