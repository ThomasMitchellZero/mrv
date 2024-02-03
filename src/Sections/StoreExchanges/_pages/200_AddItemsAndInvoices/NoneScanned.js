import "./_AddItemsAndInvos.css";

import Universal from "../../../../assets/lowes-icons/Picture-Icons/universal-scan.svg";

const NoneScanned = () => {
  return (
    <section className={`main_content`}>
      <div className={``}>
        <img src={Universal} alt={"Scanning Graphic"} />
        <h2 className={``}>Start Scanning</h2>
        <p className={`body__large`}>
          You may scan or enter multiple receipts or items
        </p>
      </div>
    </section>
  );
};

export { NoneScanned };

/*



*/
