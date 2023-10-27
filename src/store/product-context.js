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

const ProductContext = React.createContext({
  100: {
    img: faucet_img,
    price: 5599,
    itemNum: "100",
    modelNum: "DR3345",
    description: "Two handle classic faucet in wrought iron",
    categories: ["Stock"],
    specialCategories: { ARD: true },
  },
  200: {
    img: flowers_img,
    price: 499,
    itemNum: "200",
    modelNum: "BB9FF1",
    description: "Phillipine white lillies with terra-cotta pot",
    categories: ["Live Goods"],
  },
  300: {
    img: hoses_img,
    price: 1575,
    itemNum: "300",
    modelNum: "DR3345",
    description: "Replacement hoses for Samsung refrigerator",
    categories: [],
  },

  400: {
    img: toilet_img,
    price: 39500,
    itemNum: "400",
    modelNum: "RT3301",
    description: "Kohler Grand Duke II with Royal Flush",
    categories: ["Stock", "Special Order"],
    inStock: 1,
    dcLocations: ["AAA"],
  },
  900: {
    img: topload_washer_img,
    price: 88000,
    itemNum: "900",
    modelNum: "STL301",
    description: "Samsung 7.1-cu ft Reversible Side Load Washer",
    specialCategories: { SOS: true },
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["AAA"],
  },

  910: {
    img: frontload_washer_img,
    price: 76600,
    itemNum: "910",
    modelNum: "SFL456",
    description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
    specialCategories: { SOS: true },
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["BBB"],
  },

  10001: {
    img: no_img,
    price: 7899,
    itemNum: "10001",
    modelNum: "GSOS001",
    description:
      "Base 18 Wastebasket with double-walled catch envelope, ceramic thermal diffusers and lint roller",
    categories: ["Configurable"],
    specialCategories: { SOS: true },
    restockFee: 0.2,
  },

  10002: {
    img: no_img,
    price: 212,
    itemNum: "10002",
    modelNum: "GSOS002",
    description: "Free-range White Rhino Ivory Knob",
    categories: ["Configurable"],
    specialCategories: { SOS: true },
    restockFee: 0.2,
  },

  10003: {
    img: no_img,
    price: 6123,
    itemNum: "10003",
    modelNum: "GSOS003",
    description: "5-Piece Oak Drawer",
    categories: ["Configurable"],
    specialCategories: { SOS: true },
    restockFee: 0.2,
  },

  // For use in Exchanges

  3333: new Product({
    image: "",
    itemNum: "3333",
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
    reqAccessories: "100001",
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

  100001: new Product({
    img: hoses_img,
    price: 910,
    itemNum: "100001",
    modelNum: "BFH01",
    description: "Replacement Water Hose",
    inStock: 99,
    dcLocations: ["BBB"],
  }),
});

export default ProductContext;
