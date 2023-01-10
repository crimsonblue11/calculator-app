import React from "react"

export default function Calculator() {
    const [calcState, setCalcState] = React.useState("")

    function addToState(event) {
        const {value} = event.target

        setCalcState(prevState => prevState + value)
    }

    return (
        <div className="calculator">
            <input 
                type="text" 
                className="calculator--screen"
                value={calcState}
                readOnly={true}

            />
            <div className="calculator--input">
                <div className="calculator--numbers">
                    <span className="number-row">
                        <button value={"1"} onClick={addToState}>1</button>
                        <button value={"2"} onClick={addToState}>2</button>
                        <button value={"3"} onClick={addToState}>3</button>
                    </span>
                    <span className="number-row">
                        <button value={"4"} onClick={addToState}>4</button>
                        <button value={"5"} onClick={addToState}>5</button>
                        <button value={"6"} onClick={addToState}>6</button>
                    </span>
                    <span className="number-row">
                        <button value={"7"} onClick={addToState}>7</button>
                        <button value={"8"} onClick={addToState}>8</button>
                        <button value={"9"} onClick={addToState}>9</button>
                    </span>
                    <span className="number-row">
                            <button value={"0"} onClick={addToState}>0</button>
                            <button value={"("} onClick={addToState}>&#40;</button>
                            <button value={")"} onClick={addToState}>&#41;</button>
                    </span>
                </div>
                <div className="calculator--functions">
                    <button value={"+"} onClick={addToState}>+</button>
                    <button value={"-"} onClick={addToState}>-</button>
                    <button value={"*"} onClick={addToState}>*</button>
                    <button value={"/"} onClick={addToState}>/</button>
                    <button>=</button>
                </div>
                <div className="calculator--controls">
                    <button 
                        onClick={() => setCalcState(prevState => prevState.slice(0, prevState.length - 1))}
                    >BACK</button>
                    <button 
                        onClick={() => setCalcState("")}
                    >CLEAR</button>
                </div>
            </div>
        </div>
    )
}
