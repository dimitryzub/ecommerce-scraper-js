import { getBrowserInstance } from "../helpers/browserInstance.cjs";
import getAmazonParams from "./getAmazonParams.js";

let multiplier = 1;

const getMainInfo = async (page) => {
  return await page.evaluate(() => {
    return {
      title: document.querySelector("span#productTitle")?.textContent.trim(),
      link: "",
      bage: document.querySelector("#acBadge_feature_div span > span")?.textContent.trim(),
      productOverview: document.querySelector("#productOverview_feature_div tr")
        ? Array.from(document.querySelectorAll("#productOverview_feature_div tr"))?.reduce(
            (acc, el) => ({
              ...acc,
              [`${el.querySelector("td:first-child")?.textContent.trim()}`]: el
                .querySelector("td:last-child")
                ?.textContent.trim(),
            }),
            {}
          )
        : undefined,
      features: document.querySelector("#featurebullets_feature_div li")
        ? Array.from(document.querySelectorAll("#featurebullets_feature_div li"))?.map((el) =>
            el.textContent.trim()
          )
        : undefined,
      productInformation:
        document.querySelector("#productDetails_feature_div tr") ||
        document.querySelector("#detailBulletsWrapper_feature_div li")
          ? [
              ...document.querySelectorAll("#productDetails_feature_div tr"),
              ...document.querySelectorAll("#detailBulletsWrapper_feature_div li"),
            ]?.reduce((acc, el) => {
              const element = el.querySelector("td") || el.querySelector("span > span:last-child");
              let text = "";
              if (element) {
                let rawRext = element.textContent.trim();
                if (rawRext.includes("\n")) {
                  for (let child of element.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                      text += child.textContent.trim();
                    }
                  }
                } else text = rawRext;
              } else {
                text = undefined;
              }
              return {
                ...acc,
                [`${(
                  el.querySelector("th") || el.querySelector("span > span:first-child")
                )?.textContent.trim()}`]: text,
              };
            }, {})
          : undefined,
      description: document.querySelector("#productDescription span")?.textContent.trim(),
      buyingOptions: [],
      reviewsInfo: {
        rating:
          parseFloat(
            (
              document.querySelector("span#acrPopover")?.getAttribute("aria-label") ||
              document.querySelector("span#acrPopover")?.getAttribute("title")
            )?.split(" ")[0]
          ) || undefined,
        reviewsAmount:
          parseInt(
            document
              .querySelector("#acrCustomerReviewLink")
              ?.textContent.trim()
              .split(" ")[0]
              .replace(",", "")
              .replace(".", "")
          ) || undefined,
      },
    };
  });
};

const getAmazonListingInfo = async (
  multiplierArgument,
  link,
  currency,
  language,
  reviewsLimit = 10
) => {
  multiplier = multiplierArgument;
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

  const { page, closeBrowser, waitForTimeout } = await getBrowserInstance();

  await page.goto(`${link}${selectedLanguage ? `?language=${selectedLanguage}` : ""}`);
  await page.waitForSelector("span#productTitle");
  await waitForTimeout(5000 * multiplier);

  if (currencyCode) {
    await page.click(`#icp-touch-link-cop`);
    await waitForTimeout(5000 * multiplier);
    await page.click(`#icp-currency-dropdown`);
    await waitForTimeout(1000 * multiplier);
    await page.click(`#${currencyCode} a`);
    await waitForTimeout(1000 * multiplier);
    await page.click(`#icp-save-button`);
    await waitForTimeout(1000 * multiplier);
    await page.waitForSelector("span#productTitle");
    await waitForTimeout(5000 * multiplier);
  }

  //main info
  const listingInfo = await getMainInfo(page);
  listingInfo.link = link;

  await page.keyboard.press("End");
  await waitForTimeout(3000 * multiplier);
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("PageUp");
    await waitForTimeout(500 * multiplier);
  }

  const isByFeature = await page.$("#cr-summarization-attributes-list");
  if (isByFeature) {
    await page.focus("#cr-summarization-attributes-list");
    await waitForTimeout(2000 * multiplier);
    listingInfo.reviewsInfo.byFeature = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#cr-summarization-attributes-list > div"))?.reduce(
        (acc, el) => ({
          ...acc,
          [`${el.querySelector(".a-col-left")?.textContent.trim()}`]: el
            .querySelector("i > span")
            ?.textContent.trim(),
        }),
        {}
      )
    );
  }

  //buying options
  const buyingOptionsButton = await page.$(`#buybox-see-all-buying-choices`);
  if (buyingOptionsButton) {
    await buyingOptionsButton.click();
    await page.waitForSelector("#aod-offer-list");
    await waitForTimeout(2000 * multiplier);
    listingInfo.buyingOptions = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#aod-offer-list > div")).map((el) => {
        const element = el.querySelector("#mir-layout-DELIVERY_BLOCK > div:first-child > span");
        let text = "";
        if (element) {
          for (let child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
              text += child.textContent.trim();
            }
          }
        } else {
          text = undefined;
        }
        return {
          condition: el
            .querySelector("#aod-offer-heading h5")
            ?.textContent.trim()
            .replace(/\s{2}|\\n/gm, ""),
          price: el.querySelector(".a-price .a-offscreen")?.textContent.trim(),
          delivery: el.querySelector(
            "#mir-layout-DELIVERY_BLOCK > div:first-child > span.a-color-error"
          )
            ? el
                .querySelector("#mir-layout-DELIVERY_BLOCK > div:first-child > span.a-color-error")
                .textContent.trim()
            : {
                date: el
                  .querySelector("#mir-layout-DELIVERY_BLOCK > div:first-child > span > span")
                  ?.textContent.trim(),
                price: text,
              },
          shipsFrom: el
            .querySelector("#aod-offer-shipsFrom .aod-ships-from-country")
            ?.textContent.trim(),
          soldBy: {
            seller: el.querySelector("#aod-offer-soldBy a")?.textContent.trim(),
            sellerLink: `https://www.amazon.com${el
              .querySelector("#aod-offer-soldBy a")
              ?.getAttribute("href")}`,
            sellerRating: el.querySelector("#aod-offer-seller-rating")?.textContent.trim(),
          },
        };
      })
    );
  } else delete listingInfo.buyingOptions;

  // reviews
  const isReviews = await page.$('[data-hook="see-all-reviews-link-foot"]');
  if (isReviews) {
    await page.evaluate(
      `document.querySelector('[data-hook="see-all-reviews-link-foot"]').click()`
    );
    await waitForTimeout(3000 * multiplier);
    listingInfo.reviewsInfo.reviews = [];
    while (true) {
      await page.keyboard.press("End");
      await waitForTimeout(1000 * multiplier);
      listingInfo.reviewsInfo.reviews.push(
        ...(await page.evaluate(() =>
          Array.from(document.querySelectorAll('[data-hook="review"]'))?.map((el) => ({
            name: el.querySelector(".a-profile-name")?.textContent.trim(),
            avatar: el.querySelector(".a-profile-avatar > img")?.getAttribute("src"),
            rating:
              parseFloat(el.querySelector(" i > span")?.textContent.trim().split(" ")[0]) ||
              undefined,
            summary: el.querySelector('[data-hook="review-title"]')?.textContent.trim(),
            dateAndPlace: el.querySelector('[data-hook="review-date"]')?.textContent.trim(),
            bage: el.querySelector('[data-hook="avp-badge"]')?.textContent.trim(),
            review: el.querySelector('[data-hook="review-body"]')?.textContent.trim(),
          }))
        ))
      );
      const nextPageButton = await page.$(".a-pagination > li:last-child:not(.a-disabled)");
      if (!nextPageButton || listingInfo.reviewsInfo.reviews.length >= reviewsLimit) break;
      await nextPageButton.click();
      await waitForTimeout(2000 * multiplier);
      await page.waitForSelector('[data-hook="review"]');
      await waitForTimeout(2000 * multiplier);
    }
    listingInfo.reviewsInfo.reviews = listingInfo.reviewsInfo.reviews.slice(0, reviewsLimit);
  }

  await closeBrowser();

  return listingInfo;
};

export default getAmazonListingInfo;
