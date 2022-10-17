import classes from "./VerticalNavMenu.module.css";

import VerticalNavButton from "./VerticalNavButton";

const VerticalNavMenu = (props) => {

        /*
            start here. 

            -Do I create the array of buttons as a map, or just put them in as children?
            -Do I even need to create a separate button component, since AFAICT it's only being used here?
        
        */
  return (
    <section className={classes.main}>
      <p>Placeholder</p>
      <VerticalNavButton label="test"></VerticalNavButton>
    </section>
  );
};

export default VerticalNavMenu;
