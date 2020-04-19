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
    return display.map((d,index) => {

      return [
        <span className={"digit"} key={index}>{d}</span>,
        <span className={'colon'} key={`colon${index}`}>{index<2?':':''}</span>
      ]
    });
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

  render(): React.ReactNode {
    return (
        <div className={'clock'}>
          <h3 className={"clock__title"}>{this.props.city}</h3>
          <p className={"clock__body__date"}>{this.state.dateDisplay}</p>
          <div className={"clock__body"}>
            <p className={"clock__body__time"}>{this.renderTime()}</p>
          </div>
        </div>
    );
  }
}

export default Clock;
