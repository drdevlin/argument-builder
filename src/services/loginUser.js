const loginUser = async (user) => {
  try {
    const response = await fetch('http://localhost:4545/auth/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  } catch(error) {
    return { ok: false, statusText: error.message };
  }
}

export default loginUser;