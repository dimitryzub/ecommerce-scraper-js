import serpapi from "../helpers/serpapiHandler.js";
import { config } from "../index.js";
import getEbayParams from "./getEbayParams.js";

const getEbayListings = async (query, limit = 40, country, priceFrom, priceTo) => {
  const { countries } = getEbayParams();

  const selectedCountry = countries.find(
    (el) => el.domain === country || el.country === country
  )?.domain;
  if (country && !selectedCountry) {
    throw new Error(
      `Please select available country (use "getParams().countries" to get all countries list).`
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
    _nkw: query,
    ebay_domain: selectedCountry || undefined,
    _udlo: priceFrom || undefined,
    _udhi: priceTo || undefined,
    _pgn: 1,
  };

  const results = [];
  while (results.length < limit) {
    try {
      const { organic_results } = await serpapi("ebay", params);
      if (!organic_results || !organic_results.length) break;
      results.push(...organic_results);
      params._pgn += 1;
    } catch (err) {
      console.log(err);
      break;
    }
  }

  return results.slice(0, limit);
};

export default getEbayListings;
