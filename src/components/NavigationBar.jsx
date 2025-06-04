// src/components/NavigationBar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

const NavigationBar = ({ data }) => {
  const [navbarShrink, setNavbarShrink] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShrink(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase().replace(/\s+/g, '');
      let gradeToSearch = 'high';
      let cleanName = term;

      if (term.endsWith('특')) {
        gradeToSearch = 'special';
        cleanName = term.slice(0, -1);
      } else if (term.endsWith('상')) {
        gradeToSearch = 'high';
        cleanName = term.slice(0, -1);
      }

      const foundItem = data.find(
        (item) =>
          item.name.toLowerCase() === cleanName &&
          item.grade === gradeToSearch
      );

      if (foundItem) {
        navigate(`/detail/${foundItem.key}/${foundItem.grade}`);
      } else {
        alert('해당 품종이 없습니다.');
      }
    }
  };

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
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 custom-success"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <Button className="custom-button" variant="outline-success" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
