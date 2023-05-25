import serpapi from "../helpers/serpapiHandler.js";

const getHomeDepotListings = async (query, limit = 40, zipCode, priceFrom, priceTo) => {
  const zipPattern1 = /^\d{5}$/g;
  const zipPattern2 = /^\d{5}-\d{4}$/g;
  if (zipCode && !zipPattern1.test(zipCode) && !zipPattern2.test(zipCode)) {
    throw new Error(`Please set correct ZIP code.`);
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
    device: "desktop",
    q: query,
    delivery_zip: zipCode || undefined,
    lowerbound: priceFrom || undefined,
    upperbound: priceTo || undefined,
    page: 1,
  };

  const results = [];
  while (results.length < limit) {
    try {
      const { products } = await serpapi("home_depot", params);
      if (!products || !products.length) break;
      results.push(...products);
      params.page += 1;
    } catch (err) {
      console.log(err);
      break;
    }
  }

  return results.slice(0, limit).map((el) => {
    const newResult = { ...el };
    delete newResult.product_id;
    delete newResult.serpapi_link;
    return newResult;
  });
};

export default getHomeDepotListings;
