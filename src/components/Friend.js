import './Friend.css';

const Friend = (props) => {
    let imageName = require('../' + props.twitter_id + '.jpg');

    return (
        <div className='friend'>
            <img src={imageName.default} alt="friend" />
            <div>{props.name}</div>
        </div>
    )
};

export default Friend;