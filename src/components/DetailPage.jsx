import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DailyGraph from './DailyGraph';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';
import { PageWrapper, PeriodButtons, PeriodButton, GraphSection, HeaderTitle } from './DetailPageStyle';
import { Card } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

// const SERVER_URL = 'http://justick.myvnc.com:2025/justick_spring';
const SERVER_URL = '/justick_spring';

const unitMap = {
  고구마: '10kg',
  양파: '1kg',
  배추: '10kg',
  감자: '20kg',
  무: '20kg',
  토마토: '10kg'
};


const apiProduceList = [
  { name: '고구마', key: 'sweetPotato' },
  { name: '양파', key: 'onion' },
  { name: '배추', key: 'cabbage' },
  { name: '감자', key: 'potato' },
  { name: '무', key: 'radish' },
  { name: '토마토', key: 'tomato' },
];

const GRADES = ['high', 'special'];

const initialCardInfo = [
  { key: '가락시장', title: '가락시장 도매가격', unit: '(10kg 상품 기준)', org: '농넷' },
  { key: '반입량', title: '가락시장 반입량', unit: '(1kg 상품 기준)', org: '농넷' },
  { key: '소매', title: '소매가격', unit: '(1포기 상품 기준)', org: 'KAMIS' },
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
  const matchedProduce = apiProduceList.find(item => item.key === key);
  const displayName = matchedProduce ? matchedProduce.name : '';
  const displayGrade = grade === 'special' ? '특' : grade === 'high' ? '상' : '';
  const [selectedPeriod, setSelectedPeriod] = useState('일');
  const [selectedCard, setSelectedCard] = useState('가락시장');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardInfo, setCardInfo] = useState(initialCardInfo);

  const [searchData, setSearchData] = useState([]); // ⬅️ 검색용 데이터
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const results = await Promise.all(
          apiProduceList.flatMap(({ name, key }) =>
            GRADES.map((grade) => {
              const url = `${SERVER_URL}/api/${key}/${grade}-prices`;
              return fetch(url)
                .then((res) => res.json())
                .then((json) => {
                  const latest = json.at(-1);
                  if (!latest) return null;
                  return {
                    name,
                    key,
                    grade,
                    date: `${latest.year}.${latest.month}.${latest.day}`,
                  };
                })
                .catch(() => null);
            })
          )
        );
        setSearchData(results.filter(Boolean));
      } catch (e) {
        console.error('검색 데이터 로딩 오류:', e);
      }
    };

    fetchSearchData();
  }, []);

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

        const unit = unitMap[displayName] || 'kg'; // 품목 단위 불러오기

        const newCardInfo = initialCardInfo.map(card => {
          if (card.key === '가락시장') {
            return {
              ...card,
              unit: `(${unit} 상품 기준)`,  // 👈 단위 통일 적용
              price: `${latest.averagePrice.toLocaleString()}원`,
              diff: `${priceDiff > 0 ? '+' : ''}${priceDiff.toLocaleString()} (${pricePercent.toFixed(1)}%)`,
              diffColor: priceDiff > 0 ? 'red' : 'blue',
              date: `${latest.month}월 ${latest.day}일 기준`
            };
          }
          if (card.key === '반입량') {
            return {
              ...card,
              unit: `(${unit} 상품 기준)`,  // 👈 단위 통일 적용
              price: `${latest.intake.toLocaleString()}톤`,
              diff: `${intakeDiff > 0 ? '+' : ''}${intakeDiff.toLocaleString()} (${intakePercent.toFixed(1)}%)`,
              diffColor: intakeDiff > 0 ? 'red' : 'blue',
              date: `${latest.month}월 ${latest.day}일 기준`
            };
          }
          if (card.key === '소매') {
            return {
              ...card,
              unit: `(${unit} 상품 기준)`,  // 👈 단위 통일 적용
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

        const weekFormat = data => Object.entries(data || {}).map(([key, val]) => ({ week: formatWeekLabel(key), sales: val.averagePrice }));
        const intakeFormat = data => Object.entries(data || {}).map(([key, val]) => ({ week: formatWeekLabel(key), sales: val.intake }));

        setWeeklyPriceData(weekFormat(weeklyData));
        setWeeklyIntakeData(intakeFormat(weeklyData));
        setPreWeeklyData(weekFormat(preWeeklyData));

        const monthFormat = data => Object.entries(data || {}).map(([key, val]) => ({ month: `${key}월`, avgPrice: val.averagePrice }));
        const intakeMonthFormat = data => Object.entries(data || {}).map(([key, val]) => ({ month: `${key}월`, avgPrice: val.intake }));

        setMonthlyPriceData(monthFormat(monthlyData));
        setMonthlyIntakeData(intakeMonthFormat(monthlyData));
        setPreMonthlyData(monthFormat(preMonthlyData));

        setDailyRetailData(retailData.map(val => ({ date: `${val.month}월 ${val.day}일`, price: val.averagePrice })));
      } catch (e) {
        console.error('데이터 로딩 오류:', e);
      }
    };

    fetchAll();
  }, [key, grade]);

  const getData = () => {
    if (selectedCard === '가락시장') return selectedPeriod === '일' ? dailyPriceData : selectedPeriod === '주' ? weeklyPriceData : monthlyPriceData;
    if (selectedCard === '반입량') return selectedPeriod === '일' ? dailyIntakeData : selectedPeriod === '주' ? weeklyIntakeData : monthlyIntakeData;
    if (selectedCard === '소매') return dailyRetailData;
    return [];
  };

  const getPreData = () => {
    if (selectedCard === '가락시장') return selectedPeriod === '일' ? preDailyData : selectedPeriod === '주' ? preWeeklyData : preMonthlyData;
    return [];
  };

  const showPrediction = selectedCard === '가락시장';

  return (
    <>
      <NavigationBar data={searchData} />
      <PageWrapper>
        <HeaderTitle>
          <span className="highlight">{displayName}({displayGrade}) 거래 가격</span>{' '}
          <span className="normal">바로 보기</span>
        </HeaderTitle>
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
                if (selectedCard === '소매' && period !== '일') return null;
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

          {selectedPeriod === '일' && <DailyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />}
          {selectedPeriod === '주' && <WeeklyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />}
          {selectedPeriod === '월' && <MonthlyGraph data={getData()} preData={getPreData()} showPrediction={showPrediction} />}
        </GraphSection>
      </PageWrapper>
    </>
  );
};

export default DetailPage;
