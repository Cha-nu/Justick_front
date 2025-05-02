import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from './mockData';
import weatherData from './weatherData';
import PriceCard from './PriceCard';
import { FaSearch } from 'react-icons/fa';
import {
  MainPageWrapper,
  IntroSection,
  IntroTitle1,
  IntroTitle2,
  IntroSearchBar,
  TitleRow,
  Title,
  GradeSmall,
  PeriodDropdown,
  Arrow,
  PeriodOptions,
  PeriodOption,
  PriceDate,
  ScrollContainer,
  CardGrid,
  DetailPlaceholder,
  CategoryWrapper,
  CategoryCircle,
  CategoryText,
  CardSectionWithWeather,
  CardWrapperBox,
  WeatherBox
} from './MainPage.styles';

const periodMap = {
  high: '오늘(상)',
  special: '오늘(특)',
};

const produceList = [
  { name: '양파', icon: '/icons/양파컬.png' },
  { name: '배추', icon: '/icons/배추컬.png' },
  { name: '고추', icon: '/icons/고추컬.png' },
  { name: '무', icon: '/icons/무컬.png' },
  { name: '당근', icon: '/icons/당근컬1.png' },
  { name: '고구마', icon: '/icons/고구마컬.png' },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('high');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState(weatherData[0]);



  useEffect(() => {
    const fetchData = async () => {
      let itemList = [];
      /*
            try {
              const res = await fetch(`http://211.211.151.18:2022/api/cabbage/high-prices`);
              const data = await res.json();
              const latest = data[0];
      
              if (latest) {
                const year = latest?.year;
                const month = latest?.month?.toString().padStart(2, '0');
                const day = latest?.day?.toString().padStart(2, '0');
                setDate(`${year}-${month}-${day}`);
              }
      
              itemList.push({
                id: 9991,
                name: "배추",
                unit: "10kg",
                grade: "high",
                todayPrice: `${parseInt(latest?.averagePrice || 0).toLocaleString()}원`,
              });
            } catch (err) {
              console.error("배추 High-Prices API 실패:", err);
              itemList.push({
                id: 9991,
                name: "배추",
                unit: "10kg",
                grade: "high",
                todayPrice: '연결실패',
              });
            }
      
            try {
              const res = await fetch(`http://211.211.151.18:2022/api/cabbage/special-prices`);
              const data = await res.json();
              const latest = data[0];
      
              itemList.push({
                id: 9992,
                name: "배추",
                unit: "포기2",
                grade: "special",
                todayPrice: `${parseInt(latest?.averagePrice || 0).toLocaleString()}원`,
              });
            } catch (err) {
              console.error("배추 Special-Prices API 실패:", err);
              itemList.push({
                id: 9992,
                name: "배추",
                unit: "포기2",
                grade: "special",
                todayPrice: '연결실패',
              });
            }
      
            try {
              const res = await fetch(`http://211.211.151.18:2022/api/onion/high-prices`);
              const data = await res.json();
              const latest = data[0];
      
              itemList.push({
                id: 9993,
                name: "양파",
                unit: "10kg",
                grade: "high",
                todayPrice: `${parseInt(latest?.averagePrice || 0).toLocaleString()}원`,
              });
            } catch (err) {
              console.error("양파 High-Prices API 실패:", err);
              itemList.push({
                id: 9993,
                name: "양파",
                unit: "10kg",
                grade: "high",
                todayPrice: '연결실패',
              });
            }
      
          
            try {
              const res = await fetch(`http://211.211.151.18:2022/api/onion/special-prices`);
              const data = await res.json();
              const latest = data[0];
      
              itemList.push({
                id: 9994,
                name: "양파",
                unit: "포기2",
                grade: "special",
                todayPrice: `${parseInt(latest?.averagePrice || 0).toLocaleString()}원`,
              });
            } catch (err) {
              console.error("양파 Special-Prices API 실패:", err);
              itemList.push({
                id: 9994,
                name: "양파",
                unit: "포기2",
                grade: "special",
                todayPrice: '연결실패',
              });
            }
      */

      const allowedNames = ['배추', '고추', '고추3', '고추2', '무', '양파', '당근', '토마토', '고구마'];
      const mock = mockData.filter(item => allowedNames.includes(item.name));/* && !['배추', '양파'].includes(item.name));*/

      setData([...itemList, ...mock]);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSelect = (value) => {
    setPeriod(value);
    setIsOpen(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const foundItem = data.find(
        item => item.name.toLowerCase() === searchTerm.trim().toLowerCase()
      );
      if (foundItem) {
        navigate(`/detail/${foundItem.id}`);
      } else {
        alert("해당 품종이 없습니다.");
      }
    }
  };

  const handleButtonClick = (produceName) => {
    const foundItem = data.find(
      item => item.name.toLowerCase() === produceName.toLowerCase()
    );
    if (foundItem) {
      navigate(`/detail/${foundItem.id}`);
    } else {
      alert("해당 품종이 없습니다.");
    }
  };

  return (
    <MainPageWrapper>
      <IntroSection>
        <IntroTitle2>가락시장 도매가</IntroTitle2>
        <IntroTitle1>농산물 예측서비스 <span style={{ color: '#2DB400' }}>"딱대"</span></IntroTitle1>
        <IntroSearchBar
          placeholder="품목을 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        <CategoryWrapper>
          {produceList.map(produce => (
            <CategoryCircle key={produce.name} onClick={() => handleButtonClick(produce.name)}>
              <img
                src={produce.icon}
                alt={produce.name}
                style={{
                  width: '100px',
                  height: '100px',
                  marginBottom: '8px',
                  objectFit: 'contain'
                }}
              />
              <CategoryText>{produce.name}</CategoryText>
            </CategoryCircle>
          ))}
        </CategoryWrapper>
      </IntroSection>

      <CardSectionWithWeather>
        <CardWrapperBox>
          <TitleRow>
            <PeriodDropdown onClick={() => setIsOpen(!isOpen)}>
              <span>
                오늘
                <GradeSmall>{period === 'high' ? '(상)' : '(특)'}</GradeSmall>
              </span>
              <Arrow>▼</Arrow>
              {isOpen && (
                <PeriodOptions>
                  {Object.entries(periodMap).map(([key, label]) => (
                    <PeriodOption
                      key={key}
                      className={period === key ? 'active' : ''}
                      onClick={() => handleSelect(key)}
                    >
                      {label}
                    </PeriodOption>
                  ))}
                </PeriodOptions>
              )}
            </PeriodDropdown>
            <Title>가락시장 도매가격</Title>
            {date && <PriceDate>기준일({date})</PriceDate>}
          </TitleRow>

          <ScrollContainer>
            <CardGrid>
              {data
                .filter(item => item.grade === period)
                .map(item => (
                  <PriceCard key={item.id} item={item} onClick={() => handleClick(item.id)} />
                ))}
            </CardGrid>
          </ScrollContainer>
        </CardWrapperBox>

        <WeatherBox>
          <strong>날씨 정보</strong>
          <div>서울: {weather.temperature}℃, {weather.weather}</div>
          <div>습도: {weather.humidity}%</div>
          <div>풍속: {weather.windSpeed}m/s</div>
          <img src={weather.icon} alt={weather.weather} style={{ width: '30px', height: '30px' }} />
        </WeatherBox>

      </CardSectionWithWeather>
    </MainPageWrapper>
  );
};

export default MainPage;
