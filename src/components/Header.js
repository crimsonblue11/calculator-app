import React from "react"

export default function Header(props) {
    return (
        <header className={props.colorMode}>
            <div className="header--tabcontainer">
                <button
                    onClick={props.onClick} 
                    className="header--tab" 
                    value={0}
                    style={props.style}>
                    Calculator
                </button>
                <button
                    style={props.style}
                    onClick={props.onClick} 
                    className="header--tab" 
                    value={1}>
                    About
                </button>
            </div>
            <span className="header--toggle">
                <label htmlFor="nightmode-toggle">Night mode</label>
                <input
                    id="night-toggle"
                    type="checkbox"
                    value={props.isNight}
                    onChange={props.nightToggle}
                />
            </span>
        </header>
    )
}