import dayjs from 'dayjs';

// Aggregates weekly data into Monthly/Yearly buckets
export const aggregateData = (data, interval) => {
  if (interval === 'weekly') return data;

  const grouped = data.reduce((acc, curr) => {
    const date = dayjs(curr.date);
    const key = interval === 'monthly' 
      ? date.format('YYYY-MM') 
      : date.format('YYYY');

    if (!acc[key]) {
      acc[key] = { date: key, sales: 0, count: 0 };
    }
    acc[key].sales += curr.sales;
    acc[key].count += 1;
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => (a.date > b.date ? 1 : -1));
};

// Calculate Business Metrics
export const calculateGrowth = (data) => {
  if (!data || data.length < 2) return 0;
  const first = data[0].sales;
  const last = data[data.length - 1].sales;
  return (((last - first) / first) * 100).toFixed(1);
};

export const getTotalRevenue = (data) => {
  return data.reduce((sum, item) => sum + item.sales, 0).toFixed(0);
};