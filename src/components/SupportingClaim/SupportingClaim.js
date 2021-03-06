import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClarifyingSentences from '../ClarifyingSentences/ClarifyingSentences';
import { saveEntry, selectDocumentId, selectThesis } from '../Document/documentSlice';
import Words from '../Words/Words';

const SupportingClaim = ({ supportingClaim }) => {
  const [ claim, setClaim ] = useState(supportingClaim.claim);

  const user = useSelector(state => state.user);
  const thesis = useSelector(selectThesis).thesis;

  const id = supportingClaim.id;
  const position = supportingClaim.position;
  const documentId = useSelector(selectDocumentId);
  const dispatch = useDispatch();
  
  const handleClaimChange = ({ target: { value }}) => {
    setClaim(value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const type = 'supporting_claims';
      const entry = (id) ? { id, claim, position } : { claim, position };
      dispatch(saveEntry({ user, type, entry, documentId }));
  }

  return (
    <div className='SupportingClaim'>
      <form onSubmit={handleSubmit}>
        <label htmlFor={id}>What major claim helps prove that {thesis}?</label>
        <input type='text' id={id} name={id} value={claim} onChange={handleClaimChange} required />
        <button type='submit' value='submit'>Save Claim</button>
      </form>
      <Words supportingClaim={supportingClaim} />
      <ClarifyingSentences supportingClaim={supportingClaim} />
    </div>
  )
}

export default SupportingClaim;