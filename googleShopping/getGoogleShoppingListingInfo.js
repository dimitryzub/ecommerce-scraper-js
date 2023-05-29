import serpapi from "../helpers/serpapiHandler.js";
import { config } from "../index.js";
import getGoogleShoppingParams from "./getGoogleShoppingParams.js";

const getGoogleShoppingListingInfo = async (link, limit = 10) => {
  const { countries, languages, domains } = getGoogleShoppingParams();

  const parsedLink =
    [...link?.toString()?.matchAll(/https:\/\/(?<domain>.+)?\/s.+\/(?<id>\d+)?[\/|\?]/gm)].map(
      ({ groups }) => ({ id: groups.id, domain: groups.domain?.replace("www.", "") })
    )?.[0] || undefined;

  if (!parsedLink?.id) {
    throw new Error(`Please set correct product link`);
  }

  const selectedDomain = domains.find((el) => el.domain === parsedLink.domain);
  if (!selectedDomain) {
    throw new Error(`Please set correct product link`);
  }

  const productParams = {
    api_key: config.API_KEY,
    device: "desktop",
    product_id: parsedLink.id,
    google_domain: selectedDomain.domain,
    gl: selectedDomain?.default_country_code,
    hl: selectedDomain?.default_language_code,
  };

  const { product_results, error } = await serpapi("google_product", productParams);

  if (!product_results || error) {
    return `Error: ${error ? error : "unhandled error"}`;
  }

  const newResult = { ...product_results, reviewsAmount: product_results.reviews };
  delete newResult.product_id;
  delete newResult.reviews;

  const result = newResult;

  if (result.reviewsAmount) {
    const reviewsResult = [];

    const reviewsParams = {
      ...productParams,
      reviews: 1,
    };

    while (reviewsResult.length < limit) {
      try {
        const { reviews_results, serpapi_pagination } = await serpapi(
          "google_product",
          reviewsParams
        );
        if (!reviews_results?.reviews || !reviews_results?.reviews.length) break;
        reviewsResult.push(...reviews_results.reviews);
        if (!serpapi_pagination?.next_page_filter) break;
        reviewsParams.filter = serpapi_pagination.next_page_filter;
      } catch (err) {
        console.log(err);
        break;
      }
    }
    result.reviews = reviewsResult.slice(0, limit);
  }

  return result;
};

export default getGoogleShoppingListingInfo;
