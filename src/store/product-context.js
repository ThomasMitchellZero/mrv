import React from "react";
import faucet_img from "../assets/product-images/faucet.png";
import flowers_img from "../assets/product-images/flowers.png";
import frontload_washer_img from "../assets/product-images/samsung-front-load.png";
import hoses_img from "../assets/product-images/hoses.png";
import no_img from "../assets/product-images/no-image.png"
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



const ProductContext = React.createContext({
  faucet: {
    img: faucet_img,
    price: 15.99,
    itemNum: "332233",
    modelNum: "DR3345",
    description: "Two handle classic faucet in wrought iron",
    categories: ["Stock"],
  },
  frontload_washer: {
    img: frontload_washer_img,
    price: 400.00,
    itemNum: "207442",
    modelNum: "SFL456",
    description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
    categories: ["Stock","Delivery"],
  },
  flowers: {
    img: flowers_img,
    price: 4.99,
    itemNum: "450213",
    modelNum: "BB9FF1",
    description: "Phillipine white lillies with terra-cotta pot",
    categories: ["Live Goods"],
  },
  hoses: {
    img: hoses_img,
    price: 8.75,
    itemNum: "332233",
    modelNum: "DR3345",
    description: "Replacement hoses for Samsung refrigerator",
    categories: ["Stock"],
  },

  toilet: {
    img: toilet_img,
    price: 8.75,
    itemNum: "120975",
    modelNum: "RT3301",
    description: "American Standard Grand Duke II with Ultra-Flush",
    categories: ["Stock","Special Order"],
  },
  topload_washer: {
    img: topload_washer_img,
    price: 500.00,
    itemNum: "595975",
    modelNum: "STL301",
    description: "Samsung 7.1-cu ft Reversible Side Load Washer",
    categories: ["Stock","Delivery"],
  },

});

export default ProductContext;
