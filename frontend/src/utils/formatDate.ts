export const formatDate = (date: Date) =>
  new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
