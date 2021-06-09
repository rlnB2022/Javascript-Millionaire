import './LifeLineContainer.css';
import LifeLine from './LifeLine';

function LifeLineContainer() {
    let imageNames = ['./fiftyfifty.jpg', './phoneafriend.jpg', './asktheaudience.jpg'];

    let imageItems = imageNames.map((item, index) => {
        return <LifeLine imageName={item} key={index} />
    });

    return (
        <div className="lifeline-container">
            {imageItems}
        </div>
    );
}

export default LifeLineContainer;