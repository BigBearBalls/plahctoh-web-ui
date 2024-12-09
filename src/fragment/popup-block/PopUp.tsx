import React from 'react';
import {observer} from "mobx-react-lite";
import {popUpStore} from "../../Context";
import "./PopUpStyle.css"
import {Type} from "./Type";

function PopUp() {

    const closeHandler = () => {
        popUpStore.enabled = false;
    }

    return (
        <>
            {popUpStore.enabled && <div className={`${Type[popUpStore.type].toLowerCase()} pop-up`}>
                <div className="close-btn" onClick={closeHandler}>x</div>
                <p className="message">{popUpStore.message}asd</p>
            </div>}
        </>
    );
}

export default observer(PopUp);