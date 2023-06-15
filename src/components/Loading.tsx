import Modal from 'react-bootstrap/Modal'
import Stormtrooper from '../assets/images/stormtrooper-star-wars.gif'

interface IProps {
    show: boolean
}

const Loading: React.FC<IProps> = ({ show }) => {

    return (
        <Modal
            show={show}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <img src={Stormtrooper} alt="stormtrooper checking the time" />
        </Modal>
    );
}
export default Loading

