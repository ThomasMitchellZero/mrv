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
  100: {
    img: faucet_img,
    price: 15.99,
    itemNum: "100",
    modelNum: "DR3345",
    description: "Two handle classic faucet in wrought iron",
    categories: ["Stock"],
  },
  200: {
    img: flowers_img,
    price: 4.99,
    itemNum: "200",
    modelNum: "BB9FF1",
    description: "Phillipine white lillies with terra-cotta pot",
    categories: ["Live Goods"],
  },
  300: {
    img: hoses_img,
    price: 15.75,                                       
    itemNum: "300",
    modelNum: "DR3345",
    description: "Replacement hoses for Samsung refrigerator",
    categories: [],
  },

  400: {
    img: toilet_img,
    price: 995.00,
    itemNum: "400",
    modelNum: "RT3301", 
    description: "American Standard Grand Duke II with Royal Flush",
    categories: ["Stock","Special Order"],
  },
  900: {
    img: topload_washer_img,
    price: 500.00,
    itemNum: "900",
    modelNum: "STL301",
    description: "Samsung 7.1-cu ft Reversible Side Load Washer",
    categories: ["Stock","Delivery"],
  },
  910: {
    img: frontload_washer_img,
    price: 400.00,
    itemNum: "910",
    modelNum: "SFL456",
    description: "Samsung 5.1-cu ft High Efficiency Top Load Washer",
    categories: ["Stock","Delivery"],
  },

});

export default ProductContext;
