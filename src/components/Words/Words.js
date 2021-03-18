import filterWords from '../../services/filterWords';
import Word from '../Word/Word';

const Words = (props) => {
  const claimId = props.claimId;
  const words = filterWords(props.claim);

  return (
    <div className='Words'>
      <h2>What is the quality of these concepts?</h2>
      { words.map((word, index, array) => <Word key={'word-' + index} word={word} index={index} arrayLength={array.length} claimId={claimId} />) } 
    </div>
  )

}

export default Words;