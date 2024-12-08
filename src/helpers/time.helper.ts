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

export const isBefore = (first?: Date | string, second?: Date | string) => {
  const firstTime = first ? new Date(first) : new Date();
  const secondTime = second ? new Date(second) : new Date();

  return firstTime.getTime() < secondTime.getTime();
};
