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

export const amazon = {
  timeMultiplier: 1,

  /**
   * Get listings from Amazon
   * @async
   * @param {String} searchQuery - search query;
   * @param {Number} resultsLimit - results amount you want to get. Must be a number or `Infinity`. Default - 50;
   * @param {String} currency - currency code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {String} language - interface language code. You can use both "text" or "code" from `getParams().currencies`;
   * @param {Number} priceFrom - min price filter value;
   * @param {Number} priceTo - max price filter value;
   * @param {Number} customerReviewsRating - customer review rating filter. Can be set from 1 to 4.;
   * @return {Array.<Object>} - an array with listings.
   */
  getListings: (
    searchQuery,
    resultsLimit,
    currency,
    language,
    priceFrom,
    priceTo,
    customerReviewsRating
  ) =>
    getAmazonListings(
      amazon.timeMultiplier,
      searchQuery,
      resultsLimit,
      currency,
      language,
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
   * @return {Array.<Object>} - an array with listings.
   */
  getListingInfo: (link, currency, language, reviewsLimit) =>
    getAmazonListingInfo(amazon.timeMultiplier, link, currency, language, reviewsLimit),

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
   * @return {Array.<Object>} - an array with listings.
   */
  getListings: (searchQuery, resultsLimit, store, priceFrom, priceTo) =>
    getWalmartListings(searchQuery, resultsLimit, store, priceFrom, priceTo),

  /**
   * Get listing info from Walmart
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @param {String} store - specific store code. You can use both "store_id" or "address" from `getParams().stores`;
   * @return {Array.<Object>} - an array with listings.
   */
  getListingInfo: (link, reviewsLimit, store) => getWalmartListingInfo(link, reviewsLimit, store),

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
   * @return {Array.<Object>} - an array with listings.
   */
  getListings: (searchQuery, resultsLimit, country, priceFrom, priceTo) =>
    getEbayListings(searchQuery, resultsLimit, country, priceFrom, priceTo),

  /**
   * Get listing info from eBay
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @return {Array.<Object>} - an array with listings.
   */
  getListingInfo: (link, reviewsLimit) =>
    getEbayListingInfo(ebay.timeMultiplier, link, reviewsLimit),

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
   * @return {Array.<Object>} - an array with listings.
   */
  getListings: (searchQuery, resultsLimit, zipCode, priceFrom, priceTo) =>
    getHomeDepotListings(searchQuery, resultsLimit, zipCode, priceFrom, priceTo),

  /**
   * Get listing info from The Home Depot
   * @async
   * @param {String} link - product link;
   * @param {Number} reviewsLimit - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;
   * @param {String} zipCode - ZIP Postal code. To filter the shipping products by a selected area;
   * @return {Array.<Object>} - an array with listings.
   */
  getListingInfo: (link, zipCode) => getHomeDepotListingInfo(link, zipCode),

  /**
   * Get available params
   * @return {Object} An object with walmart stores.
   */
  getParams: () => getWalmartParams(),
};

/**
 * Save data to `.json` file
 * @param {Array | Object} data - Parsed darta;
 * @param {String} filename - Name of the `.json` file with results. Default - "parsed_results";
 */
export const saveToJSON = (data, filename) => {
  save(data, filename);
};
