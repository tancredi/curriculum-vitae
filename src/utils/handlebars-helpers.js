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

exports.slug = (str) => slug(str);
