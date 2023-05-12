const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const { executablePath } = require("puppeteer");

puppeteer.use(StealthPlugin());

const getBrowserInstance = async (timeMultiplier) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1600,900",
      "--single-process",
    ],
    executablePath: executablePath(),
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
  });
  page.setDefaultNavigationTimeout(30000 * timeMultiplier);
  page.setDefaultTimeout(30000 * timeMultiplier);

  const closeBrowser = async () => await browser.close();

  const waitForTimeout = async (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  return { page, closeBrowser, waitForTimeout };
};

module.exports = { getBrowserInstance };
