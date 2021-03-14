import { v4 as uuid } from 'uuid';

const saveEntry = async (user, type, entry, documentId, supportingClaimId) => {
  if (!entry.hasOwnProperty('id')) entry.id = uuid();
  try {
    const entryId = entry.id;
    let response
    response = await fetch(`http://localhost:4545/access/${user.id}/${type}?id=${entryId}&s=${user.session_id}`);
    if (response.ok) {
      delete entry.id;
      const putResponse = await fetch(`http://localhost:4545/access/${user.id}/${type}?id=${entryId}&s=${user.session_id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: entry })
      });
      if (putResponse.ok) {
        return entry;
      } else {
        throw new Error(putResponse.statusText);
      }
    } else if (response.status === 404) {
      entry = (supportingClaimId) ? { ...entry, supporting_claim_id: supportingClaimId } : { ...entry, document_id: documentId };
      const postResponse = await fetch(`http://localhost:4545/access/${user.id}/${type}?s=${user.session_id}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: entry })
      });
      if (postResponse.ok) {
        return entry;
      } else {
        throw new Error(postResponse.statusText);
      }
    } else {
      throw new Error(response.statusText);
    }
  } catch(err) {
    return err.message ? err.message : 'Something went wrong';
  }
}

export default saveEntry;