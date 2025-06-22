import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const DailyGraph = ({ data, preData, showPrediction }) => {
    const mergeDataByDate = (data, preData) => {
        const map = new Map();

        data.forEach(({ date, price }) => {
            if (!map.has(date)) map.set(date, {});
            map.get(date).date = date;
            map.get(date).price = price ?? null;
        });

        preData.forEach(({ date, price }) => {
            if (!map.has(date)) map.set(date, {});
            map.get(date).date = date;
            map.get(date).prePrice = price ?? null;
        });

        // 날짜 기준 정렬
        return Array.from(map.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const mergedData = showPrediction ? mergeDataByDate(data, preData) : data.map((item) => ({
        date: item.date,
        price: item.price ?? null,
    }));

  const renderDot = (color) => (props) => {
    const { value, cx, cy } = props;
    if (value == null) return null;
    return <circle cx={cx} cy={cy} r={4} fill={color} />;
  };

  return (
    <div style={{ width: '100%', maxWidth: '1440px', height: 250, margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData} margin={{ top: 30, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
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
              dataKey="prePrice"
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

export default DailyGraph;