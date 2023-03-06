import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup ({ visible, closePopup, resignGame }: { visible: boolean, closePopup: () =>
        void, resignGame: () => void }) {
    function showLoseMessage(): void {
        alert('You lost - You resigned the game');
        closePopup();
    }

    return (
        <div className={`popup ${visible ? 'visible' : 'hidden'}`}>
            <div className="popup-content">
                <p>Are you sure you want to resign the game?</p>
                <button onClick={() => { resignGame(); showLoseMessage(); }}>Resign</button>
                <button onClick={closePopup}>Cancel</button>
            </div>
        </div>
    );
}

export default Popup