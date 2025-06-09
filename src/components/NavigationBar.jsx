import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';



const NavigationBar = ({ data, hideSearch = false }) => {
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
      className="bg-body-tertiary navbar-large"  // ✅ 항상 고정 클래스만 적용
    >

      <Container fluid>
        {/* ✅ 로고 이미지로 변경 */}
        <Navbar.Brand href="/" className="navbar-brand-custom">
          <img
            src="/icons/logo.png"
            alt="딱대 로고"
            style={{
              height: '50px',
              transform: 'scale(2.7)',
              transformOrigin: 'left center',
              marginLeft: '15px',
              marginTop: '10px'  // ✅ 약간 아래로 이동
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* ✅ Home 메뉴 제거됨 */}
          <Nav className="me-auto" />

          {!hideSearch && (
            <Form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Form.Control
                type="search"
                placeholder="품종을 입력하세요"
                className="me-2 custom-success"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                className="custom-button"
                variant="outline-success"
                onClick={handleSearch}
                style={{ minWidth: '60px' }}
              >
                검색
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
