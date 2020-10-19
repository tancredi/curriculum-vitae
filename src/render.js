const { readFileSync } = require('fs');
const { resolve } = require('path');
const Handlebars = require('handlebars');
const yaml = require('yaml');
const handlebarsHelpers = require('./utils/handlebars-helpers');
const handlebarsPartials = require('./utils/handlebars-partials');

const templatePath = resolve(__dirname, '../template/index.template.html');
const yamlPath = resolve(__dirname, '../data/cv.yml');

handlebarsHelpers.register();
handlebarsPartials.register();

module.exports = () => {
  const template = readFileSync(templatePath, 'utf-8');
  const data = yaml.parse(readFileSync(yamlPath, 'utf-8'));
  return Handlebars.compile(template)(data);
};
