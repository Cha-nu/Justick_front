import React from 'react';
import { Container } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const DailyGraph = ({ data, preData }) => {
  const mergedData = data.map((item, index) => ({
    date: item.date,
    price: item.price,
    prePrice: preData[index]?.price ?? null,
  }));

  const renderDailyDot = (props) => {
    const { cx, cy } = props;
    return <circle cx={cx} cy={cy} r={4} fill="#4287f5" />;
  };

  const renderPreDailyDot = (props) => {
    const { cx, cy } = props;
    return <circle cx={cx} cy={cy} r={4} fill="orange" />;
  };

  const renderDailyLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y - 10} fill="black" textAnchor="middle" fontSize={12}>
        {value}
      </text>
    );
  };

  return (
    <div>
      
      <div style={{ width: '85vw', height: 250, margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mergedData} margin={{ top: 30, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid 
               strokeDasharray="3 3"
               vertical={false}
            />
            <XAxis 
              dataKey="date"
              padding={{ left: 30, right: 30 }} 
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4287f5"
              strokeWidth={2}
              dot={renderDailyDot}
              activeDot={{ r: 6 }}
              label={renderDailyLabel}
              name="현재가"
            />
            <Line
              type="monotone"
              dataKey="prePrice"
              stroke="orange"
              strokeWidth={2}
              dot={renderPreDailyDot}
              activeDot={{ r: 6 }}
              label={renderDailyLabel}
              name="예측가"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyGraph;
