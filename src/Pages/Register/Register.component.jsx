import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button.component";
import "./Register.component.css";
import { connect } from "react-redux";
import { getUser } from "../../Redux/reducers/authReducer";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      if (res.data.user_id) {
        props.history.push("/dashboard");
      }
    });
  }, []);

  return (
    <div className="register-page">
      <div className="register-box">
        <p className="register-title">Register</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          placeholder="Password"
          type="password"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
          placeholder="Confirm Password"
          type="password"
        />
        <Button
          function1={() => {
            axios
              .post("/auth/register", { username, password, confirmPassword })
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
          <Link to="/login">
            <Button className="dont-have">
              Already have an account? Login Here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { getUser })(withRouter(Register));
