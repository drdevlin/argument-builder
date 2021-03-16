import { useSelector } from 'react-redux';
import SupportingClaim from '../SupportingClaim/SupportingClaim';
import { selectSupportingClaims } from '../Document/documentSlice';

const SupportingClaims = () => {
  const supportingClaimsFromStore = useSelector(selectSupportingClaims);
  const supportingClaims = [ ...supportingClaimsFromStore ];
  supportingClaims.sort((a, b) => a.position - b.position);


  return (
    <div className='SupportingClaims'>
      { supportingClaims.map(el => (
        <div key={el.id}>
          <h2>{el.position}.</h2>
          <SupportingClaim supportingClaim={el} />
        </div>
      ))}
    </div>
  )
}

export default SupportingClaims;