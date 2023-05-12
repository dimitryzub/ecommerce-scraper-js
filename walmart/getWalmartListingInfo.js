import serpapi from "../helpers/serpapiHandler.js";
import getWalmartParams from "./getWalmartParams.js";

const getWalmartListingsInfo = async (link, limit = 20, store) => {
  const { stores } = getWalmartParams();

  const storeId = stores.find((el) => el.store_id === store || el.address === store)?.store_id;
  if (store && !storeId) {
    throw new Error(
      `Please select available store (use "getParams().stores" to get all stores list).`
    );
  }

  const parsedId =
    [...link?.toString()?.matchAll(/^.+\/(?<id1>\d+$)|\/(?<id2>\d+)\?/gm)].map(
      ({ groups }) => groups.id1 || groups.id2
    )[0] || undefined;

  if (!parsedId) {
    throw new Error(`Please set correct product link`);
  }

  const productParams = {
    device: "desktop",
    product_id: parsedId,
    store_id: storeId || undefined,
  };

  const { product_result, error } = await serpapi("walmart_product", productParams);

  if (!product_result || error) {
    return `Error: ${error ? error : "unhandled error"}`;
  }

  const newResult = {
    ...product_result,
    offers: [...product_result.offers],
    ...(product_result.delivery_option ? { ...product_result.delivery_option } : {}),
  };
  delete newResult.product_id;
  delete newResult.us_item_id;
  delete newResult.upc;
  delete newResult.seller_id;
  delete newResult.reviews;
  delete newResult.product_type_id;
  delete newResult.offer_id;
  delete newResult.arrival_date;
  delete newResult.delivery_option?.arrival_date;
  newResult.offers = newResult.offers?.map((el) => {
    const newOffer = { ...el };
    delete newOffer.seller_id;
    delete newOffer.catalog_seller_id;
    return newOffer;
  });

  const result = newResult;

  if (result.rating) {
    const reviewsResult = [];
    let revewsAmount;

    const reviewsParams = {
      product_id: parsedId,
      store_id: storeId || undefined,
      page: 1,
    };

    while (reviewsResult.length < limit) {
      try {
        const { reviews, total_count } = await serpapi("walmart_product_reviews", reviewsParams);
        if (!reviews || !reviews.length) break;
        revewsAmount = total_count;
        reviewsResult.push(...reviews);
        reviewsParams.page += 1;
      } catch (err) {
        console.log(err);
        break;
      }
    }
    result.revewsAmount = revewsAmount;
    result.reviews = reviewsResult.slice(0, limit);
  }

  return result;
};

export default getWalmartListingsInfo;
