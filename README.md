<div align="center">
<p>Sponsor of the project:</p>
<div>
   <img src="https://user-images.githubusercontent.com/78694043/231375638-5bbf2989-fc7b-482a-b6fe-603d1d6d613f.svg" width="60" alt="SerpApi">
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
- [Walmart](https://www.walmart.com/)
- [eBay](https://www.ebay.com/) (Soon)
- [Home Depot](https://www.homedepot.com/) (Soon)
- [Google Shopping](https://shopping.google.com/) (Soon)

## Install

Add `ecommerce-scraper-js` to your project dependency:

```bash
npm i ecommerce-scraper-js
```

## In-code usage

📌Note: Only [ES modules](https://nodejs.org/api/esm.html) `import` statement is available.

Import `amazon` and/or `walmart` to your file:

```javascript
import { amazon, walmart } from "ecommerce-scraper-js";

amazon.getListings().then(console.log);
walmart.getListings().then(console.log);
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
- `link` - listing link;
- `reviewsLimit` - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 10;

</details>

`walmart` available methods:

```javascript
getListings(searchQuery[, resultsLimit[, store[, priceFrom[, priceTo]]]])
getListingInfo(link[, reviewsLimit[, store]])
getParams()
```

<details>
<summary>Full parameters list</summary>

- `searchQuery` - search query;
- `resultsLimit` - results amount you want to get. Must be a number or `Infinity`. Default - 40;
- `store` - specific store code. You can use both "store_id" or "address" from `getParams().stores`;
- `priceFrom` - min price filter value;
- `priceTo` - max price filter value;
- `link` - product link;
- `reviewsLimit` - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 20;

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

**Walmart results**

```json
[
   {
      "title":"LEGO Star Wars Galactic Adventures Pack 66708 3-in-1 Building Toy Gift Set (901 pieces)",
      "description":"Explore a world of action-adventure with 3 LEGO sets: 75310 LEGO Star Wars Duel on Mandalore, 75311 LEGO Star Wars Imperial Armored Marauder, and 75299 LEGO Star Wars Trouble on Tatooine (902 pcs",
      "thumbnail":"https://i5.walmartimages.com/asr/c4ca4508-441d-4e2b-8a50-93fa7ffc6129.bf983828b50f077083a345e6646951c6.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
      "rating":4.8,
      "reviews":30,
      "seller_name":"Toys Remembered",
      "fulfillment_badges":[
         "3+ day shipping"
      ],
      "two_day_shipping":false,
      "out_of_stock":false,
      "sponsored":false,
      "muliple_options_available":false,
      "primary_offer":{
         "offer_price":110,
         "min_price":0
      },
      "price_per_unit":{
         "unit":"each"
      },
      "product_page_url":"https://www.walmart.com/ip/LEGO-Star-Wars-Galactic-Adventures-Pack-66708-3-in-1-Building-Toy-Gift-Set-901-pieces/547111799"
   },
   {
      "title":"LEGO Star Wars: The Clone Wars Duel on Mandalore 75310 Building Toy Featuring Ahsoka Tano and Darth Maul (147 Pieces)",
      "description":"Kids will love recreating epic lightsaber battles from Star Wars: The Clone Wars and playing out their own action-packed stories with this Duel on Mandalore (75310) building toyIncludes 2",
      "thumbnail":"https://i5.walmartimages.com/asr/8038ca51-c834-484c-abeb-d9caad15904c.9aa4d71e55fbd347f723735814159bd0.jpeg?odnHeight=180&odnWidth=180&odnBg=ffffff",
      "rating":4.6,
      "reviews":35,
      "seller_name":"reVend",
      "fulfillment_badges":[
         "3+ day shipping"
      ],
      "two_day_shipping":false,
      "out_of_stock":false,
      "sponsored":false,
      "muliple_options_available":false,
      "primary_offer":{
         "offer_price":44.99,
         "min_price":0
      },
      "price_per_unit":{
         "unit":"each"
      },
      "product_page_url":"https://www.walmart.com/ip/LEGO-Star-Wars-The-Clone-Wars-Duel-on-Mandalore-75310-Building-Toy-Featuring-Ahsoka-Tano-and-Darth-Maul-147-Pieces/208868538"
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

**Walmart results**

```json
{
   "title":"LEGO Star Wars Imperial Shuttle 75302 Building Toy (660 Pieces)",
   "short_description_html":"Fans can play out exciting scenes from the classic Star Wars trilogy with this buildable Imperial Shuttle (75302) model. The elegant design of the shuttle is beautifully recreated in LEGO bricks, with an opening minifigure cockpit, opening main compartment with space for 2 LEGO minifigures, foldable wings for flight and landing mode, plus 2 stud shooters. Between playtime adventures, it makes a cool display piece. This awesome building toy for kids also includes Darth Vader, Imperial Officer and Luke Skywalker
LEGO minifigures with lightsabers and a blaster pistol. The LEGO Group has been recreating iconic starships, vehicles, locations and characters from the Star Wars universe since 1999. LEGO Star Wars is now its most successful theme, with fun, creative gift ideas for fans of all ages.",
   "detailed_description_html":"<ul>  <li>Build a LEGO brick version of the elegant Imperial Shuttle and play out scenes from the classic Star Wars trilogy with this action-packed building toy for kids (75302)</li>  <li>Includes 3 LEGO minifigures – Darth Vader and Luke Skywalker, both with a lightsaber, and an Imperial Officer with a blaster pistol, plus a handcuffs accessory element – for fun, creative play</li>  <li>The Imperial Shuttle features an opening minifigure cockpit, opening main compartment with space for 2 LEGO minifigures, foldable wings for flight and landing mode, plus 2 stud shooters</li>  <li>This awesome building toy makes the best birthday, holiday or surprise gift for kids and any Star Wars fan
aged 9 and up. It’s fun to build and play with solo or with family and friends</li>  <li>The Imperial Shuttle measures over 10 in. (25 cm) high, 9 in. (24 cm) long and 14 in. (35 cm) wide. Kids will be proud to display their creation in their bedroom between playtime adventures</li> </ul>",
   "categories":[
      {
         "name":"Toys",
         "url":"https://www.walmart.com/cp/toys/4171"
      },
      {
         "name":"Building Sets & Blocks",
         "url":"https://www.walmart.com/cp/building-sets-blocks/4186"
      },
      {
         "name":"LEGO",
         "url":"https://www.walmart.com/cp/lego/1105635"
      },
      {
         "name":"All LEGO Sets",
         "url":"https://www.walmart.com/cp/all-lego-sets/2927326"
      }
   ],
   "seller_name":"Toys Remembered",
   "specification_highlights":[
      {
         "key":"Features",
         "value":"Interlocking",
         "display_name":"Features"
      },
      {
         "key":"Brand",
         "value":"LEGO",
         "display_name":"Brand"
      },
      {
         "key":"Age Range",
         "value":"9 years & Up",
         "display_name":"Age Range"
      },
      {
         "key":"Assembled Product Weight",
         "value":"2.425 lb",
         "display_name":"Assembled Product Weight"
      },
      {
         "key":"Color",
         "value":"Multicolor",
         "display_name":"Color"
      },
      {
         "key":"Assembled Product Dimensions (L x W x H)",
         "value":"13.94 x 14.88 x 2.78 Inches",
         "display_name":"Assembled Product Dimensions (L x W x H)"
      }
   ],
   "manufacture_number":"6332973",
   "product_type":"Interlocking Block Building Sets",
   "manufacturer":"LEGO",
   "product_page_url":"https://www.walmart.com/ip/LEGO-Star-Wars-Imperial-Shuttle-75302-Building-Toy-660-Pieces/143546709",
   "price_map":{
      "price":113,
      "currency":"USD"
   },
   "min_quantity":1,
   "max_quantity":1,
   "in_stock":true,
   "images":[
      "https://i5.walmartimages.com/asr/fc5ffb3a-d242-4872-ae88-5829ea23d8eb.c821af8b41036dd58efac9a63fb49525.jpeg",
      "https://i5.walmartimages.com/asr/acb06113-67da-416f-9d6e-b32e0264735a.3fc7b293d62a09caf1766ee32027357c.jpeg",
      "https://i5.walmartimages.com/asr/d836b3de-8c1b-44d1-bdb0-fd2f5563de39.87a9bd427aa4969515504c216c0cd0fa.jpeg",
      "https://i5.walmartimages.com/asr/be0c7d77-bd42-4c22-8dd7-37f37130cdd1.2efeda6fdb9a9979038bea687534a62e.jpeg",
      "https://i5.walmartimages.com/asr/573b2e3d-f0e7-41d4-90f2-bae78d2423ca.69deb421014a5c4c0da2b1d48541c7cd.jpeg"
   ],
   "rating":4.5,
   "offer_type":"ONLINE_ONLY",
   "offers":[
      {
         "seller_name":"Charles Harwick Jr",
         "seller_display_name":"Toys Remembered",
         "price":113
      }
   ],
   "shipping_price":0,
   "delivery_option":{
      "ship_method":"THREE_TO_FIVE_DAY",
      "display_arrival_date":"2023-05-15T19:00:00.000Z"
   },
   "ship_method":"THREE_TO_FIVE_DAY",
   "display_arrival_date":"2023-05-15T19:00:00.000Z",
   "revewsAmount":117,
   "reviews":[
      {
         "position":1,
         "title":"Good with some mods",
         "text":"This is a great set to do some modifications.  The platform is a good base, but use 2Brickofficial for the cockpit, back area, cannons, etc. (on Youtube way better and
same functionality).  I then modded the main fin to make the shape right.  It looks awesome now and has all the same functionality.",
         "rating":5,
         "positive_feedback":0,
         "negative_feedback":0,
         "review_submission_time":"8/15/2022",
         "user_nickname":"adg2758"
      },
      {
         "position":2,
         "title":"Good but could be better",
         "text":"An excellent experience both building and playing Grateful for people Star wars and Get into that Lego star wars experience",
         "rating":5,
         "positive_feedback":0,
         "negative_feedback":0,
         "review_submission_time":"9/25/2022",
         "user_nickname":"IcyTeeth073"
      },
      ... and other reviews
   ]
}
```

</details>

Please [open an issue](https://github.com/dimitryzub/ecommerce-scraper-js/issues/new) with your problem.
