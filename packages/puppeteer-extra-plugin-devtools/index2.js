const puppeteer = require('puppeteer-extra')
const devtools = require('./index.js')()
puppeteer.use(devtools)

puppeteer
  .launch({ headless: true, defaultViewport: {
    "width": 375,
    "height": 712,
    isMobile: true,
  }, args: ['--no-sandbox', '--disable-setuid-sandbox'], })
  .then(async browser => {
    console.log('Start')
    const tunnel = await devtools.createTunnel(browser)
    console.log(tunnel.url)

    const page = await browser.newPage()
    const mobile = {
      name: 'iPhone X',
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      viewport: {
        width: 375,
        height: 812,
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
    }
    await page.emulate(mobile)
    await page.goto('https://isawa.badambiz.com/html/sawa-card-challenge/ksa/?lan=ar')
    console.log('All setup.')
  })