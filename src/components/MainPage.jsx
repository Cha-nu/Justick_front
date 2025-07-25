import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceCard from './PriceCard';
import NavigationBar from "./NavigationBar";
import { FaSearch } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
  CategoryWrapper,
  CategoryCircle,
  CategoryText,
  CardSectionWithWeather,
  CardWrapperBox,
  WeatherTopBox,
  WeatherBottomBox,
} from './MainPage.styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudSun,
  faCloud,
  faCloudShowersHeavy,
  faCloudRain,
  faSnowflake,
  faCloudSunRain,
} from '@fortawesome/free-solid-svg-icons';

const unitMap = {
  고구마: '10kg',
  양파: '1kg',
  배추: '10kg',
  감자: '20kg',
  무: '20kg',
  토마토: '5kg'
  // 필요시 계속 추가
};

const periodMap = {
  high: '오늘(상)',
  special: '오늘(특)',
};

const apiProduceList = [
  { name: '고구마', key: 'sweetPotato', icon: '/icons/고구마컬.png' },
  { name: '양파', key: 'onion', icon: '/icons/양파컬.png' },
  { name: '배추', key: 'cabbage', icon: '/icons/배추컬.png' },
  { name: '감자', key: 'potato', icon: '/icons/감자컬.png' },
  { name: '무', key: 'radish', icon: '/icons/무컬.png' },
  { name: '토마토', key: 'tomato', icon: '/icons/토마토컬.png' },
];

const additionalProduceList = [
  { name: '당근', icon: '/icons/당근컬.png' },
  { name: '호박', icon: '/icons/호박컬.png' },
  { name: '파', icon: '/icons/파컬.png' },
  { name: '브로콜리', icon: '/icons/브로콜리컬.png' },
];

const GRADES = ['high', 'special'];
// const BASE_URL = 'http://justick.myvnc.com:2025/justick_spring';
const BASE_URL = '/justick_spring';
const MainPage = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('high');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cardSectionRef = useRef(null);
  const isInView = useInView(cardSectionRef, {
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '0px 0px 0px 0px',
  });
  const [weather, setWeather] = useState({
    temperature: null,
    humidity: null,
    windSpeed: null,
    weather: '',
    icon: faSun,
    iconColor: '#f39c12'
  });

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const requests = apiProduceList.flatMap(({ name, key }) =>
          GRADES.map((grade) => {
            const url = `${BASE_URL}/api/${key}/${grade}-prices`;
            return fetch(url)
              .then((res) => res.json())
              .then((json) => ({ status: 'fulfilled', name, key, grade, json }))
              .catch((err) => ({ status: 'rejected', name, key, grade, err }));
          })
        );

        const results = await Promise.all(requests);
        const apiItems = [];

        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { name, key, grade, json } = result;
            const arr = Array.isArray(json) ? json : [];
            if (arr.length === 0) return;

            const latest = arr.reduce((acc, cur) => {
              const accDate = new Date(acc.year, acc.month - 1, acc.day);
              const curDate = new Date(cur.year, cur.month - 1, cur.day);
              return curDate > accDate ? cur : acc;
            });

            const yesterdayPrice = latest.averagePrice - latest.gap;
            const percent = yesterdayPrice !== 0 ? (latest.gap / yesterdayPrice) * 100 : 0;

            apiItems.push({
              ...latest,
              name,
              key,
              grade: grade.toLowerCase(),
              percent,
              date: `${latest.year}.${String(latest.month).padStart(2, '0')}.${String(
                latest.day
              ).padStart(2, '0')}`,
            });
          }
        });

        setData(apiItems);
        if (apiItems.length > 0) {
          setDate(apiItems[0].date);
        }
      } catch (e) {
        console.error('API 데이터 수집 중 에러:', e);
      }
    };
    fetchApiData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const serviceKey = 'RwFnFISqtNf2iWlKxlmJYAwzjiJHK%2BFr803L748fZ2Oo6LJi0wx82l32XSgHEpyvusJu0T8jRSnXD2WOsZTBdg%3D%3D';
      const now = new Date();
      const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
      const baseTime = '1100';
      const nx = 62;
      const ny = 126;

      const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=100&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        const items = json.response?.body?.items?.item || [];

        const getValue = (category) => items.find((i) => i.category === category)?.fcstValue;

        const temp = getValue('TMP') ?? 'N/A';
        const hum = getValue('REH') ?? 'N/A';
        const wind = getValue('WSD') ?? 'N/A';
        const sky = getValue('SKY');
        const pty = getValue('PTY');

        let weatherText = '정보 없음';
        let icon = faSun;
        let iconColor = '#f39c12';

        if (pty === '0') {
          if (sky === '1') {
            weatherText = '맑음';
            icon = faSun;
            iconColor = '#f39c12';
          } else if (sky === '3') {
            weatherText = '구름많음';
            icon = faCloudSun;
            iconColor = '#a0aec0';
          } else if (sky === '4') {
            weatherText = '흐림';
            icon = faCloud;
            iconColor = '#718096';
          }
        } else if (pty === '1') {
          weatherText = '비';
          icon = faCloudShowersHeavy;
          iconColor = '#3182ce';
        } else if (pty === '2') {
          weatherText = '비/눈';
          icon = faCloudRain;
          iconColor = '#63b3ed';
        } else if (pty === '3') {
          weatherText = '눈';
          icon = faSnowflake;
          iconColor = '#e0f2f1';
        } else if (pty === '4') {
          weatherText = '소나기';
          icon = faCloudSunRain;
          iconColor = '#90cdf4';
        }

        setWeather({
          temperature: temp,
          humidity: hum,
          windSpeed: wind,
          weather: weatherText,
          icon,
          iconColor,
        });
      } catch (e) {
        console.error('기상청 API 호출 실패:', e);
      }
    };

    fetchWeather(); // 최초 실행

    const intervalId = setInterval(fetchWeather, 2 * 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase().replace(/\s+/g, ''); // 공백 제거
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


  const handleButtonClick = (produceName) => {
    const foundItem = data.find(
      (item) => item.name === produceName && item.grade === period
    );
    if (foundItem) {
      navigate(`/detail/${foundItem.key}/${foundItem.grade}`);
    } else {
      alert('서비스 준비중입니다.');
    }
  };

  return (
    <>
      <NavigationBar data={data} hideSearch={true} />


      <MainPageWrapper>
        <IntroSection>
          <IntroTitle2>가락시장 도매가</IntroTitle2>
          <IntroTitle1>
            농산물 예측서비스 <span style={{ color: '#2DB400' }}>&quot;딱대&quot;</span>
          </IntroTitle1>
          <IntroSearchBar
            placeholder="품목을 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />

          <CategoryWrapper>
            {apiProduceList.map((produce) => (
              <CategoryCircle key={produce.name} onClick={() => handleButtonClick(produce.name)}>
                <img
                  src={produce.icon}
                  alt={produce.name}
                  style={{ width: '100px', height: '100px', marginBottom: '8px' }}
                />
                <CategoryText>{produce.name}</CategoryText>
              </CategoryCircle>
            ))}
          </CategoryWrapper>
        </IntroSection>
        <div ref={cardSectionRef}>
          {isInView && (
        <motion.div
          ref={cardSectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <CardSectionWithWeather>
            <CardWrapperBox>
              <TitleRow>
                <PeriodDropdown onClick={() => setIsOpen(!isOpen)}>
                  <span>
                    오늘 <GradeSmall>{period === 'high' ? '(상)' : '(특)'}</GradeSmall>
                  </span>
                  <Arrow>▼</Arrow>
                  {isOpen && (
                    <PeriodOptions>
                      {GRADES.map((key) => (
                        <PeriodOption
                          key={key}
                          className={period === key ? 'active' : ''}
                          onClick={() => {
                            setPeriod(key);
                            setIsOpen(false);
                          }}
                        >
                          {periodMap[key]}
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
                  {[...data.filter((item) => item.grade === period),
                  ...additionalProduceList.map((item) => ({ name: item.name, isExtra: true }))].map(
                    (item, index) => (
                      <PriceCard
                        key={`${item.name}-${index}`}
                        item={item}
                        unit={unitMap[item.name] || 'kg'}  // 기본값은 'kg'
                        onClick={() => {
                          if (item.isExtra) {
                            alert('서비스 준비중입니다.');
                          } else {
                            navigate(`/detail/${item.key}/${item.grade}`);
                          }
                        }}
                      />

                    )
                  )}
                </CardGrid>
              </ScrollContainer>
            </CardWrapperBox>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <WeatherTopBox>
                <FontAwesomeIcon
                  icon={weather.icon}
                  size="4x"
                  style={{ color: weather.iconColor }}
                  className="weather-icon"
                />
                <div className="weather-text">
                  <strong>날씨 정보</strong>
                  <div>서울: {weather.temperature}℃, {weather.weather}</div>
                  <div>습도: {weather.humidity}%</div>
                  <div>풍속: {weather.windSpeed}m/s</div>
                </div>
              </WeatherTopBox>
              <WeatherBottomBox
                role="button"
                tabIndex={0}
                onClick={() =>
                  window.open('https://temp.garak.co.kr/price/OZViewer.do?R010680=10&R010690=10&R010700=10', '_blank')
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.open('https://temp.garak.co.kr/price/OZViewer.do?R010680=10&R010690=10&R010700=10', '_blank');
                  }
                }}
              >
                <div className="bottom-text-box">
                  <div className="bottom-title">실시간 경매 결과</div>
                  <div className="bottom-subtitle">오늘의 실시간 경매 결과를<br /> 바로 확인해보세요</div>

                </div>
                <img src="/icons/경매.png" alt="경매 아이콘" style={{ width: '160px', height: '160px' }} />
              </WeatherBottomBox>

            </div>
          </CardSectionWithWeather>
        </motion.div>
          )}
        </div>
      </MainPageWrapper >
    </>
  );
};

export default MainPage;
