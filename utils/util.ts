const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDateFromTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const ordinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
}

export function formatDateTime(dateTimeStr: string) {
  const date = new Date(dateTimeStr);

  // Array for ordinal suffixes
  const getOrdinal = (n: number) => {
    const suffix = ["th", "st", "nd", "rd"];
    const remainder = n % 100;
    return suffix[(remainder - 20) % 10] || suffix[remainder] || suffix[0];
  };

  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Get hours and minutes in 24-hour format and format them as two digits
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}${getOrdinal(day)} ${month}, ${year} at ${hours}:${minutes}`;
}
