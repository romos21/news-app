export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
