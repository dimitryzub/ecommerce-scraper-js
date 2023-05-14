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
- [eBay](https://www.ebay.com/)
- [Home Depot](https://www.homedepot.com/)
- [Google Shopping](https://shopping.google.com/) (Soon)

## Install

Add `ecommerce-scraper-js` to your project dependency:

```bash
npm i ecommerce-scraper-js
```

## In-code usage

📌Note: Only [ES modules](https://nodejs.org/api/esm.html) `import` statement is available.

Import `amazon`, and/or `walmart`, and/or `ebay`, and/or `homeDepot` to your file:

```javascript
import { amazon, walmart, ebay, homeDepot } from "ecommerce-scraper-js";

amazon.getListings().then(console.log);
walmart.getListings().then(console.log);
ebay.getListings().then(console.log);
homeDepot.getListings().then(console.log);
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

`ebay` available methods:

```javascript
getListings(searchQuery[, resultsLimit[, country[, priceFrom[, priceTo]]]])
getListingInfo(link[, reviewsLimit[, store]])
getParams()
```

<details>
<summary>Full parameters list</summary>

- `searchQuery` - search query;
- `resultsLimit` - results amount you want to get. Must be a number or `Infinity`. Default - 40;
- `country` - ebay domain. You can use both "domain" or "country" from `getParams().countries`;
- `priceFrom` - min price filter value;
- `priceTo` - max price filter value;
- `link` - product link;
- `reviewsLimit` - parameter defines the reviews amount you want to get. Must be a number or `Infinity`. Default - 20;

</details>

`homeDepot` available methods:

```javascript
getListings(searchQuery[, resultsLimit[, zipCode[, priceFrom[, priceTo]]]])
getListingInfo(link[, zipCode])
getParams()
```

<details>
<summary>Full parameters list</summary>

- `searchQuery` - search query;
- `resultsLimit` - results amount you want to get. Must be a number or `Infinity`. Default - 40;
- `zipCode` - ZIP Postal code. To filter the shipping products by a selected area;
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

## Usage examples

Check [usage examples](https://github.com/dimitryzub/ecommerce-scraper-js/tree/main/examples) of each parser.

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

**eBay results**

```json
[
   {
      "sponsored":true,
      "title":"LEGO Star Wars: Republic Gunship (75021) complete with MiniFigs and extras ￼",
      "link":"https://www.ebay.com/itm/354766182171?epid=26053433592&hash=item5299b6571b:g:378AAOSwIl1kVlQx&amdata=enc%3AAQAIAAAA4F1hw304C4VOu1V8YsSKmi4JVISwraSvf7XNYHJ41TtjZyhrehVX2iBJgIeCq6I8ytpA0SsdWgbd3KMV3YYKro%2FW6PjS3XlYQ0dQI5cjij5QtGmJ3GrqMbxG5tLRqzH3qKbWQxDuJv80c9VAsfhuZLFVei%2BkJh8SY0Zlsx8HkkffmHT0fxCABQdFeH3f33EvruNm33bLSsPqgTSmLJ7jVpRUVaEQmxLFk3fiOnRAJLPTzZ189Qmbrw2xJMmv7s6Cx7atd7D43ZtbVQt4cXErVksCNsXZh%2FEr9nv2alseaY4q%7Ctkp%3ABFBMvNHp5_5h",
      "condition":"Pre-Owned",
      "rating":5,
      "reviews":72,
      "price":{
         "raw":"$350.00",
         "extracted":350
      },
      "shipping":{
         "raw":"+$30.00",
         "extracted":30
      },
      "thumbnail":"https://i.ebayimg.com/thumbs/images/g/378AAOSwIl1kVlQx/s-l300.jpg",
      "watchers":"17 watchers",
      "extracted_watchers":17
   },
   {
      "sponsored":true,
      "title":"LEGO STAR WARS: The Mandalorian’s N-1 Starfighter (75325) - 412 pieces",
      "link":"https://www.ebay.com/itm/155541492108?epid=22057119293&hash=item2436fed18c:g:-toAAOSwAUlkVsxL&amdata=enc%3AAQAIAAAA4H7u%2FGXyEzbXCcMPWS6It1LuUsYJk3PICAwqksANkIVqkdukXd4OXIJ%2FdvDxHzISVZmMN7UUi9whj1XQSyY%2B%2FO7lz%2FsbFTUwM2ubDQMgAOtJh57WOmxndlFTGL0Jz8yWHHlUf%2B0Ox0Lx%2FbHHRH5YHuf70ciY96IEn8r0%2Fk3mfnlDzGvDYmG4xPc2bUJEukXHDd%2Fk975h7%2FAW0hI09CpVISq2xyUY%2FP9wkPUwt11ZZQ3bBi1bxmqowGjqIFdE7nSe8vlI0V5GctHApkY7pdXeu79yrBNHS%2BwDjaaI4Jml47oM%7Ctkp%3ABFBMvNHp5_5h",
      "condition":"Brand New",
      "rating":5,
      "reviews":3,
      "price":{
         "raw":"$46.99",
         "extracted":46.99
      },
      "shipping":"Free shipping",
      "thumbnail":"https://i.ebayimg.com/thumbs/images/g/-toAAOSwAUlkVsxL/s-l300.jpg",
      "watchers":"11 watchers",
      "extracted_watchers":11
   },
   ... and other results
]
```

**The Home Depot results**

```json
[
   {
      "position":1,
      "title":"Coffee Variety Pack Assorted Roast Single Serve Coffee Pods for Keurig K-Cup Brewers (96 Count)",
      "thumbnails":[
         [
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_65.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_100.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_145.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_300.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_400.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_600.jpg",
            "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_1000.jpg"
         ]
      ],
      "link":"https://www.homedepot.com/p/Victor-Allen-s-Coffee-Variety-Pack-Assorted-Roast-Single-Serve-Coffee-Pods-for-Keurig-K-Cup-Brewers-96-Count-FG014721/206090598",
      "model_number":"FG014721",
      "brand":"Victor Allen's",
      "collection":"https://www.homedepot.com",
      "favorite":126,
      "rating":4.5098,
      "reviews":153,
      "price":45.99,
      "delivery":{
         "free":true,
         "free_delivery_threshold":false
      },
      "pickup":{
         "free_ship_to_store":true
      }
   },
   {
      "position":2,
      "title":"Decaf Coffee Variety Pack Assorted Roast Single Serve Coffee Pods for Keurig K-Cup Brewers (54 Count)",
      "thumbnails":[
         [
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_65.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_100.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_145.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_300.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_400.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_600.jpg",
            "https://images.thdstatic.com/productImages/9e9cef0b-2fcb-4f53-8e16-e33e6e630abc/svn/victor-allen-s-coffee-pods-k-cups-fg014841-64_1000.jpg"
         ]
      ],
      "link":"https://www.homedepot.com/p/Victor-Allen-s-Decaf-Coffee-Variety-Pack-Assorted-Roast-Single-Serve-Coffee-Pods-for-Keurig-K-Cup-Brewers-54-Count-FG014841/301692319",
      "model_number":"FG014841",
      "brand":"Victor Allen's",
      "collection":"https://www.homedepot.com",
      "favorite":21,
      "rating":4.7222,
      "reviews":18,
      "price":29.89,
      "delivery":{
         "free":true,
         "free_delivery_threshold":false
      },
      "pickup":{
         "free_ship_to_store":true
      }
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

**eBay results**

```json
{
   "title":"LEGO Star Wars: Millennium Falcon (7965)",
   "link":"https://www.ebay.com/itm/166078319248?_trkparms=amclksrc%3DITM%26aid%3D1110002%26algo%3DSPLICE.SOI%26ao%3D1%26asc%3D20220920135751%26meid%3D7631bf0d3cab473baef9eb34af838066%26pid%3D101198%26rk%3D3%26rkt%3D11%26sd%3D166078332108%26itm%3D166078319248%26pmt%3D1%26noa%3D0%26pg%3D2047675%26algv%3DPromotedSellersOtherItemsV2%26brand%3DLEGO&_trksid=p2047675.c101198.m1985&amdata=cksum%3A1660783192487631bf0d3cab473baef9eb34af838066%7Cenc%3AAQAIAAABAA%252FERGDg2E0SMW9DhE0lxtZtFGRhG0a3KvJyqee%252BSYjljuvVrq8H0zA9qnJFBkYpLJIiHlbsJ8bDc1s2UrYmm4IAo0TLWn2vKS%252BSllr%252Fb19pYBvZpt2KiUn61NbqCQkf0HSJY8thQ2634o8kwGk6RB1f0QStbmDqP8KZ%252FOJjwBCflfHhALBMnpcjjvi8mJHf2eXlzdJD4hLYm6majw4iz7uRBJTyiEwADgOsjGtNaB01Qyi%252FWaBq95%252B6dcCp6%252B%252Bi0u97iP4N7VR5ITASzLVeHa%252BV%252BkrPpjWhrMb5H7pdlgh7aUS%252Bmp%252BgkPJ9aPiRmb8CWuOfWHbh0b4dT2GM4xJcr0s%253D%7Campid%3APL_CLK%7Cclp%3A2047675&epid=22053423850#rwid",
   "condition":"New",
   "price":"US $230.00",
   "itemSpecifics":{
      "Condition":"New: A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is ...  Read moreabout the condition",
      "Brand":"LEGO",
      "LEGO Set Number":"7965",
      "Release Year":"2011",
      "LEGO Set Name":"Millennium Falcon",
      "MPN":"7965",
      "Age Level":"9-14"
   },
   "aboutProduct":{
      "About this product":{
         "Brand":"LEGO",
         "MPN":"7965",
         "Ean":"5702014736955",
         "UPC":"0673419145909",
         "eBay Product ID (ePID)":"22053423850",
         "Age Level":"9-14",
         "LEGO Theme":"Star Wars",
         "Number of Pieces":"1254",
         "Release Year":"2011",
         "LEGO Set Number":"7965",
         "Type":"Complete Set",
         "LEGO Set Name":"Millennium Falcon",
         "Item Length":"22.9 in",
         "Item Height":"3.4 in",
         "Item Width":"14.9 in",
         "Launch Date":"7/19/2011"
      }
   },
   "description":"LEGO Star Wars: Millennium Falcon (7965).",
   "reviewsInfo":{
      "rating":4.8,
      "reviewsAmount":91,
      "reviews":[
         {
            "name":"goldbork",
            "rating":5,
            "headeeng":"Excellent, faithful adaptation of an iconic spaceship",
            "date":"Jan 22, 2016",
            "bage":"Top favorable review",
            "review":"I got mine used, so it invovled quite a bit more work to get setup than it would with a new set, but since there's a lot of repetition in the directions, it was surprisingly easy and less time consuming to put together than expected. Still, a lot of fun and great to have all the minifigure characters and accessories."
         },
         {
            "name":"walkersutterfie...",
            "rating":3,
            "headeeng":"Missing pieces.",
            "date":"Aug 05, 2020",
            "bage":"Top critical review",
            "review":"Set is about 99-98% complete, but was definitely missing 20 or so integral pieces to the build. Have a lot of scrap pieces and fixed it up, but just wish it was a little much more complete."
         },
      ... and other reviews
      ]
   }
}
```

**The Home Depot results**

```json
{
   "title":"Coffee Variety Pack Assorted Roast Single Serve Coffee Pods for Keurig K-Cup Brewers (96 Count)",
   "description":"Victor Allen's Coffee's Variety Pack includes a mix of our most popular blends! A unique combination of our favorite light, medium and dark roasts, there is sure to
be a favorite for everyone! Morning Blend (a light body brew known for its even-keeled flavor profile and smooth finish). 100% Colombian (coffee beans exclusively from the top coffee farms in South America). Donut Shop Blend (a no frills, medium roast brew for the coffee purist). French Roast (velvety body with a soft, smoky flavor; intensely rich but always smooth).",
   "link":"https://www.homedepot.com/p/Victor-Allen-s-Coffee-Variety-Pack-Assorted-Roast-Single-Serve-Coffee-Pods-for-Keurig-K-Cup-Brewers-96-Count-FG014721/206090598",
   "model_number":"FG014721",
   "favorite":126,
   "rating":"4.5098",
   "reviews":"153",
   "price":45.99,
   "highlights":[
      "96 Single serve coffee pods",
      "One of our most popular variety packs",
      "100% Arabica coffee, gluten-free and non-GMO"
   ],
   "brand":{
      "name":"Victor Allen's",
      "link":"https://www.homedepot.com/b/Food-Gifts-Beverages-Coffee-Coffee-Pods-K-Cups/Victor-Allens/N-5yc1vZc6afZnig"
   },
   "images":[
      [
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_65.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_100.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_145.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_300.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_400.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_600.jpg",
         "https://images.thdstatic.com/productImages/b7cd2231-c562-4765-986f-e9501ec0359b/svn/victor-allen-s-coffee-pods-k-cups-fg014721-64_1000.jpg"
      ],
      [
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_65.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_100.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_145.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_300.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_400.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_600.jpg",
         "https://images.thdstatic.com/productImages/b8676195-9269-4153-8429-25389f377a83/svn/victor-allen-s-coffee-pods-k-cups-fg014721-1d_1000.jpg"
      ],
      ... and other images
   ],
   "bullets":[
      "COUNT: Includes 96 Single Serve Coffee Pods for Keurig K-Cup Brewers (24 OF EACH: Morning Blend, 100% Colombian, Donut Shop Blend, and French Roast)",
      "ROAST: A mix of light, full bodied medium (smooth and robust) and dark (robust and bold) roasts",
      "FLAVOR PROFILE: Morning Blend: Mild and satisfying with a subtle kick, striking a perfect balance between the quiet you want and the jolt you know you need to get moving in the morning; Donut Shop Blend: this classic brew is sweet and smooth, striking the perfect balance between mellow and bold, to deliver just enough bite to brighten your day; 100% Colombian: Lively and bright, starting rich and warmly aromatic-but landing softly with its mild acidity; French Roast: A velvety body with a soft, smoky flavor; intensely rich but always smooth",
      "100% Gluten Free & Non-GMO: Our coffee products do not contain gluten or genetically modified ingredients",
      "BRAND STORY: Since 1979 Victor Allen has been proud to bring you high-quality, roaster-fresh perfection. We source 100% Arabica beans from all over the world and use precision
roasting techniques to guarantee the very best coffee",
      "INGREDIENTS: 100% Arabica coffee",
      "CAFFEINE CONTENT: Victor Allen's coffees range from 90-150 mgs per serving",
      "SELECTION: Victor Allen's offers a wide selection of beverage choices from light, medium and dark roasts to everyday and seasonal flavors, in bagged, single serve and ready to
drink formats.",
      "HOW TO BREW RECOMMENDATIONS:STEP ONE: load your single serve cup into your brewerSTEP TWO: select the 8-floz setting on your brewer for the best tasteSTEP THREE: to prevent dripping upon completion of brewing carefully tilt the single serve cup upon removal from your brewerSTEP FOUR: Enjoy your precision roasted Victor Allen's Coffee",
      "COMPATIBILITY: For use in all single serve brewing systems, including Keurig 2.0",
      "Single Serve coffee pods for Keurig K-Cup Brewers. Keurig is a registered trademark of KEURIG GREEN MOUNTAIN, INC. K-Cups is a registered trademark of KEURIG GREEN MOUNTAIN, INC."
   ],
   "specifications":[
      {
         "key":"Details",
         "value":[
            {
               "name":"Brand Compatibility",
               "value":"Keurig"
            },
            {
               "name":"Caffeination Type",
               "value":"Regular"
            },
            {
               "name":"Coffee/Tea Type",
               "value":"Pods/K cups"
            },
            {
               "name":"Diet & Allergens",
               "value":"Not Applicable"
            },
            {
               "name":"Flavor",
               "value":"Variety Pack"
            },
            {
               "name":"Food & Beverage Product Type",
               "value":"Beverages"
            },
            {
               "name":"Package Quantity",
               "value":"96"
            },
            {
               "name":"Product volume (fl. oz.)",
               "value":"8"
            },
            {
               "name":"Returnable",
               "value":"90-Day"
            }
         ]
      }
   ],
   "fulfillment":{
      "countity":100,
      "store":"Bangor",
      "options":[
         {
            "type":"Ship to Home",
            "title":"Get it by",
            "arrival_time":[
               "May 18",
               "May 18"
            ],
            "bottom":"Free delivery"
         },
         {
            "type":"Schedule delivery",
            "title":"Not available for this item"
         },
         {
            "type":"Ship to store",
            "title":"Pickup",
            "arrival_time":[
               "May 18",
               "May 19"
            ],
            "bottom":"FREE"
         }
      ]
   }
}
```

</details>

Please [open an issue](https://github.com/dimitryzub/ecommerce-scraper-js/issues/new) with your problem.
