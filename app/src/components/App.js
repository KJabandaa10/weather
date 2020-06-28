import React from "react";
import { connect } from "react-redux";
import { getWeather } from "../actions";
import Input from "./Input";
import Current from "./Current";
import Row from "./Row";
import "../styles/app.css";

class App extends React.Component {
  renderRows = () => {
    const { data } = this.props;
    if (data) {
      return (
        <React.Fragment>
          <Row rowName="hourly" hourly={data.hourly} />
          <Row rowName="daily" daily={data.daily} />
        </React.Fragment>
      );
    }
    return null;
  };

  render() {
    return (
      <React.Fragment>
        <div className="container__app">
          <Input />
          <Current />
        </div>
        <div className="container__row">{this.renderRows()}</div>
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return { data: state.weatherReducer.data };
};

export default connect(mapState, { getWeather })(App);

// TODO: Use location
// TODO: Switch betweenn Celcius and Farenheight and Kelvin
// TODO: Conditional render with react-media for rows
// TODO: add buttons for desktop scrolling on cards (later)
// TODO: round temps to nearest int
