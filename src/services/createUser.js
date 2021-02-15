import { v4 as uuid } from 'uuid';
import encrypted from './encrypted';

const createUser = async (user) => {
  try {
    user.id = uuid();
    const securePassword = await encrypted(user.password).forStorage;
    user.password = securePassword;

    const response = await fetch('http://localhost:4545/auth', { 
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
    return { ok: false, statusText: error.message };
  }
}

export default createUser;