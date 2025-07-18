const chartUtils = {};

chartUtils.getMonthName = (index) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[index] || "";
};
chartUtils.groupByMonth = (data) => {
  const monthCounts = Array(12).fill(0);

  data.forEach((item) => {
    const monthIndex = new Date(item.createdAt).getMonth();
    monthCounts[monthIndex]++;
  });

  return monthCounts.map((count, index) => ({
    name: chartUtils.getMonthName(index),
    count,
  }));
};
export default chartUtils;
