const createUser = async (user) => {
  try {
    const response = await fetch('http://localhost:4545/users', { 
      method: 'POST',
      body: JSON.stringify(user)
    });
    return { success: true, message: response };
  } catch(error) {
    return { success: false, message: error.message };
  }
}

export default createUser;