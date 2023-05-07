import currencies from "./currencies.js";
import languages from "./languages.js";

const getAmazonParams = () => {
  return { currencies, languages };
};

export default getAmazonParams;
