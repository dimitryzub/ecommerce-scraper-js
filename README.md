<div align="center">
<p>Sponsor of the project:</p>
<div>
   <img src="https://user-images.githubusercontent.com/78694043/231375638-5bbf2989-fc7b-482a-b6fe-603d1d6d613f.svg" width="100" alt="SerpApi">
</div>
<a href="https://serpapi.com">
	<b>API to get search engine results with ease.</b>
</a>
</div>

---

<h4 align="center">
  Scrape Amazon, eBay, Walmart, Home Depot, Google Shopping from a single JS module.
</h4>

<div align="center">
   <img src="https://user-images.githubusercontent.com/78694043/231954111-99dd6d42-7683-4017-8ba2-c3f07334f808.svg" width="600" alt="ecommerce-scraper-js">
</div>

Currently supports:

- [Amazon](https://amazon.com/)
- [eBay](https://www.ebay.com/) (Soon)
- [Walmart](https://www.walmart.com/) (Soon)
- [Home Depot](https://www.homedepot.com/) (Soon)
- [Google Shopping](https://shopping.google.com/) (Soon)

## Install

Add `ecommerce-scraper-js` to your project dependency:

```bash
npm i ecommerce-scraper-js
```

## In code usage

📌Note: Only [ES modules](https://nodejs.org/api/esm.html) `import` statement is available.

Import `amazon` to your file:

```javascript
import { amazon } from "ecommerce-scraper-js";

amazon.getListings().then(console.log);
```

`amazon` available methods:

```javascript
getListings(searchQuery[, resultsLimit[, currency[, language[, priceFrom[, priceTo[, customerReviewsRating]]]]]])
getListingInfo(link[, currency[, language[, reviewsLimit]]])
getParams()
```

<details>
<summary>Full parameters list</summary>

- `searchQuery` - search query;
- `resultsLimit` - results amount you want to get. Must be a number or `Infinity`. Default - 50;
- `currency` - currency code. You can use both "text" or "code" from `getParams().currencies`;
- `language` - interface language code. You can use both "text" or "code" from `getParams().currencies`;
- `priceFrom` - min price filter value;
- `priceTo` - max price filter value;
- `customerReviewsRating` - customer review rating filter. Can be set from 1 to 4.;
- `link` - listing ling;
- `currency` - currency code. You can use both "text" or "code" from `getParams().currencies`;
- `language` - interface language code. You can use both "text" or "code" from `getParams().currencies`;
- `reviewsLimit` - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;

</details>

## Save results to JSON

Import `saveToJSON` to your file:

```javascript
import { amazon, saveToJSON } from "ecommerce-scraper-js";

amazon.getListings().then(saveToJSON);
```

`saveToJSON` arguments:

```javascript
saveToJSON(data, filename);
```

- `data` - scraped results;
- `filename` - name of the saving file. Use only a filename, because an extension is always `.json`. Default - "parsed_results".

## If you have a slow Internet connection

You can multiplicate waiting time for loading information by set `timeMultiplier` before starting the parser:

```javascript
import { amazon } from "ecommerce-scraper-js";

amazon.timeMultiplier = 2; // double Amazon load times

amazon.getListings().then(console.log);
```

## Results example

<details>
<summary>Listings results</summary>

**Amazon results**

```json
[
   {
      "title":"LEGO Star Wars Sith Troopers Battle Pack 75266 Stormtrooper Speeder Vehicle Building Kit (105 Pieces)",
      "link":"https://www.amazon.com/LEGO-Troopers-Stormtrooper-Speeder-Building/dp/B07WDD7T65/",
      "thumbnail":" https://m.media-amazon.com/images/I/81W0x0arXnL._AC_UL960_FMwebp_QL65_.jpg",
      "rating":4.8,
      "reviews":5984,
      "listingHistory":"50+ bought in past week",
      "additionalinfo2":"Only 14 left in stock - order soon.",
      "price":"$14.99"
   },
   {
      "title":"LEGO Star Wars Death Star (10188) (Discontinued by manufacturer)",
      "link":"https://www.amazon.com/LEGO-Death-10188-Discontinued-manufacturer/dp/B002EEP3NO/",
      "thumbnail":" https://m.media-amazon.com/images/I/91vIUgfOhpL._AC_UL960_FMwebp_QL65_.jpg",
      "rating":4.8,
      "reviews":802,
      "listingHistory":"800+ viewed in past week",
      "additionalinfo2":"Only 4 left in stock - order soon.",
      "price":"$1,022.00"
   },
   ... and other results
]
```

</details>

<details>
<summary>Listing info result</summary>

**Amazon results**

```json
{
   "title":"LEGO Speed Champions Koenigsegg Jesko 76900 Racing Sports Car Toy with Driver Minifigure, Racer Model Set for Kids",
   "link":"https://www.amazon.com/LEGO-Champions-Koenigsegg-Building-Pieces/dp/B08YP8S278/",
   "bage":"Amazon's  Choice",
   "productOverview":{
      "Brand":"LEGO",
      "Manufacturer Minimum Age (MONTHS)":"84.0",
      "Material":"Plastic",
      "Color":"Multicolor",
      "Educational Objective":"Creative Thinking",
      "Number of Pieces":"280",
      "Theme":"Vehicle",
      "Cartoon Character":"Koenigsegg driver",
      "Sub Brand":"speed champions",
      "Special Feature":"Construction, Collectible, Vehicles"
   },
   "features":[
      "Kids can explore one of the world’s first 300 mph supercars with their very own LEGO Speed Champions Koenigsegg Jesko racing car toy model",
      "This LEGO sports car collectible model comes with a wider 8-stud chassis which allows room for a 2-seat cockpit with space for 2 minifigures",
      "The Koenigsegg LEGO race car driver minifigure included in the set is completed with a racing suit, safety helmet and wrench",
      "The LEGO Koenigsegg Jesko racing car comes in white & black colors with green details, a black dominant tail spoiler wing & wheels protectors",
      "Kids get to explore the makeup as they build before putting it on display, it's a perfect any occasion LEGO gift for boys and girls",
      "LEGO Speed Champions model car toys give kids the chance to collect and construct mini versions of the world’s leading and automobiles"
   ],
   "productInformation":{
      "Product Dimensions":"10.32 x 5.55 x 2.84 inches",
      "Item Weight":"10.6 ounces",
      "ASIN":"B08YP8S278",
      "Item model number":"6332464",
      "Manufacturer recommended age":"7 years and up",
      "Best Sellers Rank":"#755 in Toys & Games (See Top 100 in Toys & Games)   #48 in Toy Building Sets",
      "Customer Reviews":"4.8 out of 5 stars",
      "Is Discontinued By Manufacturer":"No",
      "Release date":"August 1, 2021",
      "Department":"girls",
      "Manufacturer":"LEGO"
   },
   "buyingOptions":[
      {
         "condition":"New",
         "price":"$29.00",
         "delivery":"This item cannot be shipped to your selected delivery location. Please choose a different delivery location.",
         "shipsFrom":"Ships from United States.",
         "soldBy":{
            "seller":"Ace Books & Gifts",
            "sellerLink":"https://www.amazon.com/gp/aag/main?ie=UTF8&seller=A3EH2FGB4DMXEQ&isAmazonFulfilled=0&asin=B08YP8S278&ref_=olp_merch_name_1",
            "sellerRating":"(632 ratings) 99% positive over lifetime"
         }
      },
      {
         "condition":"New",
         "price":"$29.99",
         "delivery":"This item cannot be shipped to your selected delivery location. Please choose a different delivery location.",
         "shipsFrom":"Ships from United States.",
         "soldBy":{
            "seller":"C & M Warehouse",
            "sellerLink":"https://www.amazon.com/gp/aag/main?ie=UTF8&seller=A1252XUY4UXEVQ&isAmazonFulfilled=0&asin=B08YP8S278&ref_=olp_merch_name_2",
            "sellerRating":"(4 ratings) 100% positive over lifetime"
         }
      }
   ],
   "reviewsInfo":{
      "rating":4.8,
      "reviewsAmount":5219,
      "byFeature":{
         "Giftable":"4.7",
         "Value for money":"4.6",
         "Easy to assemble":"4.6"
      },
      "reviews":[
         {
            "name":"Ambar",
            "avatar":"https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png",
            "rating":5,
            "summary":"Me encanto",
            "dateAndPlace":"Reviewed in the United States 🇺🇸 on April 29, 2023",
            "bage":"Verified Purchase",
            "review":"Es igual que en la imagen y se arma en menos de una hora además que viene completo y con un cambio de neumáticos"
         },
         {
            "name":"Angie Baughman",
            "avatar":"https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png",
            "rating":5,
            "summary":"My son loves this",
            "dateAndPlace":"Reviewed in the United States 🇺🇸 on April 22, 2023",
            "bage":"Verified Purchase",
            "review":"My son loved this. It was easy to put together and stayed together when he played with it."
         },
          ... and other revews
      ]
   }
}
```

</details>

Please [open an issue](https://github.com/dimitryzub/ecommerce-scraper-js/issues/new) with your problem.
