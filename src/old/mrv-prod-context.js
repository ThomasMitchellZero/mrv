import React from "react";
import faucet_img from "../assets/product-images/faucet.png";
import flowers_img from "../assets/product-images/flowers.png";
import frontload_washer_img from "../assets/product-images/samsung-front-load.png";
import hoses_img from "../assets/product-images/hoses.png";
import no_img from "../assets/product-images/no-image.png";
import paint_img from "../assets/product-images/paint.png";
import plant_img from "../assets/product-images/plant.png";
import plywood_img from "../assets/product-images/plywood.png";
import powerstrip_img from "../assets/product-images/power-strip.png";
import shower_img from "../assets/product-images/shower.png";
import sink_img from "../assets/product-images/sink.png";
import tapemeasure_img from "../assets/product-images/tape-measure.png";
import toilet_img from "../assets/product-images/toilet.png";
import topload_washer_img from "../assets/product-images/samsung-top-load.png";
import wallwart_img from "../assets/product-images/wall-wart.png";
import washer_img from "../assets/product-images/washer.png";

import { Product } from "../globalFunctions/globalJS_classes";

const MRVproductContext = React.createContext({


  // For use in Exchanges

  3333: new Product({
    image: "",
    itemNum: "333",
    modelNum: "3YY",
    description: "3 Year LPP",
  }),

  9900: new Product({
    img: topload_washer_img,
    price: 88000,
    itemNum: "9900",
    modelNum: "STL301",
    description: "Samsung 7.1-cu ft Reversible Side Load Washer",
    specialCategories: { SOS: true },
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["AAA"],
  }),

  9910: new Product({
    img: frontload_washer_img,
    price: 76600,
    itemNum: "9910",
    modelNum: "SFL456",
    description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
    specialCategories: { SOS: true },
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["BBB"],
  }),
});

export default MRVproductContext;
