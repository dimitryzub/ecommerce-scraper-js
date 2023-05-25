import { homeDepot } from "ecommerce-scraper-js";

const zipCodes = ["90210", "20001"];

// get 100 listings
homeDepot.getListings("coffee", 100).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings with provided ZIP code
homeDepot.getListings("sofa", undefined, zipCodes[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

homeDepot.getListings("sofa", undefined, zipCodes[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// price params
homeDepot.getListings("table", undefined, undefined, 800, 1200).then((result) => {
  console.dir(
    result.map((el) => el.price),
    { depth: null }
  );
  console.log(result.length);
});

// listing info
homeDepot
  .getListingInfo(
    "https://www.homedepot.com/p/Community-Coffee-Colombia-Altura-Medium-Dark-Roast-Single-Serve-Cups-96-Pack-16407/313554498"
  )
  .then((result) => {
    console.dir(result, { depth: null });
  });
