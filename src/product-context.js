import React from "react";
import faucet_img from "./assets/Product-Images/faucet.png";
import flowers_img from "./assets/Product-Images/flowers.png";
import hoses_img from "./assets/Product-Images/hoses.png";
import no_img from "./assets/Product-Images/no-image.png";
import paint_img from "./assets/Product-Images/paint.png";
import plant_img from "./assets/Product-Images/plant.png";
import plywood_img from "./assets/Product-Images/plywood.png";
import powerstrip_img from "./assets/Product-Images/power-strip.png";
import shower_img from "./assets/Product-Images/shower.png";
import sink_img from "./assets/Product-Images/sink.png";
import tapemeasure_img from "./assets/Product-Images/tape-measure.png";
import toilet_img from "./assets/Product-Images/toilet.png";
import wallwart_img from "./assets/Product-Images/wall-wart.png";
import washer_img from "./assets/Product-Images/washer.png";

const ProductContext = React.createContext({
  faucet: {
    img: faucet_img,
    price: 15.99,
    itemNum: "332233",
    modelNum: "DR3345",
    description: "Two handle classic faucet in wrought iron",
    categories: ["Stock"],
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
    categories: ["Stock"],
  },
});

export default ProductContext;
