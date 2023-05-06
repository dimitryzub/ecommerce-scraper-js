import getParams from "./amazon/getParams.js";
import getListingInfo from "./amazon/getListingInfo.js";
import getListings from "./amazon/getListings.js";
import save from "./helpers/fileSaver.js";

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
    getListings(
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
    getListingInfo(amazon.timeMultiplier, link, currency, language, reviewsLimit),

  /**
   * Get available languages and currencies
   * @return {Object} An object with languages and currencies.
   */
  getParams: () => getParams(),
};

/**
 * Save data to `.json` file
 * @param {Array | Object} data - Parsed darta;
 * @param {String} filename - Name of the `.json` file with results. Default - "parsed_results";
 */
export const saveToJSON = (data, filename) => {
  save(data, filename);
};
