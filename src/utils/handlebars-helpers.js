const slug = require('slug');
const moment = require('moment');

exports.lower = (str) => str.toLowerCase();

exports.fallback = (str, fallback) => str || fallback;

exports.date = (str, format, fallback) => {
  if (!str) {
    return fallback;
  }

  return moment(str, 'YYYY-MM-DD').format(format);
};

exports.eachColumn = (values, columnsCount, options) => {
  const columns = [];
  const rowsCount = Math.round(values.length / columnsCount);

  for (let c = 0; c < columnsCount; c++) {
    const rows = [];

    for (let r = 0; r < rowsCount; r++) {
      const i = c * rowsCount + r;
      values[i] && rows.push(values[i]);
    }

    columns.push(rows);
  }

  return columns.map(options.fn).join('');
};

exports.slug = (str) => slug(str);
