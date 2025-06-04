import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DailyGraph from './DailyGraph';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';
import { PageWrapper, PeriodButtons, PeriodButton, GraphSection } from './DetailPageStyle';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVER_URL = 'http://justick.myvnc.com:443/justick_spring';

const initialCardInfo = [
  {
    key: '가락시장',
    title: '가락시장 도매가격',
    unit: '(10kg 상품 기준)',
    org: '농넷넷'
  },
  {
    key: '반입량량',
    title: '가락시장 반입량',
    unit: '(1kg 상품 기준)',
    org: '농넷넷'
  },
  {
    key: '소매',
    title: '소매가격',
    unit: '(1포기 상품 기준)',
    org: 'KAMIS'
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
  const { key, grade } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('일');
  const [selectedCard, setSelectedCard] = useState('가락시장');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardInfo, setCardInfo] = useState(initialCardInfo);

  const [dailyPriceData, setDailyPriceData] = useState([]);
  const [weeklyPriceData, setWeeklyPriceData] = useState([]);
  const [monthlyPriceData, setMonthlyPriceData] = useState([]);
  const [dailyIntakeData, setDailyIntakeData] = useState([]);
  const [weeklyIntakeData, setWeeklyIntakeData] = useState([]);
  const [monthlyIntakeData, setMonthlyIntakeData] = useState([]);
  const [dailyRetailData, setDailyRetailData] = useState([]);
  const [preDailyData, setPreDailyData] = useState([]);
  const [preWeeklyData, setPreWeeklyData] = useState([]);
  const [preMonthlyData, setPreMonthlyData] = useState([]);

  useEffect(() => {
    if (!key || !grade) return;

    const fetchAll = async () => {
      const priceUrl = `${SERVER_URL}/api/${key}/${grade}-prices`;
      const prePriceUrl = `${SERVER_URL}/api/${key}-predict/${grade}-prices`;
      const weeklyUrl = `${SERVER_URL}/api/${key}/${grade}-weekly`;
      const preWeeklyUrl = `${SERVER_URL}/api/${key}-predict/${grade}-weekly`;
      const monthlyUrl = `${SERVER_URL}/api/${key}/${grade}-monthly`;
      const preMonthlyUrl = `${SERVER_URL}/api/${key}-predict/${grade}-monthly`;
      const retailUrl = `${SERVER_URL}/api/${key}-retail`;

      try {
        const [priceRes, prePriceRes, weeklyRes, preWeeklyRes, monthlyRes, preMonthlyRes, retailRes] = await Promise.all([
          fetch(priceUrl), fetch(prePriceUrl), fetch(weeklyUrl), fetch(preWeeklyUrl),
          fetch(monthlyUrl), fetch(preMonthlyUrl), fetch(retailUrl)
        ]);

        const [priceData, prePriceData, weeklyData, preWeeklyData, monthlyData, preMonthlyData, retailData] = await Promise.all([
          priceRes.json(), prePriceRes.json(), weeklyRes.json(), preWeeklyRes.json(),
          monthlyRes.json(), preMonthlyRes.json(), retailRes.json()
        ]);

        const latest = priceData.at(-1);
        const prev = priceData.at(-2);
        const yesterdayPrice = prev?.averagePrice || 0;
        const priceDiff = latest.averagePrice - yesterdayPrice;
        const pricePercent = yesterdayPrice !== 0 ? (priceDiff / yesterdayPrice) * 100 : 0;

        const retailLatest = retailData.at(-1);
        const retailPrev = retailData.at(-2);
        const retailDiff = (retailLatest?.averagePrice ?? 0) - (retailPrev?.averagePrice ?? 0);
        const retailPercent = retailPrev?.averagePrice ? (retailDiff / retailPrev.averagePrice) * 100 : 0;

        const intakeDiff = latest.intake - (prev?.intake || 0);
        const intakePercent = prev?.intake ? (intakeDiff / prev.intake) * 100 : 0;

        const newCardInfo = initialCardInfo.map(card => {
          if (card.key === '가락시장') {
            return {
              ...card,
              price: `${latest.averagePrice.toLocaleString()}원`,
              diff: `${priceDiff > 0 ? '+' : ''}${priceDiff.toLocaleString()} (${pricePercent.toFixed(1)}%)`,
              diffColor: priceDiff > 0 ? 'red' : 'blue',
              date: `${latest.month}월 ${latest.day}일 기준`
            };
          }
          if (card.key === '반입량량') {
            return {
              ...card,
              price: `${latest.intake.toLocaleString()}톤`,
              diff: `${intakeDiff > 0 ? '+' : ''}${intakeDiff.toLocaleString()} (${intakePercent.toFixed(1)}%)`,
              diffColor: intakeDiff > 0 ? 'red' : 'blue',
              date: `${latest.month}월 ${latest.day}일 기준`
            };
          }
          if (card.key === '소매') {
            return {
              ...card,
              price: `${retailLatest?.averagePrice?.toLocaleString() ?? '-'}원`,
              diff: `${retailDiff > 0 ? '+' : ''}${retailDiff.toLocaleString()} (${retailPercent.toFixed(1)}%)`,
              diffColor: retailDiff > 0 ? 'red' : 'blue',
              date: `${retailLatest?.month ?? ''}월 ${retailLatest?.day ?? ''}일 기준`
            };
          }
          return card;
        });

        setCardInfo(newCardInfo);

        setDailyPriceData(priceData.map(val => ({ date: `${val.month}월 ${val.day}일`, price: val.averagePrice, gap: val.gap })));
        setDailyIntakeData(priceData.map(val => ({ date: `${val.month}월 ${val.day}일`, price: val.intake })));
        setPreDailyData(prePriceData.map(val => ({ date: `${val.month}월 ${val.day}일`, price: val.averagePrice })));

        const weekFormat = data => Object.entries(data || {}).map(([key, val]) => ({
          week: formatWeekLabel(key),
          sales: val.averagePrice
        }));

        const intakeFormat = data => Object.entries(data || {}).map(([key, val]) => ({
          week: formatWeekLabel(key),
          sales: val.intake
        }));

        setWeeklyPriceData(weekFormat(weeklyData));
        setWeeklyIntakeData(intakeFormat(weeklyData));
        setPreWeeklyData(weekFormat(preWeeklyData));

        const monthFormat = data => Object.entries(data || {}).map(([key, val]) => ({
          month: `${key}월`,
          avgPrice: val.averagePrice
        }));

        const intakeMonthFormat = data => Object.entries(data || {}).map(([key, val]) => ({
          month: `${key}월`,
          avgPrice: val.intake
        }));

        setMonthlyPriceData(monthFormat(monthlyData));
        setMonthlyIntakeData(intakeMonthFormat(monthlyData));
        setPreMonthlyData(monthFormat(preMonthlyData));

        setDailyRetailData(retailData.map(val => ({
          date: `${val.month}월 ${val.day}일`,
          price: val.averagePrice
        })));

      } catch (e) {
        console.error('데이터 로딩 오류:', e);
      }
    };

    fetchAll();
  }, [key, grade]);

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
    if (selectedCard === '소매') {
      return dailyRetailData;
    }
    return [];
  };

  const getPreData = () => {
    if (selectedCard === '가락시장') {
      if (selectedPeriod === '일') return preDailyData;
      if (selectedPeriod === '주') return preWeeklyData;
      return preMonthlyData;
    }
    return [];
  };

  const showPrediction = selectedCard === '가락시장';

  return (
    <PageWrapper>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {cardInfo.map(card => {
          const isSelected = selectedCard === card.key;
          const isHovered = hoveredCard === card.key;

          return (
            <Card
              key={card.key}
              onClick={() => {
                setSelectedCard(card.key);
                setSelectedPeriod('일');
              }}

              onMouseEnter={() => setHoveredCard(card.key)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                cursor: 'pointer',
                maxWidth: '220px',
                width: '100%',
                height: '280px',
                border: isSelected ? '1px solid #0d6efd' : '1px solid transparent',
                backgroundColor: isSelected ? '#ffffff' : isHovered ? '#eff1f3' : '#f8f9fa',
                boxShadow: isSelected ? '0 0 10px rgba(13,110,253,0.25)' : 'none',
                borderRadius: '12px',
                transition: '0.2s',
                padding: '16px',
                boxSizing: 'border-box',
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: '16px', fontWeight: '600' }}>{card.title}</Card.Title>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '8px' }}>{card.price || '-'}</div>
                <div style={{ fontSize: '12px', color: '#555' }}>{card.unit}</div>
                <div style={{ fontSize: '13px', color: card.diffColor === 'red' ? '#d32f2f' : '#1976d2', fontWeight: 'bold', marginTop: '8px' }}>
                  전일대비 {card.diff || '-'}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '500', marginTop: '10px' }}>{card.org}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{card.date || ''}</div>
              </Card.Body>
            </Card>
          );
        })}
      </div>



      <GraphSection>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '24px', marginBottom: '12px' }}>
          <PeriodButtons>
            {['일', '주', '월'].map(period => {
              if (selectedCard === '소매' && period !== '일') {
                return (
                  <PeriodButton
                    key={period}
                    style={{ display: 'none' }}
                  />
                );
              }

              return (
                <PeriodButton
                  key={period}
                  active={selectedPeriod === period}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </PeriodButton>
              );
            })}
          </PeriodButtons>
        </div>


        {selectedPeriod === '일' && (
          <DailyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />
        )}
        {selectedPeriod === '주' && (
          <WeeklyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />
        )}
        {selectedPeriod === '월' && (
          <MonthlyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />
        )}
      </GraphSection>
    </PageWrapper>
  );
};

export default DetailPage;
