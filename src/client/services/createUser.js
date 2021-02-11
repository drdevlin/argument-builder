const createUser = async (user) => {
  try {
    const response = await fetch('http://localhost:4545/users', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([user])
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  } catch(error) {
    return error.message;
  }
}

export default createUser;