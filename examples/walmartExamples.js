import { walmart } from "ecommerce-scraper-js";

const stores = ["4701 Mission Rd, Westwood, KS 66205", "2490"];

// get 100 listings
walmart.getListings("coffee", 100).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings with provided store
walmart.getListings("lego", undefined, stores[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

walmart.getListings("lego", undefined, stores[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// price params
walmart.getListings("playstation", undefined, undefined, 800, 1200).then((result) => {
  console.dir(
    result.map((el) => el.primary_offer.offer_price),
    { depth: null }
  );
  console.log(result.length);
});

// listing info
walmart
  .getListingInfo(
    "https://www.walmart.com/ip/LEGO-Speed-Champions-76895-Ferrari-F8-Tributo-Racing-Model-Car-Vehicle-Building-Car-275-pieces/796456924"
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviews.length);
  });

walmart
  .getListingInfo(
    "https://www.walmart.com/ip/LEGO-Speed-Champions-76895-Ferrari-F8-Tributo-Racing-Model-Car-Vehicle-Building-Car-275-pieces/796456924",
    41
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviews.length);
  });
