import classes from "./SelectReceiptType.module.css";

import InPageTitleBox from "../../../components/UI/DisplayOutputs/InPageTitleBox";

const SelectReceiptType = () => {
  return (
    <section className={`${classes.container}`}>
      <InPageTitleBox mainTitle="Select A Receipt Type" hasDivider={false} />
    </section>
  );
};

export default SelectReceiptType;
