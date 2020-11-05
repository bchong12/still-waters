import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./journalEntries.component.css";

const JournalEntries = (props) => {
  const [journals, setJournals] = useState([]);
  const [journalsCopy, setJournalsCopy] = useState([]);

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      const id = res.data.user_id;
      if (!res.data.user_id) {
        props.history.push("/");
      }
      axios.get(`/journals/${id}`).then((res) => {
        setJournals(res.data);
        setJournalsCopy(res.data);
      });
    });
  }, []);

  return (
    <div className="journal-entries-page">
      <section className="header entries">
        <div className="header-left-side">
          <Link className="Links" to="/dashboard">
            <img
              draggable={false}
              className="size"
              src={require("../../Assets/icons/noun_waves_2731672.svg")}
              alt="logo-auth"
            />
          </Link>
          <h1 className="journal-title entries">Journal Entries</h1>
        </div>

        <div className="link-box">
          <Link className="Links" to="/journal">
            <h2 className="link">Add Journal</h2>
          </Link>
          <Link className="Links" to="/entries/devos">
            <h2 className="link">Devo Entries</h2>
          </Link>
        </div>
      </section>

      <div className="line entries-page-line" />

      <input
        onChange={(e) => {
          if (e.target.value === "") {
            setJournals(journalsCopy);
          } else {
            axios.get("/auth/me").then((res) => {
              const id = res.data.user_id;
              axios
                .get(`/journal/${id}/${e.target.value}`)
                .then((res) => {
                  setJournals(res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            });
          }
        }}
        className="search-bar-input"
        placeholder="search"
      />
      <div className="box eighty-width">
        {journals.map((journalObj) => {
          return (
            <div
              onClick={() => {
                props.history.push(`/journal/${journalObj.journal_id}`);
              }}
              className="journal-entry-box"
            >
              {journalObj.date}
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

export default connect(mapStateToProps)(withRouter(JournalEntries));
