import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./Devos.component.css";

const Devos = (props) => {
  const [dateEdit, toggleDateEdit] = useState(true);
  const [date, setDate] = useState(props.date.date);

  const [bookEdit, toggleBookEdit] = useState(true);
  const [bookText, setBookText] = useState("");

  const [chaptersEdit, toggleChaptersEdit] = useState(true);
  const [chaptersText, setChapterText] = useState("");

  const [versesEdit, toggleVersesEdit] = useState(true);
  const [versesText, setVersesText] = useState("");

  const [analysisText, setAnalysisText] = useState("");

  const [prayerText, setPrayerText] = useState("");

  const submitDevo = () => {
    axios.get("/auth/me").then((res) => {
      const id = res.data.user_id;
      axios
        .post("/devos/new", {
          date,
          book: bookText,
          chapter: chaptersText,
          verses: versesText,
          analysis: analysisText,
          prayers: prayerText,
          id,
        })
        .then(() => {
          props.history.push("/entries/devos");
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
    <div className="journal devo-page">
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
          <h1 className="journal-title">Devos</h1>
        </div>
        <div className="link-box">
          <Link className="Links" to="/entries/devos">
            <h2 className="link">Entries</h2>
          </Link>
          <Link className="Links" to="/journal">
            <h2 className="link">Journal</h2>
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

      <section className="box margins bible-box">
        {bookEdit === true || bookText === "" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleBookEdit(!bookEdit);
            }}
          >
            <input
              onChange={(e) => {
                setBookText(e.target.value);
              }}
              className="input devos books"
              placeholder="Book"
              value={bookText}
            />
          </form>
        ) : (
          <p
            onClick={() => {
              toggleBookEdit(!bookEdit);
            }}
            className="blacked book-text"
          >
            {bookText}
          </p>
        )}

        {chaptersEdit === true || chaptersText === "" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleChaptersEdit(!chaptersEdit);
            }}
          >
            <input
              onChange={(e) => {
                setChapterText(e.target.value);
              }}
              className="input devos chapters"
              placeholder="Chapters"
              value={chaptersText}
            />
          </form>
        ) : (
          <p
            className="blacked chapter-text"
            onClick={() => {
              toggleChaptersEdit(!chaptersEdit);
            }}
          >
            {chaptersText} :{" "}
          </p>
        )}

        {versesEdit === true || versesText === "" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleVersesEdit(!versesEdit);
            }}
          >
            <input
              onChange={(e) => {
                setVersesText(e.target.value);
              }}
              className="input devos verses"
              placeholder="Verses"
              value={versesText}
            />
          </form>
        ) : (
          <p
            onClick={() => {
              toggleVersesEdit(!versesEdit);
            }}
            className="blacked verses-text"
          >
            {versesText}
          </p>
        )}
      </section>

      <section className="box personal-entry">
        <p className="journal-title-sub">Analysis </p>
        <textarea
          onChange={(e) => {
            setAnalysisText(e.target.value);
          }}
          className="input journal-entry-input"
        />
      </section>

      <section className="box personal-entry">
        <p className="journal-title-sub">Prayers to God </p>
        <textarea
          onChange={(e) => {
            setPrayerText(e.target.value);
          }}
          className="input journal-entry-input"
        />
      </section>

      <button onClick={submitDevo} className="margins devobutton">
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

export default connect(mapStateToProps)(withRouter(Devos));
