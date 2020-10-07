const express = require('express');
const { resolve } = require('path');
const render = require('./render');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send(render());
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
