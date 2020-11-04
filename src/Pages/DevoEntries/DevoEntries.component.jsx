import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

const DevoEntries = (props) => {
  const [devos, setDevos] = useState([]);
  const [devosCopy, setDevosCopy] = useState([]);
  const [userId, setId] = useState(null);

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      const id = res.data.user_id;
      setId(id);
      if (!res.data.user_id) {
        props.history.push("/");
      }
      axios.get(`/devos/${id}`).then((res) => {
        setDevos(res.data);
        setDevosCopy(res.data);
      });
    });
  }, []);

  return (
    <div className="journal-entries-page">
      <section className="header">
        <div className="header-left-side">
          <Link className="Links" to="/dashboard">
            <img
              draggable={false}
              className="size"
              src={require("../../Assets/icons/noun_waves_2731672.svg")}
              alt="logo-auth"
            />
          </Link>
          <h1 className="journal-title">Devo Entries</h1>
        </div>
        <div className="link-box">
          <Link className="Links" to="/devos">
            <h2 className="link">Add Devo</h2>
          </Link>
          <Link className="Links" to="/entries/journal">
            <h2 className="link">Journal Entries</h2>
          </Link>
        </div>
      </section>

      <div className="line entries-page-line" />

      <input
        onChange={(e) => {
          if (e.target.value === "") {
            setDevos(devosCopy);
          } else {
            axios
              .get(`/devo/${userId}/${e.target.value}`)
              .then((res) => {
                setDevos(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }}
        className="search-bar-input"
        placeholder="search"
      />
      <div className="box eighty-width">
        {devos.map((devoObj) => {
          return (
            <div
              onClick={() => {
                props.history.push(`/devo/${devoObj.devos_id}`);
              }}
              className="journal-entry-box"
            >
              {devoObj.date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    auth: reduxState.auth,
  };
};

export default connect(mapStateToProps)(withRouter(DevoEntries));
