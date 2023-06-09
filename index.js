import getAmazonParams from "./amazon/getAmazonParams.js";
import getAmazonListingInfo from "./amazon/getAmazonListingInfo.js";
import getAmazonListings from "./amazon/getAmazonListings.js";
import getWalmartListingInfo from "./walmart/getWalmartListingInfo.js";
import getWalmartListings from "./walmart/getWalmartListings.js";
import save from "./helpers/fileSaver.js";
import getEbayListings from "./ebay/getEbayListings.js";
import getEbayParams from "./ebay/getEbayParams.js";
import getWalmartParams from "./walmart/getWalmartParams.js";
import getEbayListingInfo from "./ebay/getEbayListingInfo.js";
import getHomeDepotListings from "./homeDepot/getHomeDepotListings.js";
import getHomeDepotListingInfo from "./homeDepot/getHomeDepotListingInfo.js";
import getGoogleShoppingListings from "./googleShopping/getGoogleShoppingListings.js";
import getGoogleShoppingListingInfo from "./googleShopping/getGoogleShoppingListingInfo.js";
import getGoogleShoppingParams from "./googleShopping/getGoogleShoppingParams.js";

export const config = {
  API_KEY: undefined,
};

export const amazon = {
  timeMultiplier: 1,

  /**
   * Get listings from Amazon
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 50;
   * @param {String} currency - currency code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {String} language - interface language code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {String} zipCode - ZIP Postal code. To filter the products available to deliver to the selected postal code;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @param {Number} customerReviewsRating - customer review rating filter. Can be set from 1 to 4.;
   * @return {Promise<Array>} - an array with listings.
   */
  getListings: async (
    searchQuery,
    resultsLimit,
    currency,
    language,
    zipCode,
    priceFrom,
    priceTo,
    customerReviewsRating
  ) =>
    await getAmazonListings(
      amazon.timeMultiplier,
      searchQuery,
      resultsLimit,
      currency,
      language,
      zipCode,
      priceFrom,
      priceTo,
      customerReviewsRating
    ),

  /**
   * Get listing info from Amazon
   * @async
   * @param {String} link - listing link;
   * @param {String} currency - currency code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {String} language - interface language code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @return {Promise<{}>} - an object with listing info.
   */
  getListingInfo: async (link, currency, language, reviewsLimit) =>
    await getAmazonListingInfo(amazon.timeMultiplier, link, currency, language, reviewsLimit),

  /**
   * Get available languages and currencies
   * @return {Object} An object with languages and currencies.
   */
  getParams: () => getAmazonParams(),
};

export const walmart = {
  /**
   * Get listings from Walmart
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 40;
   * @param {String} store - specific store code. You can use both "store_id" or "address" from `getParams().stores`;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @return {Promise<Array>} - an array with listings.
   */
  getListings: async (searchQuery, resultsLimit, store, priceFrom, priceTo) =>
    await getWalmartListings(searchQuery, resultsLimit, store, priceFrom, priceTo),

  /**
   * Get listing info from Walmart
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @param {String} store - specific store code. You can use both "store_id" or "address" from `getParams().stores`;
   * @return {Promise<{}>} - an object with listing info.
   */
  getListingInfo: async (link, reviewsLimit, store) =>
    await getWalmartListingInfo(link, reviewsLimit, store),

  /**
   * Get available params
   * @return {Object} An object with walmart stores.
   */
  getParams: () => getWalmartParams(),
};

export const ebay = {
  timeMultiplier: 1,

  /**
   * Get listings from eBay
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 40;
   * @param {String} country - ebay domain. You can use both "domain" or "country" from `getParams().countries`;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @return {Promise<Array>} - an array with listings.
   */
  getListings: async (searchQuery, resultsLimit, country, priceFrom, priceTo) =>
    await getEbayListings(searchQuery, resultsLimit, country, priceFrom, priceTo),

  /**
   * Get listing info from eBay
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @return {Promise<{}>} - an object with listing info.
   */
  getListingInfo: async (link, reviewsLimit) =>
    await getEbayListingInfo(ebay.timeMultiplier, link, reviewsLimit),

  /**
   * Get available params
   * @return {Object} An object with walmart stores.
   */
  getParams: () => getEbayParams(),
};

export const homeDepot = {
  /**
   * Get listings from The Home Depot
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 40;
   * @param {String} zipCode - ZIP Postal code. To filter the shipping products by a selected area;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @return {Promise<Array>} - an array with listings.
   */
  getListings: async (searchQuery, resultsLimit, zipCode, priceFrom, priceTo) =>
    await getHomeDepotListings(searchQuery, resultsLimit, zipCode, priceFrom, priceTo),

  /**
   * Get listing info from The Home Depot
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @param {String} zipCode - ZIP Postal code. To filter the shipping products by a selected area;
   * @return {Promise<{}>} - an object with listing info.
   */
  getListingInfo: async (link, zipCode) => await getHomeDepotListingInfo(link, zipCode),
};

export const googleShopping = {
  /**
   * Get listings from Google Shopping
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 60;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @param {String} domain - Google domain. You can use both "domain" or "country_name" from `getParams().domains`;
   * @param {String} country - country code. You can use both "code" or "name" from `getParams().countries`;
   * @param {String} language - language domain. You can use both "code" or "name" from `getParams().languages`;
   * @return {Promise<Array>} - an array with listings.
   */
  getListings: async (searchQuery, resultsLimit, priceFrom, priceTo, domain, country, language) =>
    await getGoogleShoppingListings(
      searchQuery,
      resultsLimit,
      priceFrom,
      priceTo,
      domain,
      country,
      language
    ),

  /**
   * Get listing info from Google Shopping
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @return {Promise<{}>} - an object with listing info.
   */
  getListingInfo: async (link, reviewsLimit) =>
    await getGoogleShoppingListingInfo(link, reviewsLimit),

  /**
   * Get available params
   * @return {Object} An object with walmart stores.
   */
  getParams: () => getGoogleShoppingParams(),
};

/**
 * Save data to `.json` file
 * @param {Array | Object} data - Parsed darta;
 * @param {String} filename - Name of the `.json` file with results. Default - "parsed_results";
 */
export const saveToJSON = (data, filename) => {
  save(data, filename);
};
