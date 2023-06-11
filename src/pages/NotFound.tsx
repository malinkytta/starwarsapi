import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

const NotFound = () => {

    return (
        <div className="not-found">
            <Container>

                <h1>404</h1>
                <h2>Uh-oh! The droids lost their way in the binary galaxy. This page has joined the dark side. Use your Jedi instincts to navigate back to a glitch-free galaxy far, far away!</h2>
                <Button href={'/'}
                    variant="light">Return to the light side</Button>
            </Container>
        </div>
    )

}

export default NotFound