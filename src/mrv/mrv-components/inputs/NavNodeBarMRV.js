import "./NavNodeBarMRV.css";
import { MdChevronRight } from "react-icons/md";

import {
  navNode,
  baseReturnState,
} from "../../../globalFunctions/globalJS_classes";
import { useNodeNav } from "../../MRVhooks/MRVhooks";
import { useOutletContext } from "react-router";

const NavNodeBarMRV = ({ sessionState, setSessionState }) => {
  const nodeNav = useNodeNav({
    sessionState: sessionState,
    setSessionState: setSessionState,
  });

  const sessionNavNodes = sessionState.oNavNodes;
  const refDefaultState = baseReturnState({});

  // only use the nodes with a breadcrumb property.
  const aBreadCrumbNodes = Object.values(sessionNavNodes).filter(
    (node) => node.breadcrumb
  );

  const uiBreadcrumb = (crumbNavNodes) => {
    const refNavNode = navNode({});
    const selected = crumbNavNodes.selected ? "selected" : "";
    const disabled = crumbNavNodes.disabled ? "disabled nohover" : "";

    return (
      <button
        disabled={crumbNavNodes.disabled}
        onClick={() => console.log(
          "fart"
        )}
        className={`ghost miniBtn ${selected} ${disabled}`}
      >
        {crumbNavNodes.titleStr}
        <MdChevronRight />
      </button>
    );
  };

  return (
    <section className={`navNodeBar`}>
      {aBreadCrumbNodes.map((node) => {
        return uiBreadcrumb(node);
      })}
    </section>
  );
};

export { NavNodeBarMRV };
