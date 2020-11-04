import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button.component";
import { connect } from "react-redux";
import { getUser } from "../../Redux/reducers/authReducer";
import "./Login.component.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      if (res.data.user_id) {
        props.history.push("/dashboard");
      }
    });
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <p className="login-title">Login</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="Password"
          type="password"
        />
        <Button
          function1={() => {
            axios
              .post("/auth/login", { username, password })
              .then((res) => {
                //redux with res.data
                props.getUser(res.data);
                props.history.push("/dashboard");
              })
              .catch((err) => alert(err.response.data));
          }}
          className="auth logbox"
        >
          Submit
        </Button>
        <div className="dont-have-button-auth">
          <Link to="/register">
            <Button className="dont-have">
              Don't have an account? Sign Up Here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getUser })(withRouter(Login));
