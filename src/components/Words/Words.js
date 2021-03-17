import filterWords from '../../services/filterWords';
import Word from '../Word/Word';

const Words = (props) => {
  const words = filterWords(props.claim);

  return (
    <div className='Words'>
      <h2>Analyze these words:</h2>
      { words.map((word, i) => <Word key={'word-' + i} word={word} />) } 
    </div>
  )

}

export default Words;