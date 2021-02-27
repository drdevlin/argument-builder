const loadDocument = async (user, title) => {
  try {
    const response = await fetch(`http://localhost:4545/access/${user.id}/documents?title=${title}&s=${user.session_id}`);
    if (response.ok) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  } catch(error) {
    return { ok: false, statusText: error.message };
  }
}

export default loadDocument;