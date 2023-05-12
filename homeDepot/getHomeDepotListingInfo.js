import serpapi from "../helpers/serpapiHandler.js";

const getHomeDepotListingInfo = async (link, zipCode) => {
  const zipPattern1 = /^\d{5}$/g;
  const zipPattern2 = /^\d{5}-\d{4}$/g;
  if (zipCode && !zipPattern1.test(zipCode) && !zipPattern2.test(zipCode)) {
    throw new Error(`Please set correct ZIP code.`);
  }

  const parsedId =
    [...link?.toString()?.matchAll(/^.+\/(?<id1>\d+$)|\/(?<id2>\d+)\?/gm)].map(
      ({ groups }) => groups.id1 || groups.id2
    )[0] || undefined;

  if (!parsedId) {
    throw new Error(`Please set correct product link`);
  }

  const productParams = {
    product_id: parsedId,
    delivery_zip: zipCode || undefined,
  };

  const { product_results, error } = await serpapi("home_depot_product", productParams);

  if (!product_results || error) {
    return `Error: ${error ? error : "unhandled error"}`;
  }

  const newResult = { ...product_results };
  delete newResult.product_id;
  delete newResult.upc;

  const result = newResult;

  return result;
};

export default getHomeDepotListingInfo;
