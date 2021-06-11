import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import './main.css';

function Main() {
    return (
        <div className='main'>
            <LifeLineContainer lifeline_fiftyfifty={false} lifeline_phoneafriend={true} lifeline_asktheaudience={true}/>
            <LifeLinePopUps current_money='$1 MILLION'/>
            <Question question='At birth, which of these animals falls about six feet head-first to the ground?'/>
            <AnswerContainer letter_1='A:' answer_1='Rhinoceros' letter_2='B:' answer_2='Tiger' letter_3='C:' answer_3='Giraffe' letter_4='D:' answer_4='Hioppoptamus' />
        </div>
    );
}

export default Main;