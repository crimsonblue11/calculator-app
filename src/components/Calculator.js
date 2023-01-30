import React from "react"
import NumberButton from "./NumberButton"

export default function Calculator(props) {
    const [calcState, setCalcState] = React.useState("");
    const [answer, setAnswer] = React.useState("0");

    const NUMREGEX = /([0-9]|\.|ANS)/g;
    const OPREGEX = /(\+|-|\*|\/|\(|\))/g;

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
            const keyboardRegex = /[0-9]|\+|-|\*|\/|\(|\)|\./;

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
     * Function for converting string input to reverse polish notation via
     * Dijkstra's Shunting Yard Algorithm.
     * @returns {Array} Queue containing operators and operands in RPN order
     */
    function inputToRPN() {
        var opsCounter = 0;

        var outQueue = [];
        var opStack = [];


        var nums = calcState.replace(OPREGEX, ",O,").split(",");
        var ops = calcState.replace(NUMREGEX, "");

        var inArray = [];
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] === "O") {
                inArray.push(ops[opsCounter++]);
            } else if(nums[i] === "ANS") {
                inArray.push(answer);
            } else if(nums[i] !== "") { 
                // fix for error caused by split treating the gap between ops and brackets as an element
                inArray.push(nums[i]);
            }
        }

        for(let i = 0; i < inArray.length; i++) {
            const curr = inArray[i];

            if(curr === "(") {
                // opening parenthesis always pushed to ops
                opStack.push(curr);
            } else if(curr === ")") {
                // closing parenthesis pops all ops until next opening parenthesis
                var peek = opStack.pop();

                while(peek !== "(") {
                    outQueue.push(peek);
                    peek = opStack.pop();
                }

            } else if(isNaN(parseInt(curr, 10))) {
                // operator case
                // test precedence and place appropriately
                
                var canPopOperators = precedenceOf(curr) < precedenceOf(opStack[opStack.length - 1]) 
                    || (precedenceOf(curr) === precedenceOf(opStack[opStack.length - 1]) 
                    && isLeftAssoc(curr))

                while(opStack[opStack.length - 1] !== undefined && canPopOperators) {
                        outQueue.push(opStack.pop());
                    }
                opStack.push(curr);
            } else {
                // operand case, always pushed to output
                outQueue.push(curr);
            }
        }

        // pop all remaining operators from the stack
        while(opStack.length !== 0) {
            outQueue.push(opStack.pop());
        }

        return outQueue;
    }

    /**
     * Function for returning precedence of an operator.
     * @param {string} op - Operator to test precedence of.
     * @returns {number} Either a numerical representation of the input operator's
     * precedence, or undefined if invalid.
     */
    function precedenceOf(op) {
        let ret;

        switch(op) {
            case "*":
            case "/":
                ret = 2;
                break;
            case "+":
            case "-":
                ret = 1;
                break;
            default:
                ret = undefined;
        }

        return ret;
    }

    /**
     * Method for determining if an operator is left assocative or not.
     * @param {string} op - Operator to test.
     * @returns {boolean} True if the operator is left associative, false if 
     * otherwise.
     */
    function isLeftAssoc(op) {
        return (op === "+" || op === "-" 
            || op === "*" || op === "/");
    }

    /**
     * Function for evaluating an equation with two operands based on operator 
     * value.
     * @param {number} op1 - First (leftmost) operand of the equation.
     * @param {number} op2 - Second (rightmost) operand of the equation.
     * @param {string} operator - Operator of the equation.
     * @returns {number} Evaluated value of the equation.
     */
    function evaluateOperator(op1, op2, operator) {
        let ret = 0;

        switch(operator) {
            case "+":
                ret = op1 + op2;
                break;
            case "-":
                ret = op1 - op2;
                break;
            case "*":
                ret = op1 * op2;
                break;
            case "/":
                ret = op1 / op2;
                break;
            default:
                ret = NaN;
                break;
        }

        return ret;
    }

    /**
     * Function for evaluating RPN equation.
     * @returns {number} Final value of the equation.
     */
    function evaluateRPN() {
        const rpn = inputToRPN();

        const operands = [];

        for(let i = 0; i < rpn.length; i++) {
            const curr = rpn[i];
            const currNum = parseFloat(curr);

            if(isNaN(currNum)) {
                // operator case, since NaN

                // need to do these in reverse, since operand stack is LIFO
                const op2 = operands.pop();
                const op1 = operands.pop();

                const opNew = evaluateOperator(op1, op2, curr);

                operands.push(opNew);
            } else {
                // else, operand case
                operands.push(currNum);
            }
        }

        // output is the only value (hopefully) in the operand stack
        const out = parseFloat(operands[0].toFixed(3));

        return out;
    }

    /**
     * Method to handle evaluating the input. Calls equalsAction, then
     * sets calcState and answer to this new value.
     */
    function equalsAction() {
        const ans = evaluateRPN();

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


    // block to set keydown listener on window for keyboard input
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
