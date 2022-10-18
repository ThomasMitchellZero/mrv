import classes from "./LineIcons.module.css";
import Blank from "./Blank.svg";
import Box from "./Box.svg";
import Email from "./Email.svg";
import Exchange from "./Exchange.svg";
import Phone from "./Phone.svg";
import Print from "./Print.svg";
import Truck from "./Truck.svg";
import XMark from "./X-mark.svg";

const LineIcon = (props) => {
  return <img src={props.src} alt="icon" className={props.className}></img>;
};

const VectorIcon = (props) => {
  //accepts 2 props, fill=  and size=
  return (
    <div className={props.className}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={props.fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        {props.children}
      </svg>
    </div>
  );
};

export const BlankLineIcon = (props) => {
  return <LineIcon src={Blank} className={props.className} />;
};

export const BoxLineIcon = (props) => {
  return <LineIcon src={Box} className={props.className} />;
};

export const EmailLineIcon = (props) => {
  return <LineIcon src={Email} className={props.className} />;
};

export const ExchangeLineIcon = (props) => {
  return <LineIcon src={Exchange} className={props.className} />;
};

export const PhoneLineIcon = (props) => {
  return <LineIcon src={Phone} className={props.className} />;
};

export const PrintLineIcon = (props) => {
  return <LineIcon src={Print} className={props.className} />;
};

export const TruckLineIcon = (props) => {
  return <LineIcon src={Truck} className={props.className} />;
};

export const XmarkLineIcon = (props) => {
  return <LineIcon src={XMark} className={props.className} />;
};

// This is working (kind of) by enclosing it in a div.  See if there is a way to make it not so messy adn have it all as one component.
export const Ztest = (props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.classname}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 3C1.44772 3 1 3.44772 1 4V16C1 16.5523 1.44772 17 2 17H3.17071C3.06015 17.3128 3 17.6494 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18C9 17.6494 8.93985 17.3128 8.82929 17H15H15.1707C15.0602 17.3128 15 17.6494 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 17.6494 20.9398 17.3128 20.8293 17H22C22.5523 17 23 16.5523 23 16V11C23 10.7348 22.8946 10.4804 22.7071 10.2929L19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7H16V4C16 3.44772 15.5523 3 15 3H2ZM18 15H21V11.4142L18.5858 9H16V15H18ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18ZM14 15H6H3V5H14V8V15Z"
        fill={props.fill}
      />
    </svg>
  );
};

export const Xtest = (props) => {
  return (
    <div className={props.className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 3C1.44772 3 1 3.44772 1 4V16C1 16.5523 1.44772 17 2 17H3.17071C3.06015 17.3128 3 17.6494 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18C9 17.6494 8.93985 17.3128 8.82929 17H15H15.1707C15.0602 17.3128 15 17.6494 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 17.6494 20.9398 17.3128 20.8293 17H22C22.5523 17 23 16.5523 23 16V11C23 10.7348 22.8946 10.4804 22.7071 10.2929L19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7H16V4C16 3.44772 15.5523 3 15 3H2ZM18 15H21V11.4142L18.5858 9H16V15H18ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18ZM14 15H6H3V5H14V8V15Z"
          fill={props.fill}
        />
      </svg>
    </div>
  );
};
