import React from "react"

export default function NumberButton({value, onClick}) {

    return (
        <button
            value={value}
            onClick={onClick}
        >
            {value}
        </button>
    )
}