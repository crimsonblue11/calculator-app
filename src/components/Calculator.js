import {React, useState, useEffect} from "react"
import NumberButton from "./NumberButton"
import evaluateRPN from "./logic"
import {ImCross} from "react-icons/im"

export default function Calculator({isNight}) {
    const [calcState, setCalcState] = useState("");
    const [answer, setAnswer] = useState("0");
    const [displayOutput, setDisplayOutput] = useState(false);
    const [error, setError] = useState("");

    /**
     * Adds an operator or operand to calcState depending on 
     * type and value of event received. Can also evaluate by calling
     * equalsAction.
     * @param {Event} event - event representing user input. This could be a click
     * event, in which case the input is from a button and is simply added to the
     * state, or a keyboardEvent, in which case the input is sanitised and then
     * handled.
     */
    function addToState(event) {
        const {type, target, key} = event;
        const {value} = target;

        if(displayOutput) {
            setDisplayOutput(false);
        }

        if(type === "click") {
            // from button
            if(value === "Ans") {
                setCalcState(prevState => prevState + "A");
            } else {
                setCalcState(prevState => prevState + value);
            }
        } else {
            // from keyboard input, so need to sanity check
            const keyboardRegex = /[0-9]|\+|-|\*|\/|\(|\)|\.|\^|A/;

            if(keyboardRegex.test(key)) {
                // case for regular input (i.e. numbers or operators)
                setCalcState(prevState => prevState + key);
                event.preventDefault();
            } else if(key === "=" || key === "Enter") {
                // case for "=" or enter i.e. evaluation
                equalsAction();
                event.preventDefault();
            } else if(key === "Backspace") {
                // case for backspace
                backAction();
            }
        }
    }

    /**
     * Function to handle evaluating the input. 
     * Calls equalsAction, then sets calcState and answer to 
     * the returned value.
     */
    function equalsAction() {
        setError("");
        const ans = evaluateRPN(calcState, answer);

        if(isNaN(ans)) {
            setError("Error: Incorrect syntax");
        } else {
            setAnswer(ans);
            setDisplayOutput(true);
        }
    }

    /**
     * Function to handle clearing the calculator screen. 
     * Sets calcState to an empty string.
     * Notably answer is not reset, since users might still
     * need it in other equations.
     */
    function clearAction() {
        setDisplayOutput(false);
        setCalcState("");
    }

    /**
     * Function to handle removing the last character of 
     * calcState.
     */
    function backAction() {
        setDisplayOutput(false);
        setCalcState(prevState => prevState.slice(0, prevState.length - 1));
    }

    // sets keydown listener on window to handle keyboard input
    // also cleanup function
    useEffect(() => {
        function watchKeys(event) {
            addToState(event);
        }

        window.addEventListener('keydown', watchKeys);

        return function() {
            window.removeEventListener('keydown',watchKeys);
        }
    })

    return (
        <div className="calculator">
            {error && 
                <div className="error-box">
                    <ImCross className="error--icon" onClick={() => setError("")} />
                    <p>{error}</p>
                </div>
            }
            <div className={isNight ? "calculator--screen--night" : "calculator--screen--day"}>
                <p className="calculator--screen--input">{calcState}</p>
                <p className="calculator--screen--output">
                    {
                        displayOutput && "=" + answer
                    }
                </p>
            </div>
            <div className="calculator--input">
                <span className={isNight ? "number-row--night" : "number-row--day"}>
                    <NumberButton value={"1"} onClick={addToState} />
                    <NumberButton value={"2"} onClick={addToState} />
                    <NumberButton value={"3"} onClick={addToState} />
                    <NumberButton value={"4"} onClick={addToState} />
                    <NumberButton value={"5"} onClick={addToState} />
                    <NumberButton value={"6"} onClick={addToState} />
                    <NumberButton value={"7"} onClick={addToState} />
                    <NumberButton value={"8"} onClick={addToState} />
                    <NumberButton value={"9"} onClick={addToState} />
                    <NumberButton value={"0"} onClick={addToState} />
                    <NumberButton value={"("} onClick={addToState} />
                    <NumberButton value={")"} onClick={addToState} />
                    <NumberButton value={"."} onClick={addToState} />
                    <NumberButton value={"^"} onClick={addToState} />
                    <NumberButton value={"Ans"} onClick={addToState} />
                </span>
                <span className={isNight ? "number-row--night" : "number-row--day"}>
                    <NumberButton value={"+"} onClick={addToState} />
                    <NumberButton value={"-"} onClick={addToState} />
                    <NumberButton value={"*"} onClick={addToState} />
                    <NumberButton value={"/"} onClick={addToState} />
                    <NumberButton value={"="} onClick={equalsAction} />
                </span>
                <span className={isNight ? "number-row--night" : "number-row--day"}>
                    <button
                        onClick={backAction}
                    >BACK</button>
                    <button
                        onClick={clearAction}
                    >CLEAR</button>
                </span>
            </div>
        </div>
    )
}
