const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:8888/notebooks/Examples.ipynb');
    await page.setViewport({ width: 1024, height: 6000 });
    await page.waitForSelector('.container > .cell');

    await page.waitForSelector('.container-fluid > .navbar-collapse > .nav > .dropdown:nth-child(5) > .dropdown-toggle');
    await page.click('.container-fluid > .navbar-collapse > .nav > .dropdown:nth-child(5) > .dropdown-toggle');
    await page.screenshot({path: 'screenshots/click1.png'});

    await page.waitForSelector('.nav > .dropdown > #cell_menu > #run_all_cells > a');
    await page.click('.nav > .dropdown > #cell_menu > #run_all_cells > a');
    await page.screenshot({path: 'screenshots/click2.png'});

    try {
      await page.waitForSelector('.done');
    } catch(e) {
      console.log(e);
    }

    await page.screenshot({path: 'screenshots/Examples.png'});
    await browser.close();
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
})();
