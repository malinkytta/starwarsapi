import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar variant="dark" sticky="top" expand="md" className="justify-content-center">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-start">
                        <Nav.Link as={NavLink} end to="/movies">Movies</Nav.Link>
                        <Nav.Link as={NavLink} end to="/characters">Characters</Nav.Link>
                        <Nav.Link as={NavLink} end to="/planets">Planets</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/src/assets/images/star-wars-logo-1002.png"
                        // width="100"
                        height="60"
                        className="d-inline-block align-top"
                        alt="StarWars Encyclopedia"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} end to="/species">Species</Nav.Link>
                        <Nav.Link as={NavLink} end to="/starships">Starships</Nav.Link>
                        <Nav.Link as={NavLink} end to="/vehicles">Vehicles</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation