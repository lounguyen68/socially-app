export const formatTime = (timeString: Date): string => {
  const time = new Date(timeString);
  const now = new Date();

  const isSameYear = time.getFullYear() === now.getFullYear();
  const isSameMonth = time.getMonth() === now.getMonth();

  const isSameDay =
    isSameYear && isSameMonth && time.getDate() === now.getDate();

  if (isSameDay) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const date = time.getDate().toString().padStart(2, '0');

  if (isSameYear) return `${date}/${month}`;

  return `${date}/${month}/${year}`;
};
