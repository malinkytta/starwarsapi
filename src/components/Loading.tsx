import Modal from 'react-bootstrap/Modal'

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
            <img src="/src/assets/images/stormtrooper-star-wars.gif" />
        </Modal>
    );
}
export default Loading

