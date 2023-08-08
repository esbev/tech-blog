module.exports = {
  format_date: (date) => {
    return `${new Date(date).format("M / D / YY")}`;
  },
};
