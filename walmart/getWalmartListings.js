import serpapi from "../helpers/serpapiHandler.js";
import { config } from "../index.js";
import getWalmartParams from "./getWalmartParams.js";

const getWalmartListings = async (query, limit = 40, store, priceFrom, priceTo) => {
  const { stores } = getWalmartParams();

  const storeId = stores.find((el) => el.store_id === store || el.address === store)?.store_id;
  if (store && !storeId) {
    throw new Error(
      `Please select available store (use "getParams().stores" to get all stores list).`
    );
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

  const params = {
    api_key: config.API_KEY,
    device: "desktop",
    query,
    store_id: storeId || undefined,
    min_price: priceFrom || undefined,
    max_price: priceTo || undefined,
    page: 1,
  };

  const results = [];
  while (results.length < limit) {
    try {
      const { organic_results } = await serpapi("walmart", params);
      if (!organic_results || !organic_results.length) break;
      results.push(...organic_results);
      params.page += 1;
    } catch (err) {
      console.log(err);
      break;
    }
  }

  return results.slice(0, limit).map((el) => {
    const newResult = { ...el, primary_offer: { ...el.primary_offer } };
    delete newResult.product_id;
    delete newResult.us_item_id;
    delete newResult.seller_id;
    delete newResult.primary_offer?.offer_id;
    delete newResult.serpapi_product_page_url;
    return newResult;
  });
};

export default getWalmartListings;
