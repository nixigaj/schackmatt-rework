import React from "react";

interface TimerProps {

}

interface TimeState {
    minutes: number
    seconds: number
}

export class Timer extends React.Component {
    constructor(props: TimerProps) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.time = {minutes: 0, seconds: 0};

    }


    time: TimeState

    startTimer() {
        let countdown = setInterval(function () {
            let minutes = Math.floor(starttime / 60);
            let seconds = starttime % 60;
            let clocktime = (this.state.minutes < 10 ? "0" + this.state.minutes : this.state.minutes) + ":" + (this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds);


        1000});
    }


    render() {
        return (
            <div id="timerContainer">
                <div id="p1container">
                    <code id="timeDisplay">{clocktime}</code>
                </div>
                <div id="p2container">
                    <code id="timeDisplay">00:00</code>
                </div>
                <button onClick={this.startTimer}>Start timer</button>
            </div>
        );
    }
}