import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "../../Components/Button/Button.component";
import "./Auth.component.css";
import axios from "axios";

const Auth = (props) => {
  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      if (res.data.user_id) {
        props.history.push("/dashboard");
      }
    }, []);
  });

  return (
    <div className="auth-page">
      <img
        draggable={false}
        className="auth-logo"
        src={require("../../Assets/icons/noun_waves_2731672.svg")}
        alt="logo-auth"
      />
      <p className="auth-title">Still Waters</p>
      <Link to="/login">
        <Button className="auth login">Login</Button>
      </Link>
      <Link to="/register">
        <Button className="auth register">Register</Button>
      </Link>
    </div>
  );
};

export default withRouter(Auth);
