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

const PriceCard = ({ item, onClick }) => {
  const isUp = item.priceDiff > 0;
  const isDown = item.priceDiff < 0;
  const arrow = isUp ? '▲' : isDown ? '▼' : '-';
  const color = isUp ? '#dc2626' : isDown ? '#2563eb' : '#999';

  return (
    <CardWrapper onClick={onClick}>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemUnit>{item.unit}</ItemUnit>
        <ItemPrice>{item.todayPrice}</ItemPrice>
      </ItemInfo>
      <PriceDiffBox>
        <DiffLabel>전일대비</DiffLabel>
        <DiffValue style={{ color }}>
          {item.priceDiff?.toLocaleString()}원
        </DiffValue>
        <DiffRate color={color}>
          {arrow} {Math.abs(item.priceRate)}%
        </DiffRate>
      </PriceDiffBox>
    </CardWrapper>
  );
};

export default PriceCard;
