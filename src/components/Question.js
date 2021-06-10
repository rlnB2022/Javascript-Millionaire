import './question.css';
import background from '../answer-bg.png';

let style = {
    background: `url(${background})`
};

function Question() {
    return (
        <div className='question' style={style}>
            
        </div>
    );
}

export default Question;