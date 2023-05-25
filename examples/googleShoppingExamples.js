import { googleShopping } from "ecommerce-scraper-js";

const domains = ["google.de", "Turkey"];

const countries = ["Ukraine", "it"];

const languages = ["zh-cn", "Japanese"];

// get 100 listings
googleShopping.getListings("coffee", 100).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings with provided domains
googleShopping.getListings("lego", undefined, undefined, undefined, domains[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

googleShopping.getListings("lego", undefined, undefined, undefined, domains[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings with provided countries and languages
googleShopping
  .getListings("lego", undefined, undefined, undefined, domains[0], countries[0], languages[0])
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.length);
  });

googleShopping
  .getListings("lego", undefined, undefined, undefined, domains[1], countries[1], languages[1])
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.length);
  });

// price params
googleShopping.getListings("playstation", undefined, 800, 1200).then((result) => {
  console.dir(
    result.map((el) => el.price),
    { depth: null }
  );
  console.log(result.length);
});

// listing info
googleShopping
  .getListingInfo("https://www.google.com/shopping/product/6892257970961887346?gl=us")
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviews.length);
  });

googleShopping
  .getListingInfo("https://www.google.de/shopping/product/3343461477840129075?gl=ua", 41)
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviews.length);
  });
