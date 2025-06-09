import styled from 'styled-components';

// 페이지 전체를 감싸는 컨테이너 (여백 포함)
export const PageWrapper = styled.div`
  padding: 80px 20px 20px;
`;

// '일 / 월 / 연' 버튼들을 감싸는 컨테이너
export const PeriodButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 40px 0 0 0;
  padding-right: 260px;
  gap: 10px;
  height: 40px;
`;


// 각각의 '일 / 월 / 연' 버튼 스타일
export const PeriodButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#4287f5' : '#e0e0e0')}; // 활성화된 버튼은 파란색
  color: ${({ active }) => (active ? 'white' : 'black')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;

export const HeaderTitle = styled.h2`
  text-align: left; // ← 'left', 'center', 'right' 로 조절 가능
  margin: -19px 40px 50px 600px; // ← 왼쪽 여백 직접 조절
  font-size: 24px;

  span.highlight {
    color:rgb(5, 72, 173);
    font-weight: bold;
  }

  span.normal {
    color: #333;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    margin-left: 20px;
  }
`;

// 그래프가 나오는 영역
export const GraphSection = styled.div`
  padding: 20px 0;
  
  
`;
