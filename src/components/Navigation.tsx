import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link, useLocation } from 'react-router-dom'
import Logo from '../assets/images/star-wars-logo-1002.png'
import { useState } from 'react'

const Navigation = () => {
    const [expanded, setExpanded] = useState(false)
    const location = useLocation()

    const toggleNavbar = () => {
        setExpanded(!expanded)
    }

    const closeNavbar = () => {
        setExpanded(false)
    }

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : ''
    }

    return (
        <Navbar variant="dark" sticky="top" expand="md" expanded={expanded} className="justify-content-center d-flex">
            <Container>
                <Navbar.Brand as={Link} to="/" className="order-lg-1 order-md-1" onClick={closeNavbar}>
                    <img
                        src={Logo}
                        height="60px"
                        width="123px"
                        className="d-inline-block align-top"
                        alt="StarWars Encyclopedia"
                    />
                </Navbar.Brand>

                <Navbar.Toggle className="order-lg-4 order-md-0" onClick={toggleNavbar} />

                <Navbar.Collapse className="order-lg-0 order-md-0">
                    <Nav className="ms-start">
                        <Nav.Link as={NavLink} to="/movies" onClick={closeNavbar} className={isActive('/movies')}>
                            Movies
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/characters" onClick={closeNavbar} className={isActive('/characters')}>
                            Characters
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/planets" onClick={closeNavbar} className={isActive('/planets')}>
                            Planets
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="order-lg-2 order-md-2">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/species" onClick={closeNavbar} className={isActive('/species')}>
                            Species
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/starships" onClick={closeNavbar} className={isActive('/starships')} >
                            Starships
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/vehicles" onClick={closeNavbar} className={isActive('/vehicles')}>
                            Vehicles
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default Navigation
