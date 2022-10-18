const VectorIcon = (props) => {
  return (
    <div className={props.className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {props.children}
      </svg>
    </div>
  );
};

export const BlankLineIcon = (props) => {
  return (
    <VectorIcon className={props.classname}>
      <rect width="24" height="24" fill={undefined} />
    </VectorIcon>
  );
};

export const BoxLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.56051 2.57909C5.8447 2.21371 6.28166 2 6.74454 2H17.2555C17.7183 2 18.1553 2.21371 18.4395 2.57909L21.684 6.75064C21.8888 7.01394 22 7.33799 22 7.67155V20.5C22 21.3284 21.3284 22 20.5 22H3.5C2.67157 22 2 21.3284 2 20.5V7.67155C2 7.33799 2.11118 7.01394 2.31597 6.75064L5.56051 2.57909ZM6.98908 4L5.04464 6.5H11V4H6.98908ZM13 4V6.5H18.9554L17.0109 4H13ZM4 20V8.5H20V20H4Z"
      />
    </VectorIcon>
  );
};

export const EmailLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3H3ZM4.41421 5H19.5859L12.7072 11.8788C12.3167 12.2693 11.6835 12.2693 11.293 11.8788L4.41421 5ZM3 17.5859L8.58586 12.0001L3 6.41421V17.5859ZM10.0035 13.4109L4.41436 19H19.5858L13.9967 13.4109C12.8611 14.4252 11.1391 14.4252 10.0035 13.4109ZM15.4143 12.0001L21 6.41437V17.5858L15.4143 12.0001Z"
      />
    </VectorIcon>
  );
};

export const ExchangeLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path d="M18 3L22 7L18 11V8H14V6H18V3Z" />
      <path d="M6 21L2 17L6 13L6 16L10 16L10 18L6 18L6 21Z" />
      <rect x="10" y="6" width="2" height="2" />
      <rect x="14" y="18" width="2" height="2" transform="rotate(-180 14 18)" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="18" y="18" width="2" height="2" transform="rotate(-180 18 18)" />
    </VectorIcon>
  );
};

export const PhoneLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.03204 3.67784C6.30993 2.52665 8.14777 2.94632 9.08449 4.11708L10.8335 6.30305C11.7894 7.49777 11.5957 9.2412 10.4009 10.197C10.2332 10.3312 10.1002 10.5317 10.0443 10.7261C9.99011 10.9145 10.0251 11.0193 10.0587 11.071C10.2698 11.3949 11.1388 12.3761 11.8633 13.1008C12.211 13.4441 12.6397 13.8427 13.0314 14.1869C13.4422 14.548 13.757 14.8002 13.8953 14.8886C13.9481 14.9224 14.0546 14.9567 14.2438 14.9021C14.4387 14.8459 14.6399 14.713 14.7758 14.5454C15.7332 13.3636 17.4629 13.1714 18.6563 14.1144L20.8223 15.8257C22.0082 16.7627 22.4355 18.6216 21.262 19.9029C20.0305 21.2474 18.2461 22.1595 15.9141 21.8314C13.6513 21.513 11.0183 20.046 7.95577 17.0217L7.9513 17.0173L7.95131 17.0173C4.87907 13.9451 3.38896 11.305 3.06733 9.03509C2.73545 6.69285 3.66843 4.90625 5.03204 3.67784ZM7.52282 5.36656C7.16339 4.91732 6.63424 4.92636 6.37067 5.16379C5.41708 6.02284 4.82392 7.17627 5.04755 8.75451C5.28135 10.4046 6.42783 12.6648 9.36324 15.6008C12.2868 18.4873 14.5418 19.6186 16.1927 19.8509C17.7748 20.0735 18.9299 19.488 19.7871 18.5521C20.0272 18.2899 20.0388 17.7556 19.5824 17.395L17.4164 15.6836C17.0823 15.4196 16.5979 15.4734 16.3298 15.8043C15.9426 16.2823 15.3956 16.6514 14.7982 16.8237C14.195 16.9978 13.4648 16.9873 12.8177 16.5735C12.5335 16.3917 12.1122 16.0417 11.711 15.6891C11.2915 15.3204 10.8333 14.8945 10.4558 14.5217L10.4513 14.5173L10.4513 14.5173C9.73048 13.7965 8.72124 12.6819 8.38301 12.1627C7.96096 11.5149 7.94771 10.7801 8.12217 10.1734C8.29491 9.57271 8.66744 9.02256 9.15153 8.63528C9.48375 8.36951 9.5376 7.88473 9.27181 7.55253L7.52282 5.36656Z"
      />
    </VectorIcon>
  );
};

export const PrintLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 6H8V8H16V6ZM6 4V8C3.79086 8 2 9.79086 2 12V18H6V22H18V18H22V12C22 9.79086 20.2091 8 18 8V4H6ZM6 10H18C19.1046 10 20 10.8954 20 12V16H18V14H6V16H4V12C4 10.8954 4.89543 10 6 10ZM8 16H16V20H8V16ZM18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z"
      />
    </VectorIcon>
  );
};

export const TruckLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 3C1.44772 3 1 3.44772 1 4V16C1 16.5523 1.44772 17 2 17H3.17071C3.06015 17.3128 3 17.6494 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18C9 17.6494 8.93985 17.3128 8.82929 17H15H15.1707C15.0602 17.3128 15 17.6494 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 17.6494 20.9398 17.3128 20.8293 17H22C22.5523 17 23 16.5523 23 16V11C23 10.7348 22.8946 10.4804 22.7071 10.2929L19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7H16V4C16 3.44772 15.5523 3 15 3H2ZM18 15H21V11.4142L18.5858 9H16V15H18ZM18 17C17.4477 17 17 17.4477 17 18C17 18.5523 17.4477 19 18 19C18.5523 19 19 18.5523 19 18C19 17.4477 18.5523 17 18 17ZM5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18ZM14 15H6H3V5H14V8V15Z"
      />
    </VectorIcon>
  );
};

export const XmarkLineIcon = (props) => {
  return (
    <VectorIcon className={props.className}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.46452 11.293C8.85505 11.6835 8.85505 12.3167 8.46452 12.7072L4.22206 16.9497C3.83153 17.3402 3.83153 17.9734 4.22206 18.3639L5.63627 19.7781C6.0268 20.1686 6.65996 20.1686 7.05048 19.7781L11.293 15.5356C11.6835 15.1451 12.3166 15.1451 12.7072 15.5356L16.9497 19.7781C17.3402 20.1687 17.9734 20.1687 18.3639 19.7781L19.7781 18.3639C20.1686 17.9734 20.1686 17.3402 19.7781 16.9497L15.5356 12.7072C15.1451 12.3167 15.1451 11.6835 15.5356 11.293L19.7784 7.05018C20.1689 6.65966 20.1689 6.02649 19.7784 5.63597L18.3642 4.22176C17.9737 3.83123 17.3405 3.83123 16.95 4.22176L12.7072 8.46457C12.3166 8.85509 11.6835 8.85509 11.293 8.46457L7.05018 4.2218C6.65966 3.83128 6.02649 3.83128 5.63597 4.2218L4.22176 5.63601C3.83123 6.02654 3.83123 6.6597 4.22176 7.05023L8.46452 11.293Z"
      />
    </VectorIcon>
  );
};
