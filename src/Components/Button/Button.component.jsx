import React from "react";
import "./Button.component.css";

const Button = (props) => {
  return (
    <button onClick={props.function1} className={props.className}>
      {props.children}
    </button>
  );
};

export default Button;
