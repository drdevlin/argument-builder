import { useSelector } from "react-redux";
import ClarifyingSentence from "../ClarifyingSentence/ClarifyingSentence";

const ClarifyingSentences = ({ supportingClaim }) => {
  let wordsFromSupportingClaim = supportingClaim.clarifyingSentences.map(el => ({ word: el.word, quality: '' }));
  if (!wordsFromSupportingClaim) wordsFromSupportingClaim = [];
  let wordsFromStore = useSelector(state => state.words[supportingClaim.id]);
  if (!wordsFromStore) wordsFromStore = [];
  const toKeep = [ 'vague', 'ambiguous', 'technical' ];
  let words = [];
  if (wordsFromSupportingClaim || wordsFromStore) {
    wordsFromStore = wordsFromStore.reduce((acc, curr) => {
      if (!acc.some(el => el.word === curr.word)) {
        acc.push(curr);
        return acc;
      } else {
        return acc;
      }
    }, []);
    wordsFromStore = wordsFromStore.filter(word => !wordsFromSupportingClaim.some(el => el.word === word.word));
    wordsFromStore = wordsFromStore.filter(word => toKeep.some(quality => quality === word.quality));
    words = wordsFromSupportingClaim.concat(wordsFromStore);
  }


  return (
    <div className='ClarifyingSentences'>
      {Boolean(words) && words.map(el => <ClarifyingSentence key={el.word + supportingClaim.id} word={el} supportingClaim={supportingClaim} /> )}
    </div>
  )
}

export default ClarifyingSentences;