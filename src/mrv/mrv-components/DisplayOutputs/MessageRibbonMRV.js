import "./MessageRibbonMRV.css";

import {
  MdWarning,
  MdInfo,
  MdCheckCircle,
  MdOutlineRemoveCircle,
} from "react-icons/md";

const MessageRibbonMRV = ({
  message = "No Message Provided",
  type = "info",
  info__success__error__critical,
}) => {
  const iconSize = "1.5rem";

  const oConfigs = {
    info: {
      bgColor: "color__ribbon__info",
      accentColor: "color__interactive",
      iconColor: "color__interactive__text",
    },
    success: {},
    error: {},
    critical: {},
  };

  const oIcons = {
    info: <MdInfo fontSize={iconSize} color={oConfigs[type].accentColor} />,
  };

  return (
    <div className={`msgRibbon ${oConfigs[type].bgColor}`}>
      <div className={`colorBar ${oConfigs[type].accentColor}`} />
      <div className={`iconBox ${oConfigs[type].iconColor}`}>
        {oIcons[type]}
      </div>
      <p className={`body color__primary__text`}>{message}</p>
    </div>
  );
};

export { MessageRibbonMRV };
