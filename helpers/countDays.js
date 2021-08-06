const countDays = (start, end) => {
  const oneDay = 24 * 60 * 60 * 1000;

  start = new Date(start);
  end = new Date(end);

  return Math.round(Math.abs((start - end) / oneDay));
};

export default countDays;