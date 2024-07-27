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
import child_arrow from "../assets/product-images/child-arrow.png";
import dryer_1_img from "../assets/product-images/dryer_1.png";
import dryer_2_img from "../assets/product-images/dryer_2.png";
import lpp_img from "../assets/product-images/lpp.png";
import PLACEHOLDER_img from "../assets/product-images/PLACEHOLDER.png";
import rtf_clamp_img from "../assets/product-images/rtf_clamp.png";
import rtf_hose_img from "../assets/product-images/rtf_hose.png";
import rtf_duct_img from "../assets/product-images/rtf_duct.png";
import washer_1_img from "../assets/product-images/washer_1.png";
import washer_2_img from "../assets/product-images/washer_2.png";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import {
  Product,
  productTaxonomyMRV,
  productKingdomMRV,
} from "../globalFunctions/globalJS_classes";

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

  330: new Product({
    img: hoses_img,
    price: 2250,
    itemNum: "320",
    modelNum: "CBC221",
    description: "Polyethylene Water Hose",
    inStock: 99,
    dcLocations: ["2345"],
  }),
  440: new Product({
    img: faucet_img,
    price: 15599,
    itemNum: "440",
    modelNum: "RT3301",
    description: "Two handle classic faucet in wrought iron",
    inStock: 99,
    dcLocations: ["2345"],
  }),
  550: new Product({
    img: tapemeasure_img,
    price: 999,
    itemNum: "550",
    modelNum: "TAP001",
    description: "Craftsman 25' Tape Measure",
    inStock: 99,
    dcLocations: ["2345"],
  }),

  660: new Product({
    img: powerstrip_img,
    price: 1950,
    itemNum: "660",
    modelNum: "PST001",
    description:
      "8-Port Power Strip with 2 USB-A, 2 USB-C, and Surge Protection",
    inStock: 99,
    dcLocations: ["2345"],
  }),

  3333: new Product({
    img: child_arrow,
    itemNum: "3333",
    modelNum: "3YY",
    description: "3 Year LPP",
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ lpp: true }),
    }),
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
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  9910: new Product({
    img: frontload_washer_img,
    price: 76600,
    itemNum: "9910",
    modelNum: "SFL456",
    description: "Samsung 5.1-cu ft High Efficiency Dryer with Steam Cycle",
    specialCategories: { SOS: true },
    reqAccessories: "100001",
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
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

  noProduct: new Product({
    img: no_img,
    price: 0,
    itemNum: "- -",
    modelNum: "- -",
    description: "No Product",
  }),

  // Configured for based on latest as of Jul 2024

  20100: new Product({
    img: washer_1_img,
    price: 110000,
    itemNum: "20100",
    modelNum: "SFL456",
    description: "Bosch 4.5-cu ft. High Efficiency Washing Machine",
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20110: new Product({
    img: washer_2_img,
    price: 120000,
    itemNum: "20110",
    modelNum: "ORD456",
    description: "Whirlpool 5.1-cu ft. Top Loader Washing Machine",
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20200: new Product({
    img: dryer_1_img,
    price: 75000,
    itemNum: "20200",
    modelNum: "FML456",
    description: "Miele 7.2-cu ft. Thermal Dryer With Auto Cleaning",
    specialCategories: { SOS: true },
    reqAccessories: "100001",
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20210: new Product({
    img: dryer_2_img,
    price: 80000,
    itemNum: "20210",
    modelNum: "ATL123",
    description: "Whirlpool 5.4-cu ft. Top Loader Washing Machine",
    specialCategories: { SOS: true },
    reqAccessories: "100001",
    restockFee: 0.2,
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20900: new Product({
    img: rtf_clamp_img,
    price: 500,
    itemNum: "20900",
    modelNum: "RTF001",
    description: "8-inch Diamater Galvanized Steel Duct Clamp",
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20910: new Product({
    img: rtf_duct_img,
    price: 2500,
    itemNum: "20920",
    modelNum: "RTF910",
    description: "8-Inch x 36-Inch Flexible Dryer Duct",
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20920: new Product({
    img: rtf_hose_img,
    price: 2000,
    itemNum: "20910",
    modelNum: "RTF920",
    description: "1/4” x 48” steel-braided hose",
    inStock: 99,
    dcLocations: ["BBB"],
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ product: true }),
    }),
  }),

  20333: new Product({
    img: lpp_img,
    price: 3333,
    itemNum: "20333",
    modelNum: "3YY",
    description: "3 Year LPP",
    productTaxonomyMRV: productTaxonomyMRV({
      productKingdomMRV: productKingdomMRV({ service: true }),
    }),
  }),
});

export default ProductContext;
