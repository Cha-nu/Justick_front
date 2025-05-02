import styled from 'styled-components';

// 전체 페이지를 감싸는 최상단 컨테이너
export const MainPageWrapper = styled.div`
  padding: 32px;
  max-width: 1920px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
`;

// 상단 배너 섹션 (타이틀, 서브타이틀, 검색 포함)
export const IntroSection = styled.div`
  margin-top: 44px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 두 번째 줄 타이틀 (부 제목)
export const IntroTitle1 = styled.div`
  font-size: 46px;
  font-weight: 600;
  white-space: nowrap;
  @media (max-width: 1280px) { font-size: 28px; }
  @media (max-width: 768px) { font-size: 24px; }
  @media (max-width: 520px) { font-size: 20px; }
`;

// 첫 번째 줄 타이틀 (제목)
export const IntroTitle2 = styled.div`
  font-size: 44px;
  font-weight: 500;
  margin-top: -20px;
  white-space: nowrap;
  @media (max-width: 1280px) { font-size: 22px; }
  @media (max-width: 768px) { font-size: 20px; }
  @media (max-width: 520px) { font-size: 18px; }
`;

// 검색 입력창 스타일 - 검색창에서 위 아래 마진 다 하게함, 다른거 ㄴㄴ
export const IntroSearchBar = styled.input`
  margin-top: 55px;
  margin-bottom: 30px; 
  padding: 18px 40px;
  height: 65px;
  width: 100%;             
  max-width: 450px; 
  border: 1px solid #2DB400;
  border-radius: 9999px;
  font-size: 17px;
  outline: none;
  text-align: left;
  white-space: nowrap;
  @media (max-width: 1280px) { 
    font-size: 15px;
    max-width: 40%; 
  }
  @media (max-width: 768px) { 
    font-size: 14px;
    max-width: 50%; 
  }
  @media (max-width: 520px) { 
    font-size: 13px; 
    max-width: 40%;
  }
`;

// 카테고리 버튼들이 있는 래퍼
export const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  margin-top: 24px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 8px 16px;
  &::-webkit-scrollbar {
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

// 동그란 카테고리 버튼
export const CategoryCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 세로로 배치 */
  align-items: center; /* 수평 정렬: 가운데 */
  justify-content: center; /* 수직 정렬: 가운데 */
  margin: 0 -5px;
  transition: filter 0.3s ease, transform 0.2s ease;

  box-shadow: none;

  &:hover {
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);

    transform: translateY(-2px);
  }

  cursor: pointer;
`;


// 카테고리 텍스트
export const CategoryText = styled.div`
  font-size: 14px;
  color: #1e1e1e;
`;

// 카드 섹션과 날씨 박스를 감싸는 영역 (가로 정렬)
export const CardSectionWithWeather = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
  margin-top: 110px;
  flex-wrap: wrap;
`;

// 회색 박스 (카드 포함)
export const CardWrapperBox = styled.div`
  background-color:#f5f5f5;
  border: 1px solid #f5f5f5;
  padding: 40px 24px 24px; /* 위쪽 padding 늘림 */
  border-radius: 16px;
  /*box-shadow: 0 2px 8px rgba(0,0,0,0.05);*/
  max-width: calc((192px + 13px) * 4 + 48px);
  overflow-x: auto;
  position: relative;
  
`;

// 날씨 정보 박스
export const WeatherBox = styled.div`
  min-width: 400px;
  min-height: 100%; 
  background: #f5f5f5/*#f5f5f5*/;
  border: 1px solid #f5f5f5;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 14px;
  /*box-shadow: 0 2px 8px rgba(0,0,0,0.05);*/
  line-height: 1.8;
  color: #333;

  
`;

// 드롭다운 + 제목 + 날짜 묶음 영역
export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  flex-wrap: nowrap;
  white-space: nowrap;
`;

// 드롭다운 버튼 (오늘(상))
export const PeriodDropdown = styled.div`
  position: relative;
  font-size: 32px;
  font-weight: bold;
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

// 드롭다운 화살표
export const Arrow = styled.span`
  font-size: 16px;
  margin-left: 4px;
`;

// 드롭다운 목록
export const PeriodOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #2563eb;
  width: 145px;
  font-size: 16px;
  z-index: 1000;
`;

// 드롭다운 개별 항목
export const PeriodOption = styled.div`
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f4ff;
  }
  &.active {
    background-color: #e0ebff;
    color: #2563eb;
  }
`;

// (상) 또는 (특)
export const GradeSmall = styled.span`
  font-size: 30px;
`;

// 제목 텍스트 (가락시장 도매가격)
export const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  white-space: nowrap;
`;

// 날짜 텍스트
export const PriceDate = styled.div`
  font-size: 14px;
  color: #888;
  white-space: nowrap;
  position: absolute;
  top: 80px; 
  right: 16px;
   
  @media (max-width: 900px) {
    display: none;
  }
`;

// 카드 컨테이너 스크롤 가능 영역
export const ScrollContainer = styled.div`
  overflow-x: auto;
  padding-bottom: 6px;
`;

// 카드 그리드 (가로배치)
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
  grid-auto-flow: column;
  grid-template-rows: repeat(2, auto);
  gap: 16px;
  width: max-content;
`;

// 아래 placeholder 박스
export const DetailPlaceholder = styled.div`
  background-color: #f5f5f5;
  margin-top: 800px;
  height: 256px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

// 카드 상단 정보 라인 (가격 오른쪽 정렬용)
export const PriceCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 0 20px;
`;
