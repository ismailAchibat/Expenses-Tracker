import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

interface Expense {
  date: string;
  amount: number;
}

// Define the props for the ExpenseChart component
interface Props {
  data: Expense[];
}

function ExpenseChart({ data }: Props) {
  console.log("Rendering ExpenseChart with data:", data); // Log to verify data

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Take the last 8 expenses
  const recentData = data.reverse().slice(6);

  // Format the date to show only month and day
  const formattedData = recentData.map((expense) => ({
    ...expense,
    date: format(parseISO(expense.date), 'MM-dd'), // Format date as MM-dd
  }));

  return (
    <ResponsiveContainer width={400} height={275}>
      <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="rgb(34 197 94)" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;
