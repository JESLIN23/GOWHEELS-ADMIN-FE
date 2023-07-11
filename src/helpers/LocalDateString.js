const LocalDateString = (dateValue) => {
  const date = new Date(dateValue);
  const localDateString = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return localDateString;
};

const LocalDateTimeString = (dateValue) => {
  const date = new Date(dateValue);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  };

  return date.toLocaleString('en-GB', options);
};

const DateConvertion = {
  LocalDateString,
  LocalDateTimeString,
};
export default DateConvertion;
