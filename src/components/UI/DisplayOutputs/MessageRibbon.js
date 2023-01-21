import classes from "./MessageRibbon.module.css";

const MessageRibbon = ({
  text,
  color = "gold",
  size = "large",
  width = null,

}) => {
  return (
    <div
      style={{ width: width, }}
      className={`ribbon-text ${classes.container} ${classes[size]} ${classes[color]}`}
    >
      {text}
    </div>
  );
};

export default MessageRibbon;
