import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./title";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const PieChart = ({ dt }) => {
  const data = [
    { name: "Income", value: dt?.income || 0 },
    { name: "Expense", value: dt?.expense || 0 },
    { name: "Balance", value: dt?.balance || 0 },
  ];

  // Optionally skip if all values are 0
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  if (total === 0) return null;

  return (
    <div className='w-full md:w-1/2 flex flex-col items-center bg-gray-50 dark:bg-transparent'>
      <Title title='Pie Breakdown' />
      <ResponsiveContainer width={"100%"} height={500}>
        <RechartsPieChart width={500} height={400}>
          <Tooltip />
          <Legend />
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={180}
            fill='#8884d8'
            paddingAngle={5}
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
