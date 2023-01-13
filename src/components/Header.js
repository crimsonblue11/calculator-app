import React from "react"

export default function Header(props) {
    return (
        <header>
            <div className="header--tabcontainer">
                <button 
                    onClick={props.onClick} 
                    className="header--tab" 
                    value={0}>
                    Calculator
                </button>
                <button 
                    onClick={props.onClick} 
                    className="header--tab" 
                    value={1}>
                    About
                </button>
            </div>
        </header>
    )
}