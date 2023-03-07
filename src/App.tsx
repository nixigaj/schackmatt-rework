import './App.css';
import './popup.css';
import React, { useState } from 'react';
import { Chess, Square, Move } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Timer } from "./timer"
import {GameSounds} from "./audio";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Popup from './popup';
import {root as appRoot} from "./index";

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


interface ShortMove {
    from: Square;
    to: Square;
    promotion?: string;
}

function App() {

    const timer: Timer = new Timer({})
    timer.startTimer()

    const audio: GameSounds = new GameSounds()

    const [game, setGame] = useState(new Chess());
    const gameCopy: Chess = Object.create(game);

    function makeAMove(move: ShortMove | string) : Move | null {
        console.log(move);
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    // This creates a completely random move with no intelligence
    function makeRandomMove() {
        const possibleMoves = gameCopy.moves() as string[];
        if (gameCopy.isGameOver() || gameCopy.isDraw() || possibleMoves.length === 0)
            return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: Square, targetSquare: Square): boolean {
        const gameCopy: Chess = Object.create(game);
        if (makeAMove({ from: sourceSquare, to: targetSquare })) {
            //makeRandomMove();
            audio.playMove()
            appRoot.render(<Example/>)
            return true;
        } else if (makeAMove({ from: sourceSquare, to: targetSquare, promotion: 'q' })) {
            //makeRandomMove();
            audio.playMove()
            return true;
        } else {
            return false;
        }
    }

    const [visible, setVisible] = useState(false);

    function showPopup(): void {
        setVisible(true);
    };

    function closePopup(): void {
        setVisible(false);
    };

    function resignGame(): void {
        // resign game logic
    };

    return (
        <div id="main-content">
            <div id="headerbar">
                <div id="logo-title">
                    ♟ schackmatt
                </div>
                <div id="timer1">
                    <Timer />
                </div>
            </div>
            <div id="chess-pane">
                Here is game information
                <div id="chessboard">
                    <Chessboard position={game.fen()} onPieceDrop={onDrop} />
                </div>
            </div>


            <div id="timer-container">
                <div id="timer">03:00</div>
            </div>

            <div id="timer-container1">
                <div id="timer1">03:00</div>
            </div>


            <div id="confirm_Btn" title="Resign?"><div id="myDialogText"></div>
            </div>

            <div id="dialog-confirm" title="You lost - you resigned the game">

            <div>
                <button id="timer_start_Btn">START GAME</button>
                <button onClick={showPopup}>RESIGN</button>
                <Popup visible={visible} closePopup={closePopup} resignGame={resignGame} />
                <button id="startBtn">START POSITION</button>
                <button id="clearBtn">CLEAR BOARD</button>
            </div>
        </div>
    );
}




export default App;
