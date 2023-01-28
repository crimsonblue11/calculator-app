import React from "react"

export default function NumberButton(props) {

    return (
        <button
            className="numberButton"
            style={props.style}
            value={props.value}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}