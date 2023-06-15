import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/images/star-wars-logo-1002.png'

const Navigation = () => {

    return (
        <Navbar variant="dark" sticky="top" expand="md" collapseOnSelect className="justify-content-center d-flex">
            <Container>
                <Navbar.Brand as={Link} to="/" className="order-lg-1 order-md-1">
                    <img
                        src={Logo}
                        height="60px"
                        width="123px"
                        className="d-inline-block align-top"
                        alt="StarWars Encyclopedia"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-lg-4 order-md-0" />

                <Navbar.Collapse id="basic-navbar-nav" className="order-lg-0 order-md-0">
                    <Nav className="ms-start" >
                        <Nav.Link as={NavLink} eventKey='movies' to="/movies">Movies</Nav.Link>
                        <Nav.Link as={NavLink} eventKey='characters' to="/characters">Characters</Nav.Link>
                        <Nav.Link as={NavLink} eventKey='planets' to="/planets">Planets</Nav.Link>
                    </Nav>

                </Navbar.Collapse>

                <Navbar.Collapse id="basic-navbar-nav" className="order-lg-2 order-md-2">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} eventKey='species' to="/species">Species</Nav.Link>
                        <Nav.Link as={NavLink} eventKey='starships' to="/starships">Starships</Nav.Link>
                        <Nav.Link as={NavLink} eventKey='vehicles' to="/vehicles">Vehicles</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation