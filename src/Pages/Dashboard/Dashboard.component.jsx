import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getDate } from "../../Redux/reducers/dateReducer";
import moment from "moment-timezone";
import axios from "axios";
import pics from "../../Assets/pics";
import "./Dashboard.component.css";
import keys from "../../keys";

const Dashboard = (props) => {
  const [settingsBox, toggleSettingsBox] = useState(false);
  const [cityName, setCityName] = useState("");
  const [time, setTime] = useState(null);
  const [dateStr, setDateStr] = useState("");
  const [temp, setTemp] = useState(null);
  const [hiLo, sethiLo] = useState("");
  const [icon, setIcon] = useState("");
  const [timeAdd, setTimeAdd] = useState(null);
  const [picNum, setPicNum] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const getCity = () => {
    clearInterval(intervalId);

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${keys.GEOCODE_API}&limit=1`
      )
      .then((res) => {
        const longitude = res.data.features[0].center[0];
        const latitude = res.data.features[0].center[1];

        axios
          .get(
            `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=alerts&appid=${keys.WEATHER_APP_API}`
          )
          .then((res) => {
            const timezone = res.data.timezone;
            const weather = res.data.current.weather[0];
            const nextWeather = res.data.daily[0].temp;
            const date = moment().tz(timezone).format("dddd, MMMM Do, YYYY");

            const setTimes = () =>
              setTime(moment().tz(timezone).format("h:mm"));
            const setDate = () => {
              setDateStr(date);
            };
            const setTimeAdds = () => {
              setTimeAdd(moment().tz(timezone).format("a"));
            };

            setDate();
            setTimes();
            setTimeAdds();
            props.getDate(date);

            setTemp(`${Math.round(res.data.current.temp)}°`);
            sethiLo(
              `${Math.round(nextWeather.min)}°/${Math.round(nextWeather.max)}°`
            );
            setIcon(`http://openweathermap.org/img/wn/${weather.icon}@2x.png`);

            const i = setInterval(function () {
              setTimes();
              setDate();
              setTimeAdds();
            }, 5000);

            setIntervalId(i);
          });
      });

    setCityName("");
  };

  const getCurrentWeatherAndTime = () => {
    clearInterval(intervalId);

    navigator.geolocation.getCurrentPosition((pos) => {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=imperial&exclude=alerts&appid=${keys.WEATHER_APP_API}`
        )
        .then((res) => {
          const timezone = res.data.timezone;
          const weather = res.data.current.weather[0];
          const nextWeather = res.data.daily[0].temp;
          const date = moment().tz(timezone).format("dddd, MMMM Do, YYYY");

          const setTimes = () => setTime(moment().tz(timezone).format("h:mm"));
          const setDate = () => {
            setDateStr(date);
          };
          const setTimeAdds = () => {
            setTimeAdd(moment().tz(timezone).format("a"));
          };

          setDate();
          setTimes();
          setTimeAdds();
          props.getDate(date);

          setTemp(`${Math.round(res.data.current.temp)}°`);
          sethiLo(
            `${Math.round(nextWeather.min)}°/${Math.round(nextWeather.max)}°`
          );
          setIcon(`http://openweathermap.org/img/wn/${weather.icon}@2x.png`);

          let i = setInterval(function () {
            setTimes();
            setDate();
            setTimeAdds();
          }, 3000);

          setIntervalId(i);
        });
    });
  };

  useEffect(() => {
    axios.get("/auth/me").then((res) => {
      if (!res.data.user_id) {
        props.history.push("/");
      }
    });

    setPicNum(Math.floor(Math.random() * 42));

    getCurrentWeatherAndTime();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${pics[picNum || 1].link})`,
      }}
      className="dashboard"
    >
      <section className="settingsBox">
        <div
          onClick={() => {
            toggleSettingsBox(!settingsBox);
            setCityName("");
          }}
          className={`background setting-box ${settingsBox}`}
        >
          <img
            className="settings-icon"
            src={require("../../Assets/icons/settings.svg")}
          />
        </div>
        {settingsBox ? (
          <div className="background settings">
            <p className="titleSetting">change location</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getCity();
              }}
              className="input-settings"
            >
              <input
                id="city-name"
                autoComplete="off"
                onChange={(e) => {
                  setCityName(e.target.value);
                }}
                className="cityChoose"
                placeholder="city name"
                value={cityName}
              />
              <div onClick={getCity} className="search-icon">
                <i draggable={false} className="fas fa-search"></i>
              </div>
            </form>
            <button
              onClick={() => {
                axios.post("/auth/logout").then(() => {
                  props.history.push("/");
                });
              }}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        ) : null}
      </section>
      <Link to="/journal">
        <section className="journal-link">
          <p className="journals">Journal</p>
          <img
            className="journal-icon"
            src={require("../../Assets/icons/journal.png")}
          />
        </section>
      </Link>

      <section className="stuck-forever-2">
        <div className="background description-box">
          <p className="description-dash">Image: {pics[picNum || 1].author}</p>
        </div>
        <div className="background time-box">
          <div className="time-boxes">
            <p className="time-dash">{time}</p>
            <p className="time-add-dash">{timeAdd}</p>
          </div>
          <p className="date-dash">{dateStr}</p>
        </div>
      </section>

      <section className="stuck-forevers">
        <div className="background temp-box">
          <p className="temp-dash">{temp}</p>
        </div>
        <div className="background weather-box">
          <div className="hi-lo-box">
            <img draggable="false" className="weather-icon" src={icon} />
            <p className="hiLo-dash">{hiLo}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default connect(null, { getDate })(withRouter(Dashboard));
