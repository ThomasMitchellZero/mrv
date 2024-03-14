import "./NavNodeBarMRV.css";
import { navNode } from "../../../globalFunctions/globalJS_classes";
import { useNodeNav } from "../../MRVhooks/MRVhooks";

const NavNodeBarMRV = ({
  navNodesArr = [], 

}) => {
  return (
    <section className={`navNodeBarMRV`}>
      {navNodesArr.map((node, index) => {
        return (
          <button
            key={index}
            onClick={() => alert("nothing here")}
            className={`mrvBtn navBtn`}
          >
            {node.titleStr}
          </button>
        );
      })}
    </section>
  );
};

export { NavNodeBarMRV };
