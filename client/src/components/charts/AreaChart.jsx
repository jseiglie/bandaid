import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ChartArea = ({ data, usage, x, y }) => {
  console.log('Chart data:', data);

  if (!data || data.length === 0) {
    return <h3>No data available</h3>;
  }

  return (
    <section className="card">
      <h3>{usage}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={y} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        <div className="total">
          <strong>Total {usage}:</strong> {data && data.length}
        </div>
      </ResponsiveContainer>
    </section>
  );
};
