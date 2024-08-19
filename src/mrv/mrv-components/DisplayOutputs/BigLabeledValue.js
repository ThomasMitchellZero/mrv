function BigLabeledValue({
  labelStr = "NO LABEL",
  valueStr = "NO VALUE",
  status = "defaultBlack",
  labelMatchesValue = true,
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

  return (
    <div className={`vBox gap0rem alignCenter ${oConfigs[status].textColor}`}>
      <div className={`label body__small ${labelColor}`}>{labelStr}</div>
      <div className={`value heading__large`}>{valueStr}</div>
    </div>
  );
}

export { BigLabeledValue };
