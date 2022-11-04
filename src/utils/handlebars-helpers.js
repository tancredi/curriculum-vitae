const Handlebars = require('handlebars');
const slug = require('slug');
const moment = require('moment');
const marked = require('marked');

const helpers = {};

helpers.lower = (str) => str.toLowerCase();

helpers.fallback = (str, fallback) => str || fallback;

helpers.markdown = (str) => marked.parse(str);

helpers.date = (str, format, fallback) => {
  if (!str) {
    return fallback;
  }

  return moment(str, 'YYYY-MM-DD').format(format);
};

helpers.eachRange = (count, options) =>
  new Array(count)
    .fill(null)
    .map((_, i) => options.fn(i))
    .join('');

helpers.gte = (a, b, options) => (a >= b ? options.fn() : null);

helpers.gt = (a, b, options) => (a > b ? options.fn() : null);

helpers.lte = (a, b, options) => (a <= b ? options.fn() : null);

helpers.lt = (a, b, options) => (a < b ? options.fn() : null);

helpers.breaks = (str, options) => str.trim().replace(/\n/g, '<br />');

helpers.eachSlice = (values, start, end, options) =>
  values
    .slice(start, end || undefined)
    .map(options.fn)
    .join('');

helpers.eachColumn = (values, columnsCount, options) => {
  const columns = [];
  const rowsCount = Math.round(values.length / columnsCount);

  for (let c = 0; c < columnsCount; c++) {
    const rows = [];

    for (let r = 0; r < rowsCount; r++) {
      const i = c * rowsCount + r;
      values[i] && rows.push(values[i]);
    }

    columns.push({ rows, index: c });
  }

  return columns.map(options.fn).join('');
};

helpers.listDiffRender = (list, entry, dir, options) => {
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

helpers.slug = (str = '') => slug(str);

exports.register = () =>
  Object.keys(helpers).forEach((key) =>
    Handlebars.registerHelper(key, helpers[key])
  );
