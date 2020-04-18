import React from "react";
import moment from "moment-timezone";

interface myProps {
  city: string;
}

interface myState {
  dateDisplay: string;
  timeDisplay: string;
}

class Clock extends React.Component<myProps, myState> {
  state = { dateDisplay: "", timeDisplay: "" };
  timer: any;

  renderTime() {
    const display = this.state.timeDisplay.split(":");
    return display.map((d, index) => <span key={index}>{d}</span>);
  }

  render(): React.ReactNode {
    return (
      <div>
        <p>{this.props.city}</p>
        <p>{this.state.dateDisplay}</p>
        <p>{this.renderTime()}</p>
      </div>
    );
  }

  determineTimezone(city: string) {
    if (city && city !== "") {
      const name = moment.tz.names().filter((name) => name.includes(city));
      const result = moment.tz(name[0]);
      const wholeDate = result.format().split("T");

      const time = wholeDate[1].slice(0, 8);
      const date = new Date(wholeDate[0]).toDateString();

      this.setState({ dateDisplay: date });
      this.setState({ timeDisplay: time });
    }
  }

  updateTime(): void {
    this.timer = setInterval(() => {
      this.determineTimezone(this.props.city);
    }, 1000);
  }

  componentDidMount(): void {
    this.updateTime();
    this.determineTimezone(this.props.city);
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }
}

export default Clock;
