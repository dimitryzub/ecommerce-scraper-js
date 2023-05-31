import serpapi from "../helpers/serpapiHandler.js";
import { config } from "../index.js";
import getGoogleShoppingParams from "./getGoogleShoppingParams.js";

const getGoogleShoppingListings = async (
  query,
  limit = 60,
  priceFrom,
  priceTo,
  domain,
  country,
  language
) => {
  const { countries, languages, domains } = getGoogleShoppingParams();

  const selectedDomain = domains.find(
    (el) =>
      el.domain.toLowerCase() === domain?.toLowerCase() ||
      el.country_name.toLowerCase() === domain?.toLowerCase()
  );
  if (domain && !selectedDomain) {
    throw new Error(
      `Please select available domain (use "getParams().domains" to get all domains list).`
    );
  }

  const selectedCountry = countries.find(
    (el) =>
      el.code.toLowerCase() === country?.toLowerCase() ||
      el.name.toLowerCase() === country?.toLowerCase()
  )?.code;
  if (country && !selectedCountry) {
    throw new Error(
      `Please select available country (use "getParams().countries" to get all countries list).`
    );
  }

  const selectedLanguage = languages.find(
    (el) =>
      el.code.toLowerCase() === language?.toLowerCase() ||
      el.name.toLowerCase() === language?.toLowerCase()
  )?.code;
  if (language && !selectedLanguage) {
    throw new Error(
      `Please select available language (use "getParams().languages" to get all languages list).`
    );
  }

  const params = {
    api_key: config.API_KEY,
    q: query,
    google_domain: selectedDomain?.domain || "google.com",
    gl: selectedCountry || selectedDomain?.default_country_code || "us",
    hl: selectedLanguage || selectedDomain?.default_language_code || "en",
    device: "desktop",
    start: 0,
  };

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
    } else {
      params.tbs = `"mr:1,price:1${parsedPriceFrom ? `,ppr_min:${parsedPriceFrom}` : ""}${
        parsedPriceTo ? `,ppr_max:${parsedPriceTo}` : ""
      }`;
    }
  }

  const results = [];
  while (results.length < limit) {
    try {
      const { shopping_results } = await serpapi("google_shopping", params);
      if (!shopping_results || !shopping_results.length) break;
      results.push(...shopping_results);
      params.start += 60;
    } catch (err) {
      console.log(err);
      break;
    }
  }

  return results.slice(0, limit).map((el) => {
    const newResult = { ...el };
    delete newResult.product_id;
    delete newResult.serpapi_product_api;
    delete newResult.number_of_comparisons;
    delete newResult.comparison_link;
    delete newResult.serpapi_product_api_comparisons;
    return newResult;
  });
};

export default getGoogleShoppingListings;
