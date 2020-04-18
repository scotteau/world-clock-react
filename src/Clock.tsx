import React from "react";
import moment from "moment-timezone";

interface myProps {
  city?: string;
}

interface myState {}

class Clock extends React.Component<myProps, myState> {
  state = { time: new Date(), date: new Date() };
  timer: any;

  renderTime() {
    const display = this.state.time
      .toLocaleTimeString("en-US", { hour12: false })
      .split(":");
    return display.map((d, index) => <span key={index}>{d}</span>);
  }

  renderDate() {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const date = this.state.time
      .toLocaleDateString("en-US", options)
      .split(",");
    return date.map((d, index) => <span key={index}>{d}</span>);
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.renderDate()}
        {this.renderTime()}
      </div>
    );
  }

  determineTimezone(city: string) {
    if (city && city!=='') {
      const name = moment.tz.names().filter((name) => name.includes(city));
      const time = moment.tz( name[0]);

      const options = {weekday: 'short', month:'short', day: 'numeric', year: 'numeric'};

      console.log(time.format());
    }
  }

  updateTime(): void {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentDidMount(): void {
    this.updateTime();
    this.determineTimezone("Perth");
  //  todo: find a way to format the string to normal date time string
  }

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }
}

export default Clock;
