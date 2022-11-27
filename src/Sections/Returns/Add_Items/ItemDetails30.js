import classes from "./ItemDetails30.module.css";

import TitleBar from "../../../components/UI/TitleBar";
import FooterContainer from "../../../components/UI/FooterContainer";

const ItemDetails30 = (props) => {
  return (
    <form className={classes.container}>
      <TitleBar lefticon="close" left_onClick="">
        ItemDetails
      </TitleBar>
      <section className={classes.mainContent}></section>
      <FooterContainer>
        <button className={`baseButton primary large ${classes.button}`}>
          Placeholder
        </button>
      </FooterContainer>
    </form>
  );
};

export default ItemDetails30;
