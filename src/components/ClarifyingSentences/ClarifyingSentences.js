import { useSelector } from "react-redux";
import ClarifyingSentence from "../ClarifyingSentence/ClarifyingSentence";

const ClarifyingSentences = ({ claimId }) => {
  const wordsFromStore = useSelector(state => state.words[claimId]);
  const toKeep = [ 'vague', 'ambiguous', 'technical' ];
  const words = wordsFromStore.filter(word => toKeep.some(quality => quality === word.quality));


  return (
    <div className='ClarifyingSentences'>
      {Boolean(words) && words.map((el, i) => <ClarifyingSentence key={'word-' + i} word={el} /> )}
    </div>
  )
}

export default ClarifyingSentences;