import React from "react"

export default function Calculator() {
    return (
        <div className="calculator">
            <input 
                type="text" 
                className="calculator--screen" 
            />
            <div className="calculator--input">
                <div className="calculator--numbers">
                    <span className="number-row">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </span>
                    <span className="number-row">
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </span>
                    <span className="number-row">
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                    </span>
                    <span className="number-row">
                            <button>.</button>
                            <button>&#40;</button>
                            <button>&#41;</button>
                    </span>
                </div>
                <div className="calculator--functions">
                    <button>+</button>
                    <button>-</button>
                    <button>*</button>
                    <button>/</button>
                    <button>=</button>
                </div>
                <div className="calculator--controls">
                    <button>BACK</button>
                    <button>CLEAR</button>
                </div>
            </div>
        </div>
    )
}
