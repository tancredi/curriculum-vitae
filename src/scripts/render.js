const { writeFileSync } = require('fs');
const { resolve } = require('path');
const template = require('../core/template');

const destFile = resolve(__dirname, '../../dist/index.html');

const run = () => {
  writeFileSync(destFile, template.render());
};

run();
