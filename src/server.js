const express = require('express');
const { resolve } = require('path');
const render = require('./render');

const staticDir = resolve(__dirname, '../public');

exports.start = (port = 3000, silent = false) =>
  new Promise((resolve, reject) => {
    const app = express();

    app.use(express.static(staticDir));

    app.get('/', (req, res) => {
      res.send(render());
    });

    const server = app.listen(port, (err) => {
      if (err) {
        return reject(err);
      }

      !silent && console.log(`Listening at http://localhost:${port}`);

      resolve(server);
    });
  });
