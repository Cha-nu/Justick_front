import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

const NavigationBar = () => {
  const [navbarShrink, setNavbarShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShrink(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`bg-body-tertiary ${navbarShrink ? 'navbar-shrink' : 'navbar-large'}`}
    >
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand-custom">TTack Dae</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;