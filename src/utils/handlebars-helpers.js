const slug = require('slug');
const moment = require('moment');
const marked = require('marked');

exports.lower = (str) => str.toLowerCase();

exports.fallback = (str, fallback) => str || fallback;

exports.markdown = (str) => marked(str);

exports.date = (str, format, fallback) => {
  if (!str) {
    return fallback;
  }

  return moment(str, 'YYYY-MM-DD').format(format);
};

exports.eachRange = (count, options) =>
  new Array(count)
    .fill(null)
    .map((_, i) => options.fn(i))
    .join('');

exports.gte = (a, b, options) => (a >= b ? options.fn() : null);

exports.gt = (a, b, options) => (a > b ? options.fn() : null);

exports.lte = (a, b, options) => (a <= b ? options.fn() : null);

exports.lt = (a, b, options) => (a < b ? options.fn() : null);

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

exports.listDiffRender = (list, entry, dir, options) => {
  const index = list.indexOf(entry);
  const adjacent = list[dir === 'disc' ? index - 1 : index + 1];
  const render = (value) => options.fn(value);

  if (!adjacent) {
    return render(entry);
  }

  const prevFormatted = render(adjacent);
  const curFormatted = render(entry);

  if (prevFormatted !== curFormatted) {
    return curFormatted;
  }

  return null;
};

exports.slug = (str) => slug(str);
