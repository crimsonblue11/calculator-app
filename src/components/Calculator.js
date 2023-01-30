import React from "react"
import NumberButton from "./NumberButton"
import evaluateRPN from "./logic"

export default function Calculator(props) {
    const [calcState, setCalcState] = React.useState("");
    const [answer, setAnswer] = React.useState("0");

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
        if(event.type === "click") {
            // from button
            setCalcState(prevState => prevState + event.target.value);
        } else {
            // from keyboard input, so need to sanity check
            const keyboardRegex = /[0-9]|\+|-|\*|\/|\(|\)|\.|\^/;

            if(keyboardRegex.test(event.key) === true) {
                setCalcState(prevState => prevState + event.key);
                event.preventDefault();
            } else if(event.key === "=" || event.key === "Enter") {
                equalsAction();
                event.preventDefault();
            }
        }
    }

    /**
     * Method to handle evaluating the input. Calls equalsAction, then
     * sets calcState and answer to this new value.
     */
    function equalsAction() {
        const ans = evaluateRPN(calcState, answer);

        setCalcState(ans);
        setAnswer(ans);
    }

    /**
     * Method to handle clearing the calculator screen. Sets calcState to empty
     * string.
     */
    function clearAction() {
        setCalcState("");
        // don't reset the answer, we still need it
    }

    // sets keydown listener on window to handle keyboard input
    // also cleanup function
    React.useEffect(() => {
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
            <input 
                type="text" 
                className="calculator--screen"
                value={calcState}
                readOnly={true}
            />
            <div className="calculator--input">
                <span className="number-row">
                    <NumberButton style={props.style} value={"1"} onClick={addToState} />
                    <NumberButton style={props.style} value={"2"} onClick={addToState} />
                    <NumberButton style={props.style} value={"3"} onClick={addToState} />
                    <NumberButton style={props.style} value={"4"} onClick={addToState} />
                    <NumberButton style={props.style} value={"5"} onClick={addToState} />
                    <NumberButton style={props.style} value={"6"} onClick={addToState} />
                    <NumberButton style={props.style} value={"7"} onClick={addToState} />
                    <NumberButton style={props.style} value={"8"} onClick={addToState} />
                    <NumberButton style={props.style} value={"9"} onClick={addToState} />
                    <NumberButton style={props.style} value={"0"} onClick={addToState} />
                    <NumberButton style={props.style} value={"("} onClick={addToState} />
                    <NumberButton style={props.style} value={")"} onClick={addToState} />
                    <NumberButton style={props.style} value={"."} onClick={addToState} />
                    <NumberButton style={props.style} value={"^"} onClick={addToState} />
                    <NumberButton style={props.style} value={"ANS"} onClick={addToState} />
                </span>
                <span className="calculator--functions">
                    <NumberButton style={props.style} value={"+"} onClick={addToState} />
                    <NumberButton style={props.style} value={"-"} onClick={addToState} />
                    <NumberButton style={props.style} value={"*"} onClick={addToState} />
                    <NumberButton style={props.style} value={"/"} onClick={addToState} />
                    <NumberButton style={props.style} value={"="} onClick={equalsAction} />
                </span>
                <span className="calculator--controls">
                    <button 
                        style={props.style}
                        onClick={() => setCalcState(prevState => prevState.slice(0, prevState.length - 1))}
                    >BACK</button>
                    <button 
                        style={props.style}
                        onClick={clearAction}
                    >CLEAR</button>
                </span>
            </div>
        </div>
    )
}
