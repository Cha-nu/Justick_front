import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mockData';
import DailyGraph from './DailyGraph';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';
import { PageWrapper, PeriodButtons, PeriodButton, GraphSection } from './DetailPageStyle';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const cardInfo = [
  {
    key: '가락시장',
    title: '가락시장 도매가격',
    price: '9,288원',
    unit: '(10kg 상품 기준)',
    diff: '+1,461',
    diffColor: 'red',
    volume: '423톤',
    org: '농넷넷',
    date: '2025-04-30 기준',
  },
  {
    key: '반입량량',
    title: '가락시장 반입량',
    price: '1,248원',
    unit: '(1kg 상품 기준)',
    diff: '+748 ▲149.6%',
    diffColor: 'red',
    volume: '1톤',
    org: '농넷넷',
    date: '2025-04-29 기준',
  },
  {
    key: '가락소매',
    title: '가락시장 소매가격',
    price: '686원',
    unit: '(1kg 전체 기준)',
    diff: '-22 ▼-3.1%',
    diffColor: 'blue',
    volume: '1,001톤',
    org: '농넷넷',
    date: '2025-04-30 기준',
  },
  {
    key: '소매',
    title: '소매가격',
    price: '4,951원',
    unit: '(1포기 상품 기준)',
    diff: '-4 ▼-0.1%',
    diffColor: 'blue',
    volume: '-',
    org: 'KAMIS',
    date: '2025-04-30 기준',
  },
];

const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [preDailyData, setPreDailyData] = useState([]);
  const [preWeeklyData, setPreWeeklyData] = useState([]);
  const [preMonthlyData, setPreMonthlyData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('일');
  const [selectedCard, setSelectedCard] = useState('가락시장');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fallbackItem = mockData.find(item => item.id === parseInt(id));
    if (fallbackItem) {
      setItem(fallbackItem);
      setDailyData(Array.from({ length: 28 }, (_, i) => ({ date: `4/${i + 1}`, price: Math.floor(Math.random() * 10000) + 1000 })));
      setPreDailyData(Array.from({ length: 28 }, (_, i) => ({ date: `4/${i + 1}`, price: Math.floor(Math.random() * 10000) + 2000 })));
      setWeeklyData(Array.from({ length: 12 }, (_, i) => ({ week: `${i + 1}주`, sales: Math.floor(Math.random() * 10000) + 1000 })));
      setPreWeeklyData(Array.from({ length: 12 }, (_, i) => ({ week: `${i + 1}주`, sales: Math.floor(Math.random() * 10000) + 1100 })));
      setMonthlyData(Array.from({ length: 6 }, (_, i) => ({ month: `${i + 1}월`, avgPrice: Math.floor(Math.random() * 10000) + 1000 })));
      setPreMonthlyData(Array.from({ length: 6 }, (_, i) => ({ month: `${i + 1}월`, avgPrice: Math.floor(Math.random() * 10000) + 1200 })));
    }
  }, [id]);

  if (!item) return <PageWrapper>데이터를 찾을 수 없습니다.</PageWrapper>;

  return (
    <PageWrapper>
      <div style={{
        display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px',
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px'
      }}>
        {cardInfo.map(card => {
          const isSelected = selectedCard === card.key;
          const isHovered = hoveredCard === card.key;

          return (
            <Card
              key={card.key}
              onClick={() => setSelectedCard(card.key)}
              onMouseEnter={() => setHoveredCard(card.key)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                cursor: 'pointer', maxWidth: '220px', width: '100%', height: '280px',
                border: isSelected ? '1px solid #0d6efd' : '1px solid transparent',
                backgroundColor: isSelected ? '#ffffff' : isHovered ? '#eff1f3' : '#f8f9fa',
                boxShadow: isSelected ? '0 0 10px rgba(13,110,253,0.25)' : 'none',
                borderRadius: '12px', transition: '0.2s', padding: '16px', boxSizing: 'border-box'
              }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '16px', fontWeight: '600' }}>{card.title}</Card.Title>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px' }}>{card.price}</div>
                <div style={{ fontSize: '12px', color: '#555' }}>{card.unit}</div>
                <div style={{ fontSize: '13px', color: card.diffColor === 'red' ? '#d32f2f' : '#1976d2', fontWeight: 'bold', marginTop: '8px' }}>
                  전일대비 {card.diff}
                </div>
                <div style={{ fontSize: '13px', color: '#444', marginTop: '4px' }}>반입량 {card.volume}</div>
                <div style={{ fontSize: '13px', fontWeight: '500', marginTop: '10px' }}>{card.org}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{card.date}</div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <GraphSection>
        <PeriodButtons>
          {['일', '월', '연'].map(period => (
            <PeriodButton
              key={period}
              active={selectedPeriod === period}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </PeriodButton>
          ))}
        </PeriodButtons>

        {selectedPeriod === '일' && <DailyGraph data={dailyData} preData={preDailyData} />}
        {selectedPeriod === '월' && <MonthlyGraph data={monthlyData} preData={preMonthlyData} />}
        {selectedPeriod === '연' && <WeeklyGraph data={weeklyData} preData={preWeeklyData} />}
      </GraphSection>
    </PageWrapper>
  );
};

export default DetailPage;