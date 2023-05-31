import { getBrowserInstance } from "../helpers/browserInstance.cjs";
import getAmazonParams from "./getAmazonParams.js";

let multiplier = 1;

const getResultsFromPage = async (page) => {
  return await page.evaluate(() =>
    Array.from(document.querySelectorAll(".s-result-item:not(.a-section, .s-widget)")).map(
      (el) => ({
        title: el.querySelector("h2 span").textContent.trim(),
        subTitle: el.querySelector("h2 + div")?.textContent.trim(),
        link: `https://www.amazon.com${el
          .querySelector('[data-component-type="s-product-image"] a')
          .getAttribute("href")
          .replace(/ref=sr.+/gm, "")}`,
        thumbnail: el
          .querySelector('[data-component-type="s-product-image"] img')
          ?.getAttribute("srcset")
          ?.split(",")
          .reverse()[0]
          .replace(/ [\d|\.]{1,3}x/gm, ""),
        bage: el
          .querySelector('[data-component-type="s-status-badge-component"] .a-badge-label-inner')
          ?.textContent.trim(),
        rating:
          parseFloat(
            (
              el.querySelector(
                ".s-product-image-container + div > div:nth-child(2) span:first-child"
              ) ||
              el.querySelector(
                ".s-list-col-right > div > div > div:nth-child(2) > div > span:first-child"
              )
            )
              ?.getAttribute("aria-label")
              ?.split(" ")[0]
          ) || undefined,
        reviews:
          parseInt(
            (
              el.querySelector(
                ".s-product-image-container + div > div:nth-child(2) > div > span:last-child"
              ) ||
              el.querySelector(
                ".s-list-col-right > div > div > div:nth-child(2) > div > span:last-child"
              )
            )?.textContent
              .trim()
              .replace(",", "")
              .replace(".", "")
          ) || undefined,
        listingHistory: (
          el.querySelector(
            ".s-product-image-container + div > div:nth-child(2) > div:nth-child(2)"
          ) ||
          el.querySelector(
            ".s-list-col-right > div > div > div:nth-child(2) > div:nth-child(2) > span"
          )
        )?.textContent.trim(),
        additionalinfo: (
          el.querySelector(
            ".s-product-image-container + div > div:nth-child(3) div > span:not(.a-price) .a-truncate-full"
          ) ||
          el.querySelector(
            ".s-product-image-container + div > div:nth-child(3) div > span:not(.a-price)"
          ) ||
          el.querySelector(".s-list-col-right > div > div > div:nth-child(3) a.a-text-bold")
        )?.textContent.trim(),
        additionalinfo2: (
          el.querySelector(
            ".s-product-image-container + div > div:nth-child(4) span.a-size-base"
          ) ||
          el.querySelector(
            ".s-list-col-right > div > div > div:nth-child(3) .a-section:nth-child(2)"
          )
        )?.textContent.trim(),
        price: (
          el.querySelector(
            ".s-product-image-container + div > div:nth-child(3) .a-price .a-offscreen"
          ) ||
          el.querySelector(
            ".s-list-col-right > div > div > div:nth-child(3) a .a-price .a-offscreen"
          )
        )?.textContent.trim(),
      })
    )
  );
};

const getAmazonListings = async (
  multiplierArgument,
  query,
  limit,
  currency,
  language,
  zipCode,
  priceFrom,
  priceTo,
  customerReviewsRating
) => {
  multiplier = multiplierArgument;
  const resultsLimit = limit || 50;
  const { currencies, languages } = getAmazonParams();
  const selectedLanguage = languages.find(
    (el) =>
      el.code.toLowerCase() === language?.toLowerCase() ||
      el.text.toLowerCase() === language?.toLowerCase()
  )?.code;

  if (language) {
    if (!selectedLanguage) {
      throw new Error(
        `Please select available language (use "getParams().languages" to get all languages list).`
      );
    }
  }
  const currencyCode = currencies.find(
    (el) =>
      el.code.toLowerCase() === currency?.toLowerCase() ||
      el.text.toLowerCase() === currency?.toLowerCase()
  )?.code;

  if (currency) {
    if (!currencyCode) {
      throw new Error(
        `Please select available currency (use "getParams().currencies" to get all currencies list).`
      );
    }
  }

  const zipPattern1 = /^\d{5}$/g;
  const zipPattern2 = /^\d{5}-\d{4}$/g;
  if (zipCode && !zipPattern1.test(zipCode) && !zipPattern2.test(zipCode)) {
    throw new Error(`Please set correct ZIP code.`);
  }

  if (priceFrom || priceTo) {
    const parsedPriceFrom = parseInt(priceFrom);
    const parsedPriceTo = parseInt(priceTo);
    if (
      (!parsedPriceFrom && !parsedPriceTo) ||
      (parsedPriceTo && parsedPriceFrom && parsedPriceTo < parsedPriceFrom) ||
      parsedPriceFrom < 0 ||
      parsedPriceTo < 1
    ) {
      throw new Error(`Please set correct prices arguments.`);
    }
  }

  const ratingNumber = parseInt(customerReviewsRating);
  if (customerReviewsRating) {
    if (!ratingNumber || ratingNumber < 1 || ratingNumber > 4) {
      throw new Error(`Please set "customerReviewsRating" argument from 1 to 4.`);
    }
  }

  const url = `https://www.amazon.com/s?k=${query}${
    selectedLanguage ? `&language=${selectedLanguage}` : ""
  }${priceFrom || priceTo ? "&rh=" : ""}${
    priceFrom || priceTo ? `p_36:${priceFrom || 0}00-${priceTo || 0}00,` : ""
  }`;

  const { page, closeBrowser, waitForTimeout } = await getBrowserInstance(multiplier);

  await page.goto(url);
  const listingSelector = ".s-result-item:not(.a-section, .s-widget)";
  await page.waitForSelector(listingSelector);

  const results = [];

  if (currencyCode) {
    await page.click(`#icp-touch-link-cop`);
    await waitForTimeout(5000 * multiplier);
    await page.click(`#icp-currency-dropdown`);
    await waitForTimeout(1000 * multiplier);
    await page.click(`#${currencyCode} a`);
    await waitForTimeout(1000 * multiplier);
    await page.click(`#icp-save-button`);
    await waitForTimeout(1000 * multiplier);
    await page.waitForSelector("#reviewsRefinements");
  }

  if (zipCode) {
    await page.click(`#glow-ingress-block`);
    await waitForTimeout(3000 * multiplier);
    await page.click(`#GLUXZipUpdateInput`);
    await waitForTimeout(1000 * multiplier);
    await page.keyboard.type(zipCode);
    await waitForTimeout(1000 * multiplier);
    await page.click(`#GLUXZipInputSection [type="submit"]`);
    await waitForTimeout(2000 * multiplier);
    await page.keyboard.press(`Tab`);
    await waitForTimeout(500 * multiplier);
    await page.keyboard.press(`Enter`);
    await waitForTimeout(1000 * multiplier);
    await page.waitForSelector("#reviewsRefinements");
  }

  if (customerReviewsRating) {
    let selectorNumber;
    if (ratingNumber === 1) selectorNumber = 4;
    if (ratingNumber === 2) selectorNumber = 3;
    if (ratingNumber === 3) selectorNumber = 2;
    if (ratingNumber === 4) selectorNumber = 1;
    await page.click(`#reviewsRefinements ul > span:nth-child(${selectorNumber})`);
    await waitForTimeout(1000 * multiplier);
    await page.waitForSelector(listingSelector);
  }

  while (true) {
    results.push(...(await getResultsFromPage(page)));
    const nextPageButton = await page.$(".s-pagination-next:not(.s-pagination-disabled)");
    if (!nextPageButton || results.length >= resultsLimit) break;
    await nextPageButton.click();
    await waitForTimeout(1000 * multiplier);
    await page.waitForSelector(listingSelector);
    await waitForTimeout(5000 * multiplier);
  }

  await closeBrowser();

  return results.slice(0, resultsLimit);
};

export default getAmazonListings;
