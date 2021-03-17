import { useSelector } from "react-redux";

const ClarifyingSentences = ({ claimId }) => {
  const words = useSelector(state => state.words[claimId]);


  return (
    <div className='ClarifyingSentences'>
      {Boolean(words) && words.map((el, i) => <p key={'word-' + i}>{el.word + el.quality}</p> )}
    </div>
  )
}

export default ClarifyingSentences;