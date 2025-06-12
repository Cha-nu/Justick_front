import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const MonthlyGraph = ({ data, preData, showPrediction }) => {
  const mergedData = showPrediction
    ? preData.map((preItem, index) => {
      const month = data[index]?.month ?? preItem?.month ?? '';
      const avgPrice = data[index]?.avgPrice ?? null;
      const preAvgPrice = preItem?.avgPrice ?? null;

      return {
        month,
        avgPrice,
        preAvgPrice,
      };
    })
    : data.map((item) => ({
      month: item.month,
      avgPrice: item.avgPrice ?? null,
    }));

  const renderDot = (color) => (props) => {
    const { value, cx, cy } = props;
    if (value == null) return null;
    return <circle cx={cx} cy={cy} r={4} fill={color} />;
  };

  return (
    <div style={{ width: '100%', maxWidth: '1440px', height: 250, margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData}
          margin={{ top: 30, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="avgPrice"
            stroke="#4287f5"
            strokeWidth={2}
            dot={renderDot("#4287f5")}
            activeDot={{ r: 6 }}
            name="현재가"
            connectNulls={false}
          />
          {showPrediction && (
            <Line
              type="monotone"
              dataKey="preAvgPrice"
              stroke="orange"
              strokeWidth={2}
              dot={renderDot("orange")}
              activeDot={{ r: 6 }}
              name="예측가"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyGraph;
