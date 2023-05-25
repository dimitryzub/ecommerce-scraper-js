import { ebay } from "ecommerce-scraper-js";

const countries = ["ebay.it", "Canada", "ebay.pl"];

// get 100 listings
ebay.getListings("coffee", 100).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// get listings in 3 countries
ebay.getListings("lego", undefined, countries[0]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

ebay.getListings("lego", undefined, countries[1]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

ebay.getListings("lego", undefined, countries[2]).then((result) => {
  console.dir(result, { depth: null });
  console.log(result.length);
});

// price params
ebay.getListings("playstation", undefined, undefined, 800, 1200).then((result) => {
  console.dir(
    result.map((el) => el.price),
    { depth: null }
  );
  console.log(result.length);
});

// listing info
ebay
  .getListingInfo(
    "https://www.ebay.com/itm/166078319248?_trkparms=amclksrc%3DITM%26aid%3D1110002%26algo%3DSPLICE.SOI%26ao%3D1%26asc%3D20220920135751%26meid%3D7631bf0d3cab473baef9eb34af838066%26pid%3D101198%26rk%3D3%26rkt%3D11%26sd%3D166078332108%26itm%3D166078319248%26pmt%3D1%26noa%3D0%26pg%3D2047675%26algv%3DPromotedSellersOtherItemsV2%26brand%3DLEGO&_trksid=p2047675.c101198.m1985&amdata=cksum%3A1660783192487631bf0d3cab473baef9eb34af838066%7Cenc%3AAQAIAAABAA%252FERGDg2E0SMW9DhE0lxtZtFGRhG0a3KvJyqee%252BSYjljuvVrq8H0zA9qnJFBkYpLJIiHlbsJ8bDc1s2UrYmm4IAo0TLWn2vKS%252BSllr%252Fb19pYBvZpt2KiUn61NbqCQkf0HSJY8thQ2634o8kwGk6RB1f0QStbmDqP8KZ%252FOJjwBCflfHhALBMnpcjjvi8mJHf2eXlzdJD4hLYm6majw4iz7uRBJTyiEwADgOsjGtNaB01Qyi%252FWaBq95%252B6dcCp6%252B%252Bi0u97iP4N7VR5ITASzLVeHa%252BV%252BkrPpjWhrMb5H7pdlgh7aUS%252Bmp%252BgkPJ9aPiRmb8CWuOfWHbh0b4dT2GM4xJcr0s%253D%7Campid%3APL_CLK%7Cclp%3A2047675&epid=22053423850#rwid"
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviewsInfo.reviews.length);
  });

ebay
  .getListingInfo(
    "https://www.ebay.com/itm/166078319248?_trkparms=amclksrc%3DITM%26aid%3D1110002%26algo%3DSPLICE.SOI%26ao%3D1%26asc%3D20220920135751%26meid%3D7631bf0d3cab473baef9eb34af838066%26pid%3D101198%26rk%3D3%26rkt%3D11%26sd%3D166078332108%26itm%3D166078319248%26pmt%3D1%26noa%3D0%26pg%3D2047675%26algv%3DPromotedSellersOtherItemsV2%26brand%3DLEGO&_trksid=p2047675.c101198.m1985&amdata=cksum%3A1660783192487631bf0d3cab473baef9eb34af838066%7Cenc%3AAQAIAAABAA%252FERGDg2E0SMW9DhE0lxtZtFGRhG0a3KvJyqee%252BSYjljuvVrq8H0zA9qnJFBkYpLJIiHlbsJ8bDc1s2UrYmm4IAo0TLWn2vKS%252BSllr%252Fb19pYBvZpt2KiUn61NbqCQkf0HSJY8thQ2634o8kwGk6RB1f0QStbmDqP8KZ%252FOJjwBCflfHhALBMnpcjjvi8mJHf2eXlzdJD4hLYm6majw4iz7uRBJTyiEwADgOsjGtNaB01Qyi%252FWaBq95%252B6dcCp6%252B%252Bi0u97iP4N7VR5ITASzLVeHa%252BV%252BkrPpjWhrMb5H7pdlgh7aUS%252Bmp%252BgkPJ9aPiRmb8CWuOfWHbh0b4dT2GM4xJcr0s%253D%7Campid%3APL_CLK%7Cclp%3A2047675&epid=22053423850#rwid",
    41
  )
  .then((result) => {
    console.dir(result, { depth: null });
    console.log(result.reviewsInfo.reviews.length);
  });
