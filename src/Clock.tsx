import React from "react";

interface myProps {

}

interface myState {

}

class Clock extends React.Component<myProps, myState> {
    state = {time: new Date()};
    timer: any;

    renderTime(){
        const display = this.state.time.toLocaleTimeString('en-US', {hour12: false}).split(':');
        return display.map((d, index) => <span key={index}>{d}</span> );
    }

    renderDate(){
        const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const date = this.state.time.toLocaleDateString('en-US', options).split(',');
        return date.map((d,index) => <span key={index}>{d}</span> )
    }



    render(): React.ReactNode {
        return (
            <div>
                {this.renderDate()}
                {this.renderTime()}
            </div>
        )
    }

    updateTime():void {
        this.timer = setInterval(() => {
            this.setState({time: new Date()})
        }, 1000 );
    }

    componentDidMount(): void {
        this.updateTime();
    }

    componentWillUnmount(): void {
        clearInterval(this.timer);
    }

}

export default Clock;
