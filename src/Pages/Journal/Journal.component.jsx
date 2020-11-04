import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./Journal.component.css";

const Journal = (props) => {
  const [dateEdit, toggleDateEdit] = useState(true);
  const [date, setDate] = useState(props.date.date);

  const [journalText, setJournalText] = useState("");

  const [gratitudeText, setGratitudeText] = useState("");
  const [gratitudeEdit, toggleGratitudeEdit] = useState(true);

  const [worriesText, setWorriesText] = useState("");
  const [worriesEdit, toggleWorriesEdit] = useState(true);

  const [goalText, setGoalText] = useState("");
  const [goalEdit, toggleGoalEdit] = useState(true);

  const [reflectionText, setReflectionText] = useState("");
  const [reflectionEdit, toggleReflectionEdit] = useState(true);

  const submitJournal = () => {
    axios.get("/auth/me").then((res) => {
      const id = res.data.user_id;

      axios
        .post("/journal/new", {
          date,
          gratitude: gratitudeText,
          worries: worriesText,
          journal: journalText,
          reflections: reflectionText,
          goals: goalText,
          id,
        })
        .then(() => {
          props.history.push("/entries/journal");
        });
    });
  };

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      if (!res.data.user_id) {
        props.history.push("/");
      }
    });
  }, []);

  return (
    <div className="journal">
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
          <h1 className="journal-title">Journal</h1>
        </div>
        <div className="link-box">
          <Link className="Links" to="/entries/journal">
            <h2 className="link">Entries</h2>
          </Link>
          <Link className="Links" to="/devos">
            <h2 className="link">Devos</h2>
          </Link>
        </div>
      </section>

      <div className="line" />

      <section className="box date journal-entry">
        <div className="date-journal-box">
          <p className="journal-title-sub">Date: </p>
          {dateEdit === true || (date === "" && !props.date.date) ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toggleDateEdit(!dateEdit);
              }}
            >
              <input
                placeholder="---day, Month 00th, 0000"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date}
                className="input date-input"
              />
            </form>
          ) : (
            <p
              onClick={() => {
                toggleDateEdit(!dateEdit);
              }}
              className="props-date"
            >
              {date}
            </p>
          )}
        </div>
      </section>

      <section className="box grateful-box">
        <p className="journal-title-sub">Gratitude: </p>
        {gratitudeText === "" || gratitudeEdit === true ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleGratitudeEdit(!gratitudeEdit);
            }}
          >
            <input
              onChange={(e) => {
                setGratitudeText(e.target.value);
              }}
              value={gratitudeText}
              placeholder="Today, I am thankful for..."
              className="input grateful-input"
            />
          </form>
        ) : (
          <p
            className="blacked"
            onClick={() => {
              toggleGratitudeEdit(!gratitudeEdit);
            }}
          >
            {gratitudeText}
          </p>
        )}
      </section>

      <section className="box worries">
        <p className="journal-title-sub">Worries: </p>
        {worriesText === "" || worriesEdit === true ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleWorriesEdit(!worriesEdit);
            }}
          >
            <input
              onChange={(e) => {
                setWorriesText(e.target.value);
              }}
              value={worriesText}
              placeholder="I am concerned about..."
              className="input worries-input"
            />
          </form>
        ) : (
          <p
            className="blacked"
            onClick={() => {
              toggleWorriesEdit(!worriesEdit);
            }}
          >
            {worriesText}
          </p>
        )}
      </section>

      <section className="box personal-entry">
        <p className="journal-title-sub">Journal </p>
        <textarea
          onChange={(e) => {
            setJournalText(e.target.value);
          }}
          className="input journal-entry-input"
          value={journalText}
        />
      </section>

      <section className="box worries">
        <p className="journal-title-sub">Goals: </p>
        {goalText === "" || goalEdit === true ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleGoalEdit(!goalEdit);
            }}
          >
            <input
              onChange={(e) => {
                setGoalText(e.target.value);
              }}
              value={goalText}
              placeholder="My goals are..."
              className="input goals-input"
            />
          </form>
        ) : (
          <p
            className="blacked"
            onClick={() => {
              toggleWorriesEdit(!goalEdit);
            }}
          >
            {goalText}
          </p>
        )}
      </section>

      <section className="box worries">
        <p className="journal-title-sub">Reflections: </p>
        {reflectionText === "" || reflectionEdit === true ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleReflectionEdit(!reflectionEdit);
            }}
          >
            <input
              onChange={(e) => {
                setReflectionText(e.target.value);
              }}
              value={reflectionText}
              placeholder="In Reflection, ..."
              className="input reflections-input"
            />
          </form>
        ) : (
          <p
            className="blacked"
            onClick={() => {
              toggleReflectionEdit(!reflectionEdit);
            }}
          >
            {reflectionText}
          </p>
        )}
      </section>

      <button onClick={submitJournal} className="margins journalButtons">
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    date: reduxState.date,
  };
};

export default connect(mapStateToProps)(withRouter(Journal));
