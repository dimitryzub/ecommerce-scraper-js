import { getBrowserInstance } from "../helpers/browserInstance.cjs";

let multiplier = 1;

const getMainInfo = async (page) => {
  return await page.evaluate(() => {
    return {
      title: document.querySelector('[data-testid="x-item-title"]')?.textContent.trim(),
      link: "",
      condition: document
        .querySelector('[data-testid="x-item-condition"] [data-testid="ux-textual-display"]')
        ?.textContent.trim(),
      price: document
        .querySelector('[data-testid="x-price-primary"] > span > span')
        ?.textContent.trim(),
      itemSpecifics:
        document.querySelector(
          '[data-testid="x-about-this-item"] [data-testid="ux-layout-section__item"]'
        ) ||
        document.querySelector(
          '[data-testid="x-about-this-item"] [data-testid="ux-layout-section-evo__item"]'
        )
          ? [
              ...document.querySelectorAll(
                '[data-testid="x-about-this-item"] [data-testid="ux-layout-section__item"] .ux-layout-section__row'
              ),
              ...document.querySelectorAll(
                '[data-testid="x-about-this-item"] [data-testid="ux-layout-section-evo__item"] .ux-layout-section-evo__row'
              ),
            ]?.reduce(
              (acc, el) => ({
                ...acc,
                [`${el
                  .querySelector(".ux-labels-values__labels:nth-child(1) span")
                  ?.textContent.trim()}`]: el
                  .querySelector(".ux-labels-values__values:nth-child(2) span")
                  ?.textContent.trim(),
                ...(el.querySelector(".ux-labels-values__labels:nth-child(3)")
                  ? {
                      [`${el
                        .querySelector(".ux-labels-values__labels:nth-child(3) span")
                        ?.textContent.trim()}`]: el
                        .querySelector(".ux-labels-values__values:nth-child(4) span")
                        ?.textContent.trim(),
                    }
                  : {}),
              }),
              {}
            )
          : undefined,
      aboutProduct:
        document.querySelector(
          '[data-testid="x-product-details"] [data-testid="ux-layout-section"]'
        ) ||
        document.querySelector(
          '[data-testid="x-product-details"] [data-testid="ux-layout-section-module-evo"]'
        )
          ? [
              ...document.querySelectorAll(
                '[data-testid="x-product-details"] [data-testid="ux-layout-section"]'
              ),
              ...document.querySelectorAll(
                '[data-testid="x-product-details"] [data-testid="ux-layout-section-module-evo"]'
              ),
            ]?.reduce(
              (acc, el) => ({
                ...acc,
                [`${el.querySelector(".section-title")?.textContent.trim()}`]: Array.from(
                  el.querySelectorAll('[data-testid="ux-labels-values"]')
                )?.reduce(
                  (innerAcc, innerEl) => ({
                    ...innerAcc,
                    [`${innerEl
                      .querySelector(".ux-labels-values__labels-content")
                      ?.textContent.trim()}`]: innerEl
                      .querySelector(".ux-labels-values__values-content")
                      ?.textContent.trim(),
                  }),
                  {}
                ),
              }),
              {}
            )
          : undefined,

      description: "",
      reviewsInfo: {
        rating:
          parseFloat(
            document
              .querySelector("#review-ratings-cntr > span:first-child")
              ?.getAttribute("title")
              ?.split(" ")[0]
          ) || undefined,
        reviewsAmount:
          parseInt(
            document
              .querySelector("#review-ratings-cntr > span:last-child")
              ?.textContent.trim()
              .split(" ")[0]
              .replace(",", "")
              .replace(".", "")
          ) || undefined,
      },
    };
  });
};

const getEbayListingInfo = async (multiplierArgument, link, reviewsLimit = 10) => {
  multiplier = multiplierArgument;

  const { page, closeBrowser, waitForTimeout } = await getBrowserInstance();

  await page.goto(link);
  await page.waitForSelector("#Body");
  await waitForTimeout(5000 * multiplier);

  const isFinished = await page.$('[data-testid="d-statusmessage"]');
  if (isFinished) return "This listing has ended.";

  const isRemoved = await page.$(".vimsg");
  if (isRemoved) return "This listing has removed.";

  // main info
  const listingInfo = await getMainInfo(page);
  listingInfo.link = link;

  //description
  const frames = page.frames();
  for (const frame of frames) {
    const text = await frame.evaluate(() => document.querySelector("#ds_div")?.textContent.trim());
    if (text) {
      listingInfo.description = text;
      break;
    }
  }

  // reviews
  const isReviews = await page.$(".reviews-right .reviews-header a");
  if (isReviews) {
    await page.evaluate(`document.querySelector('.reviews-right .reviews-header a').click()`);
    await waitForTimeout(3000 * multiplier);
    listingInfo.reviewsInfo.reviews = [];
    while (true) {
      await page.keyboard.press("End");
      await waitForTimeout(1000 * multiplier);
      listingInfo.reviewsInfo.reviews.push(
        ...(await page.evaluate(() =>
          Array.from(document.querySelectorAll(".ebay-review-section"))?.map((el) => ({
            name: el.querySelector('[itemprop="author"]')?.textContent.trim(),
            rating:
              parseFloat(
                el.querySelector('[itemprop="reviewRating"]')?.getAttribute("title").split(" ")[0]
              ) || undefined,
            headeeng: el.querySelector('[itemprop="name"]')?.textContent.trim(),
            date: el.querySelector('[itemprop="datePublished"]')?.textContent.trim(),
            bage: el
              .querySelector(".ebay-review-section-l > span:nth-child(5)")
              ?.textContent.trim(),
            review: el.querySelector('[itemprop="reviewBody"]')?.textContent.trim(),
          }))
        ))
      );
      const nextPageButton = await page.$("nav li:last-child > a:not(.disabled)");
      if (!nextPageButton || listingInfo.reviewsInfo.reviews.length >= reviewsLimit) break;
      await nextPageButton.click();
      await waitForTimeout(2000 * multiplier);
      await page.waitForSelector(".ebay-review-section");
      await waitForTimeout(2000 * multiplier);
    }
    listingInfo.reviewsInfo.reviews = listingInfo.reviewsInfo.reviews.slice(0, reviewsLimit);
  }

  await closeBrowser();

  return listingInfo;
};

export default getEbayListingInfo;
