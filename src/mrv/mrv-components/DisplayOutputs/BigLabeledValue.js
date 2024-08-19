import "./BigLabeledValue.css";

function BigLabeledValue({
  labelStr = "NO LABEL",
  valueStr = "NO VALUE",
  status = "defaultBlack",
  labelMatchesValue = true,
  style = {},
  width = "",
  ref_status____defaultBlack_goodGreen_badRed_lowGrey,
}) {
  const oConfigs = {
    defaultBlack: {
      textColor: "color__primary__text",
    },
    goodGreen: {
      textColor: "color__green__text",
    },
    badRed: {},
    lowGrey: {},
  };

  const labelColor = labelMatchesValue
    ? oConfigs[status].textColor
    : "color__primary__text";

  const oStyle = style;

  if (width) {
    oStyle.width = width;
  }

  return (
    <div
      className={`bigLabeledValue  ${oConfigs[status].textColor}`}
      style={oStyle}
    >
      <div className={`label body__small minWidth ${labelColor}`}>
        {labelStr}
      </div>
      <div className={`value heading__large minWidth`}>{valueStr}</div>
    </div>
  );
}

export { BigLabeledValue };
