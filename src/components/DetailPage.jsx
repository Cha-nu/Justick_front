import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mockData';
import DailyGraph from './DailyGraph';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';
import { PageWrapper, PeriodButtons, PeriodButton, GraphSection } from './DetailPageStyle';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVER_URL = 'http://211.211.151.18:2022';

const cardInfo = [
  {
    key: '가락시장',
    title: '가락시장 도매가격',
    price: '9,288원',
    unit: '(10kg 상품 기준)',
    diff: '+1,461',
    diffColor: 'red',
    org: '농넷넷',
    date: '2025-04-30 기준',
  },
  {
    key: '반입량량',
    title: '가락시장 반입량',
    price: '1,22톤',
    unit: '(1kg 상품 기준)',
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

const formatWeekLabel = (weekKey) => {
  const parts = weekKey.split('-');
  if (parts.length === 3) {
    const [, month, week] = parts;
    return `${month}월 ${week}주차`;
  }
  return weekKey;
};

const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const [dailyPriceData, setDailyPriceData] = useState([]);
  const [weeklyPriceData, setWeeklyPriceData] = useState([]);
  const [monthlyPriceData, setMonthlyPriceData] = useState([]);

  const [dailyIntakeData, setDailyIntakeData] = useState([]);
  const [weeklyIntakeData, setWeeklyIntakeData] = useState([]);
  const [monthlyIntakeData, setMonthlyIntakeData] = useState([]);

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
    if (!fallbackItem) {
      setItem(null);
      return;
    }
    setItem(fallbackItem);

    const routeMap = {
      1: 'high',
      2: 'special',
    };
    const route = routeMap[parseInt(id, 10)];

    if (route) {
      // ✅ 일별 데이터
      fetch(`${SERVER_URL}/api/cabbage/${route}-prices`)
        .then(res => res.json())
        .then(data => {
          const entries = Object.entries(data || {});

          // ✅ 여기서 날짜 포맷을 "4월 9일"로 변경
          setDailyPriceData(
            entries.map(([_, val]) => ({
              date: `${val.month}월 ${val.day}일`,
              price: val.averagePrice,
              gap: val.gap,
            }))
          );

          setDailyIntakeData(
            entries.map(([_, val]) => ({
              date: `${val.month}월 ${val.day}일`,
              price: val.intake,
            }))
          );

          // ✅ 가장 마지막(최신) 데이터로 가락시장 카드 내용 수정
          const latest = entries.at(-1);
          if (latest) {
            const [latestDate, latestVal] = latest;
            const garakCard = cardInfo.find(card => card.key === '가락시장');
            if (garakCard) {
              garakCard.price = `${latestVal.averagePrice.toLocaleString()}원`;
              garakCard.diff = `${latestVal.gap > 0 ? '+' : ''}${latestVal.gap.toLocaleString()}`;
              garakCard.diffColor = latestVal.gap >= 0 ? 'red' : 'blue';
              garakCard.date = `${latestVal.month}월 ${latestVal.day}일 기준`;
            }
            const intakeCard = cardInfo.find(card => card.key === '반입량량');
            if (intakeCard) {
              intakeCard.price = `${latestVal.intake.toLocaleString()}톤`;
              intakeCard.date = `${latestVal.month}월 ${latestVal.day}일 기준`;
            }
          }
        });

      // ✅ 주간 데이터
      fetch(`${SERVER_URL}/api/cabbage/${route}-weekly`)
        .then(res => res.json())
        .then(data => {
          const entries = Object.entries(data || {});
          const sortedAsc = entries.sort(([a], [b]) =>
            new Date(`20${a.replace(/-/g, '-')}`) - new Date(`20${b.replace(/-/g, '-')}`)
          );
          const last8 = sortedAsc.slice(-8);

          setWeeklyPriceData(
            last8.map(([week, val]) => ({
              week: formatWeekLabel(week),
              sales: val.averagePrice,
            }))
          );

          setWeeklyIntakeData(
            last8.map(([week, val]) => ({
              week: formatWeekLabel(week),
              sales: val.intake,
            }))
          );
        });

      // ✅ 월간 데이터
      fetch(`${SERVER_URL}/api/cabbage/${route}-monthly`)
        .then(res => res.json())
        .then(data => {
          const entries = Object.entries(data || {});

          setMonthlyPriceData(
            entries.map(([month, val]) => ({
              month,
              avgPrice: val.averagePrice,
            }))
          );

          setMonthlyIntakeData(
            entries.map(([month, val]) => ({
              month,
              avgPrice: val.intake,
            }))
          );
        });
    } else {
      setDailyData(Array.from({ length: 28 }, (_, i) => ({
        date: `4/${i + 1}`,
        price: Math.floor(Math.random() * 10000) + 1000,
      })));
      setWeeklyData(Array.from({ length: 12 }, (_, i) => ({
        week: `${i + 1}주`,
        sales: Math.floor(Math.random() * 10000) + 1000,
      })));
      setMonthlyData(Array.from({ length: 6 }, (_, i) => ({
        month: `${i + 1}월`,
        avgPrice: Math.floor(Math.random() * 10000) + 1000,
      })));
    }

    setPreDailyData(Array.from({ length: 28 }, (_, i) => ({
      date: `4/${i + 1}`,
      price: Math.floor(Math.random() * 10000) + 2000,
    })));
    setPreWeeklyData(Array.from({ length: 12 }, (_, i) => ({
      week: `${i + 1}주`,
      sales: Math.floor(Math.random() * 10000) + 1100,
    })));
    setPreMonthlyData(Array.from({ length: 6 }, (_, i) => ({
      month: `${i + 1}월`,
      avgPrice: Math.floor(Math.random() * 10000) + 1200,
    })));
  }, [id]);

  if (!item) return <PageWrapper>데이터를 찾을 수 없습니다.</PageWrapper>;

  const getData = () => {
    if (selectedCard === '가락시장') {
      if (selectedPeriod === '일') return dailyPriceData;
      if (selectedPeriod === '주') return weeklyPriceData;
      return monthlyPriceData;
    }
    if (selectedCard === '반입량량') {
      if (selectedPeriod === '일') return dailyIntakeData;
      if (selectedPeriod === '주') return weeklyIntakeData;
      return monthlyIntakeData;
    }
    if (selectedPeriod === '일') return dailyData;
    if (selectedPeriod === '주') return weeklyData;
    return monthlyData;
  };

  const showPrediction = selectedCard !== '반입량량';

  return (
    <PageWrapper>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
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
                cursor: 'pointer',
                maxWidth: '220px',
                width: '100%',
                height: '280px',
                border: isSelected ? '1px solid #0d6efd' : '1px solid transparent',
                backgroundColor: isSelected
                  ? '#ffffff'
                  : isHovered
                    ? '#eff1f3'
                    : '#f8f9fa',
                boxShadow: isSelected
                  ? '0 0 10px rgba(13,110,253,0.25)'
                  : 'none',
                borderRadius: '12px',
                transition: '0.2s',
                padding: '16px',
                boxSizing: 'border-box'
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: '16px', fontWeight: '600' }}>
                  {card.title}
                </Card.Title>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px' }}>
                  {card.price}
                </div>
                <div style={{ fontSize: '12px', color: '#555' }}>{card.unit}</div>
                <div style={{
                  fontSize: '13px',
                  color: card.diffColor === 'red' ? '#d32f2f' : '#1976d2',
                  fontWeight: 'bold',
                  marginTop: '8px'
                }}>
                  전일대비 {card.diff}
                </div>
                <div style={{ fontSize: '13px', color: '#444', marginTop: '4px' }}>
                  반입량 {card.volume}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '500', marginTop: '10px' }}>
                  {card.org}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>{card.date}</div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <PeriodButtons>
        {['일', '주', '월'].map(period => (
          <PeriodButton
            key={period}
            active={selectedPeriod === period}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </PeriodButton>
        ))}
      </PeriodButtons>

      <GraphSection>
        {selectedPeriod === '일' && (
          <DailyGraph data={getData()} preData={preDailyData} showPrediction={showPrediction} />
        )}
        {selectedPeriod === '주' && (
          <WeeklyGraph data={getData()} preData={preWeeklyData} showPrediction={showPrediction} />
        )}
        {selectedPeriod === '월' && (
          <MonthlyGraph data={getData()} preData={preMonthlyData} showPrediction={showPrediction} />
        )}
      </GraphSection>
    </PageWrapper>
  );
};

export default DetailPage;
