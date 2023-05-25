import { amazon } from "ecommerce-scraper-js";

const languages = ["español", "ko_KR", "中文 (繁體)"];

const currencies = ["Moroccan Dirham", "NOK", "New Zealand Dollar"];

// get 100 listings
amazon.getListings("coffee", 100).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings in 3 languages
amazon.getListings("lego", undefined, undefined, languages[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

amazon.getListings("lego", undefined, undefined, languages[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

amazon.getListings("lego", undefined, undefined, languages[2]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings with 3 currencies
amazon.getListings("tea", undefined, currencies[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

amazon.getListings("tea", undefined, currencies[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

amazon.getListings("tea", undefined, currencies[2]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// other params
amazon.getListings("playstation", undefined, undefined, undefined, 800, 1200).then((result) => {
  console.dir(
    result.map((el) => el.price),
    { depth: null }
  );
  console.log(result.length);
});

amazon
  .getListings("motor oil", undefined, undefined, undefined, undefined, undefined, 1)
  .then((result) => {
    console.dir(
      result.map((el) => el.rating),
      { depth: null }
    );
    console.log(result.length);
  });

amazon
  .getListings("motor oil", undefined, undefined, undefined, undefined, undefined, 4)
  .then((result) => {
    console.dir(
      result.map((el) => el.rating),
      { depth: null }
    );
    console.log(result.length);
  });

// listing info
amazon
  .getListingInfo(
    "https://www.amazon.com/playstation-ps5-console-ragnar%C3%B6k-bundle-5/dp/B0BHC395WW/"
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviewsInfo.reviews.length);
  });

amazon
  .getListingInfo(
    "https://www.amazon.com/LEGO-Champions-Koenigsegg-Building-Pieces/dp/B08YP8S278/",
    "CAD",
    "Deutsch",
    84
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviewsInfo.reviews.length);
  });
