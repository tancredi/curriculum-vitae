const { readdirSync, readFileSync } = require('fs');
const { resolve, basename } = require('path');
const Handlebars = require('handlebars');

const partialsDir = resolve(__dirname, '../../template/partials');
const partialsExtension = '.template.html';

exports.register = () => {
  for (const filename of readdirSync(partialsDir)) {
    if (!filename.includes(partialsExtension)) {
      continue;
    }

    const partialName = basename(filename, partialsExtension);
    const template = readFileSync(resolve(partialsDir, filename), 'utf8');

    Handlebars.registerPartial(partialName, template);
  }
};
