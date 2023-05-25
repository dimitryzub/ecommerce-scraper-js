import { countries } from "./countries.js";
import { languages } from "./languages.js";
import { domains } from "./domains.js";

const getGoogleShoppingParams = () => {
  return { countries, languages, domains };
};

export default getGoogleShoppingParams;
