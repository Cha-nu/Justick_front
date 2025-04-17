import React, { useState, useEffect } from 'react';
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

const MonthlyGraph = ({ data, preData }) => {
  const [cabbageData, setCabbageData] = useState([]);

  useEffect(() => {
    const fetchCabbageData = async () => {
      try {
        const res = await fetch("http://justick-env.eba-bahjbyqe.ap-northeast-2.elasticbeanstalk.com/api/cabbage/High-monthly");
        const cabbage = await res.json();
        const latest = cabbage[0];

        const monthlyData = {
          month: `Month ${new Date().getMonth() + 1}`,
          avgPrice: latest?.averagePrice || 0,
        };

        setCabbageData([monthlyData]);
      } catch (err) {
        console.error("배추 API 실패:", err);
      }
    };

    fetchCabbageData();
  }, []);

  // 병합: 월별 평균값과 이전값을 같은 x축(month)에 매핑
  const mergedData = data.map((item, index) => ({
    month: item.month,
    avgPrice: item.avgPrice,
    preAvgPrice: preData[index]?.avgPrice ?? null,
  }));

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
    <div>
      <Container fluid style={{ textAlign: 'left', marginTop: '40px' }}>
        <h5 style={{ fontWeight: 'bold' }}>월간 그래프</h5>
      </Container>
      <div style={{ width: '100vw', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mergedData} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
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
              label={renderLabel}
              name="현재가"
            />
            <Line
              type="monotone"
              dataKey="preAvgPrice"
              stroke="orange"
              strokeWidth={2}
              dot={renderDot("orange")}
              activeDot={{ r: 6 }}
              label={renderLabel}
              name="예측가"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyGraph;
