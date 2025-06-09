import React from 'react';
import {
  CardWrapper,
  ItemInfo,
  ItemName,
  ItemUnit,
  ItemPrice,
  PriceDiffBox,
  DiffLabel,
  DiffValue,
  DiffRate
} from './PriceCard.styles';

const PriceCard = ({ item, unit, onClick }) => {
  const isUp = item.gap > 0;
  const isDown = item.gap < 0;
  const arrow = isUp ? '▲' : isDown ? '▼' : '-';
  const color = isUp ? '#dc2626' : isDown ? '#2563eb' : '#999';

  return (
    <CardWrapper onClick={onClick}>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemUnit>{unit}</ItemUnit>  {/* ✅ 여기 */}
        <ItemPrice>{item.averagePrice?.toLocaleString()}원</ItemPrice>
      </ItemInfo>
      <PriceDiffBox>
        <DiffLabel>전일대비</DiffLabel>
        <DiffValue style={{ color }}>
          {item.gap?.toLocaleString()}원
        </DiffValue>
        <DiffRate color={color}>
          {arrow} {isFinite(item.percent) ? Math.abs(item.percent).toFixed(1) : 0}%
        </DiffRate>
      </PriceDiffBox>
    </CardWrapper>
  );
};


export default PriceCard;
