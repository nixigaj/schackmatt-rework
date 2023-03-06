import React from "react";
import {Simulate} from "react-dom/test-utils";
import playing = Simulate.playing;

interface TimerProps {

}

interface TimeState {
    minutes: number
    seconds: number

    clocktime: string

    starttime: number
}
type PlayerState = "p1" | "p2";


export class Timer extends React.Component {
    timeP1: TimeState
    timeP2: TimeState
    playerstate: PlayerState
    constructor(props: TimerProps) {
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.timeP1 = {minutes: 0, seconds: 0, clocktime: "00:00", starttime: 180};
        this.playerstate = "p1"
        this.timeP2 = {minutes: 0, seconds: 0, clocktime: "00:00", starttime: 180};


    }


    playerswap(): void {
        if (this.playerstate === "p1") {
            this.playerstate = "p2";

        } else {

            this.playerstate = "p1"
        }
    }



    startTimer() {
        const self = this
        let countdown = setInterval(function (): void {
            self.time.minutes =  Math.floor(this.time.starttime / 60);
            this.time.seconds =  this.time.starttime % 60;
           this.time.clocktime = (this.time.minutes < 10 ? "0" + this.time.minutes : this.time.minutes) + ":"
               + (this.time.seconds < 10 ? "0" + this.time.seconds : this.time.seconds);

           if (this.playerstate === "p1") {

           }


        }, 1000);
    }


    render() {
        return (
            <div id="timerContainer">
                <div id="p1container">
                    <code id="timeDisplay">{this.timeP1.clocktime}</code>
                </div>
                <div id="p2container">
                    <code id="timeDisplay">00:00</code>
                </div>
                <button onClick={this.startTimer}>Start timer</button>
            </div>
        );
    }
}