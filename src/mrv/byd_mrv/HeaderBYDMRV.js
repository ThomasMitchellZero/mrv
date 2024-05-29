import "./HeaderBYDMRV.css";

const HeaderBYDMRV = ({ title }) => {
  return (
    <div className={`BYDHeader`}>
      <div className={`heading__small color__primary__text`}>{title}</div>
    </div>
  );
};

export { HeaderBYDMRV };
