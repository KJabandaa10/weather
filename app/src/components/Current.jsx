import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import sunriseIcon from "../suntimes/sunrise.svg";
import sunsetIcon from "../suntimes/sunset.svg";
import "../styles/current.css";

class Current extends React.Component {
  renderSuntimes = (sr, ss) => {
    let now = moment();
    let sunriseTime = moment.unix(sr);
    let sunrise = sunriseTime.fromNow();
    let sunsetTime = moment.unix(ss);
    let sunset = now.to(sunsetTime);
    return (
      <div className="suntimes__grid">
        <div className="suntimes__sunrise suntimes__padding-align">
          <img
            style={{ maxWidth: "50px", maxHeight: "auto" }}
            src={sunriseIcon}
            alt="sunrise"
          />{" "}
          {sunrise}
        </div>
        <div className="suntimes__sunset suntimes__padding-align">
          <img
            style={{ maxWidth: "50px", maxHeight: "auto" }}
            src={sunsetIcon}
            alt="sunset"
          />{" "}
          {sunset}
        </div>
      </div>
    );
  };

  renderIcon = code => {
    if (code) {
      return (
        <img className="owm-icon"
          src={`http://openweathermap.org/img/wn/${code}@2x.png`}
          alt="weather icon"
        />
      );
    }
    return (
      <img className="owm-icon"
        src="http://openweathermap.org/img/wn/03n@2x.png"
        alt="weather icon"
      />
    );
  };

  renderTemp = () => {
    const { data } = this.props;
    if (data) {
      return (
        <div className="current__temps">
          <div className="current__main-icon">
            {this.renderIcon(data.current.weather[0].icon)}
          </div>
          <div className="current__temp">{data.current.temp}℃</div>
          <div className="current__feelslike">
            Feels like {data.current.feels_like}℃
          </div>
        </div>
      );
    } // TODO: Change current__main-icon to my own icons
  };

  render() {
    const { data } = this.props;
    if (data) {
      return (
        <div className="current-container current-font">
          {this.renderTemp()}
          {this.renderSuntimes(data.current.sunrise, data.current.sunset)}
          <div className="current__clouds-grid">
            <div className="clouds-percent">{data.current.clouds}%</div>
            <div className="clouds-description">
              {data.current.weather[0].description}
            </div>
            <div className="clouds-icon">
              {this.renderIcon(data.current.weather[0].icon)}
            </div>
          </div>
        </div>
      );
    }
    return <div>Enter location in search</div>;
  }
}

const mapStateToProps = state => {
  return { data: state.weatherReducer.data };
};

export default connect(mapStateToProps)(Current);
