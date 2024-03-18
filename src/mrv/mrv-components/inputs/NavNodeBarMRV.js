import "./NavNodeBarMRV.css";
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

  const ssState = sessionState;

  const sessionNavNodes = sessionState.oNavNodes;

  const refDefaultState = baseReturnState({});

  const test = Object.values(sessionNavNodes);

  // only use the nodes with a breadcrumb property.
  const aBreadCrumbNodes = Object.values(sessionNavNodes).filter(
    (node) => node.breadcrumb
  );

  const uiBreadcrumb = (crumbNavNodes) => {
    const refNavNode = navNode({});
    return (
      <button
        //onClick={() => nodeNav({targetNodeKey: crumbNavNodes.keyStr})}
        className={`ghost miniButton`}
      >
        {crumbNavNodes.titleStr}
      </button>
    );
  };

  const uiBreadcrumArr = aBreadCrumbNodes.map((node) => {
    return uiBreadcrumb(node);
  });



  return (
    <section className={`navNodeBar`}>
      {aBreadCrumbNodes.map((node) => {
        return uiBreadcrumb(node);
      })}
    </section>
  );
};

export { NavNodeBarMRV };
