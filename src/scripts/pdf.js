const { start } = require('../core/server');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const puppeteer = require('puppeteer');

const port = 7564;
const destFile = resolve(__dirname, '../../dist/curriculum-vitae.pdf');
const pdfSettings = {
  format: 'A4',
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  printBackground: true,
  scale: 0.85,
};

const render = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle2' });
  const pdf = await page.pdf(pdfSettings);

  writeFileSync(destFile, pdf);

  await browser.close();
};

const run = async () => {
  const server = await start(port, true);

  await render();

  server.close();
};

run();
