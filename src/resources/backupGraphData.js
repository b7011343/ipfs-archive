// Temporary implementation

export const data = () => {
  const _data = [];
  const date = new Date();
  date.setMonth(date.getMonth() - 3);

  for (let i = 0; i < 10; i++) {
    _data.push({
      id: i,
      storedGB: Math.floor(Math.random() * 500),
      time: date
    });
    date.setHours(date.getHours() + (Math.floor(Math.random() * 7) * 24));
  }

  return _data;
};
