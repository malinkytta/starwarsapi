import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'


interface IProps {
    children: React.ReactNode
    show: boolean
    // onConfirm: () => void
}

const ErrorComponent: React.FC<IProps> = ({ children, show }) => {
    const navigate = useNavigate()

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Modal.Title>  It seems we've entered a galaxy far, far away from the requested page.
                </Modal.Title>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => navigate(-1)}
                    variant="secondary"
                >
                    Return to safety, young Padawan.
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ErrorComponent

