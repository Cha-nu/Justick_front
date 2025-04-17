import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mockData';
import DailyGraph from './DailyGraph';
import WeeklyGraph from './WeeklyGraph';
import MonthlyGraph from './MonthlyGraph';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [preDailyData, setPreDailyData] = useState([]);
  const [preWeeklyData, setPreWeeklyData] = useState([]);
  const [preMonthlyData, setPreMonthlyData] = useState([]);

  useEffect(() => {
    // 데이터가 없는 경우를 대비해 목데이터를 사용
    const fetchItemData = () => {
      const fallbackItem = mockData.find(item => item.id === parseInt(id));
      if (fallbackItem) {
        setItem(fallbackItem);

        // 그래프 데이터는 랜덤으로 생성
        setDailyData(Array.from({ length: 7 }, (_, i) => ({
          date: `4/${i + 1}`,
          price: Math.floor(Math.random() * 10000) + 1000,
        })));

        // preDailyData: 랜덤으로 생성된 데이터
        setPreDailyData(Array.from({ length: 7 }, (_, i) => ({
          date: `4/${i + 1}`,
          price: Math.floor(Math.random() * 10000) + 2000,
        })));

        setWeeklyData(Array.from({ length: 12 }, (_, i) => ({
          week: `${i + 1}주`,
          sales: Math.floor(Math.random() * 10000) + 1000,
        })));

        // preWeeklyData: 랜덤으로 생성된 데이터
        setPreWeeklyData(Array.from({ length: 12 }, (_, i) => ({
          week: `${i + 1}주`,
          sales: Math.floor(Math.random() * 10000) + 1100,
        })));

        setMonthlyData(Array.from({ length: 6 }, (_, i) => ({
          month: `${i + 1}월`,
          avgPrice: Math.floor(Math.random() * 10000) + 1000,
        })));

        // preMonthlyData: 랜덤으로 생성된 데이터
        setPreMonthlyData(Array.from({ length: 6 }, (_, i) => ({
          month: `${i + 1}월`,
          avgPrice: Math.floor(Math.random() * 10000) + 1200,
        })));
      }
    };

    fetchItemData();
  }, [id]);

  if (!item) return <div className="detail-page">데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="detail-page">
      <h2 className="detail-subtitle">일간 가격 추이</h2>
      <DailyGraph data={dailyData} preData={preDailyData} />

      <h2 className="detail-subtitle">주간 판매량</h2>
      <WeeklyGraph data={weeklyData} preData={preWeeklyData} />

      <h2 className="detail-subtitle">월별 평균 가격</h2>
      <MonthlyGraph data={monthlyData} preData={preMonthlyData} />
    </div>
  );
};

export default DetailPage;
