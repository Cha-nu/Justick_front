import styled from 'styled-components';

// 카드 전체 박스
export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;     // 좌우로 분리 (상품 정보 vs 변화 정보)
  align-items: flex-start;
  padding: 16px;
  border-radius: 16px;                 // 둥근 테두리
  width: 192px;
  height: 150px;
  border: 1px solid #ccc;             // 연한 테두리
  transition: box-shadow 0.3s;
  background-color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); // 마우스 올렸을 때 그림자 강조
  }
`;

// 상품 이름, 단위, 가격 묶음
export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

//  품목 이름 (예: 배추, 고추)
export const ItemName = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

// ⚖ 단위 정보 (예: 10kg, 포기2)
export const ItemUnit = styled.div`
  font-size: 14px;
  color: #666; // 회색으로 눈에 덜 띄게
`;

// 오늘 가격 (강조된 파란색)
export const ItemPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black; // 파란색 강조
`;

// 전일대비 정보 박스 (오른쪽 정렬)
export const PriceDiffBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  gap: 4px;
`;

// "전일대비" 라벨
export const DiffLabel = styled.div`
  font-size: 13px;
  color: #444;
`;

//가격 변화 수치 (예: +200원)
export const DiffValue = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

// 상승률 (▲ 5.3%) + 색상 강조 배경
export const DiffRate = styled.div`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  color: white;
  background-color: ${({ color }) => color}; // 동적 색상 적용 (빨강/파랑/회색)
`;
