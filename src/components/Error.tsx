import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import R2D2 from '../assets/images/starwarsday.gif'


interface IProps {
    children: React.ReactNode
    show: boolean
}

const ErrorComponent: React.FC<IProps> = ({ children, show }) => {
    const navigate = useNavigate()

    return (
        <Modal
            className="error"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Modal.Title>
                    {children}
                </Modal.Title>
                <img src={R2D2} alt="" />
                <p className="pt-3"> It seems we've entered a galaxy far,
                    far away from the requested page.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={() => navigate(-1)}
                    variant="dark"
                >
                    Return to safety, young Padawan.
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ErrorComponent


