import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';
import NavigationBar from './components/NavigationBar';

// 예시용 데이터 (테스트 시 비워둬도 됨)
const dailyData = [];
const weeklyData = [];
const monthlyData = [];

const App = () => {
  return (
    <Router>
      <NavigationBar />
      {/* 네비게이션 바 높이 만큼 상단 여백 */}
      <div style={{ marginTop: '80px' }}>
       

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
