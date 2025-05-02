import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const WeeklyGraph = ({ data, preData, showPrediction }) => {
  const mergedData = data.map((item, index) => {
    const week = item.week;
    const sales = item.sales ?? null;
    const preSales = preData[index]?.sales ?? null;

    return {
      week,
      sales: sales === undefined ? null : sales,
      preSales: preSales === undefined ? null : preSales,
    };
  });

  const renderDot = (color) => (props) => {
    const { cx, cy } = props;
    return <circle cx={cx} cy={cy} r={4} fill={color} />;
  };

  const renderLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y - 10} fill="black" textAnchor="middle" fontSize={12}>
        {value}
      </text>
    );
  };

  return (
    <div style={{ width: '85vw', height: 250, margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mergedData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#4287f5"
            strokeWidth={2}
            dot={renderDot("#4287f5")}
            activeDot={{ r: 6 }}
            label={renderLabel}
            name="현재가"
            connectNulls={false}
          />
          {showPrediction && (
            <Line
              type="monotone"
              dataKey="preSales"
              stroke="orange"
              strokeWidth={2}
              dot={renderDot("orange")}
              activeDot={{ r: 6 }}
              label={renderLabel}
              name="예측가"
              connectNulls={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyGraph;
