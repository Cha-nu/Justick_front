import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage.jsx';
import GlobalStyle from './components/GlobalStyle';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <NavigationBar />
      <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:key/:grade" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
