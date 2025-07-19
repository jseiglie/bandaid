import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";


export default function ChartPie({ data, usage = "Pie Chart", x, y }) {


 data = [
  { name: "Group A", value: 58 },
  { name: "Group B", value: 13 },
];

  if (!data || data.length === 0) {
    return <section className="card"><h3>No data available for Pie Chart</h3></section>;
  }
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

  return (
    <section className="card">
      <h3>{usage}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width="100%" height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}
