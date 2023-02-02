import React from "react"

export default function Header({isNight, onClick, nightToggle}) {
    return (
        <header className={isNight ? "header--night" : "header--day"}>
            <div className="header--tabcontainer">
                <button
                    onClick={onClick} 
                    className={isNight ? "header--tab--night" : "header--tab--day"} 
                    value={0}>
                    Calculator
                </button>
                <button
                    onClick={onClick} 
                    className={isNight ? "header--tab--night" : "header--tab--day"}
                    value={1}>
                    About
                </button>
            </div>
            <span className="header--toggle">
                <label htmlFor="nightmode-toggle">Night mode</label>
                <input
                    id="night-toggle"
                    type="checkbox"
                    value={isNight}
                    onChange={nightToggle}
                />
            </span>
        </header>
    )
}