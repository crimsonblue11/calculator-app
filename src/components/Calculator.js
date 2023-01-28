import React from "react"
import NumberButton from "./NumberButton"

export default function Calculator(props) {
    const [calcState, setCalcState] = React.useState("")
    const [answer, setAnswer] = React.useState("0")

    function addToState(event) {
        const {value} = event.target

        setCalcState(prevState => prevState + value)
    }

    function inputToRPN() {
        var opsCounter = 0

        var outQueue = []
        var opStack = []

        var nums = calcState.replace(/(\+|-|\*|\/|\(|\))/g, ",O,").split(",")
        var ops = calcState.replace(/([0-9]|\.|ANS)/g, "")

        var inArray = []
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] === "O") {
                inArray.push(ops[opsCounter++])
            } else if(nums[i] === "ANS") {
                inArray.push(answer)
            } else if(nums[i] !== "") { 
                // fix for error caused by split treating the gap between ops and brackets as an element
                inArray.push(nums[i])
            }
        }

        console.log(inArray)

        for(let i = 0; i < inArray.length; i++) {
            const curr = inArray[i]

            if(curr === "(") {
                // opening parenthesis always pushed to ops
                
                opStack.push(curr)
            } else if(curr === ")") {
                // closing parenthesis pops all ops between it and the next opening parenthesis
                // keep popping operators until an opening parenthesis has been found
                    // if found, pop "(" from ops and finish
                    // else, pop from ops to output

                var peek = opStack.pop()
                while(peek !== "(") {
                    outQueue.push(peek)
                    peek = opStack.pop()
                }

            } else if(isNaN(parseInt(curr, 10))) {
                // operator case
                
                while(opStack[opStack.length - 1] !== undefined
                    && (precedenceOf(curr) < precedenceOf(opStack[opStack.length - 1])
                        || (precedenceOf(curr) === precedenceOf(opStack[opStack.length - 1]) 
                            && isLeftAssoc(curr)))) {
                        outQueue.push(opStack.pop())
                    }
                opStack.push(curr)
            } else {
                // else, number case
                // numbers are always pushed to output
                outQueue.push(curr)
            }
        }

        // pop all remaining operators from the stack
        while(opStack.length !== 0) {
            outQueue.push(opStack.pop())
        }

        return outQueue
    }

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

        return ret
    }

    function isLeftAssoc(op) {
        return (op === "+" || op === "-" 
            || op === "*" || op === "/")
    }

    function evaluateOperator(op1, op2, operator) {
        let ret = 0

        switch(operator) {
            case "+":
                ret = op1 + op2
                break
            case "-":
                ret = op1 - op2
                break
            case "*":
                ret = op1 * op2
                break
            case "/":
                ret = op1 / op2
                break
            default:
                ret = NaN
                break
        }

        return ret
    }

    function evaluateRPN() {
        const rpn = inputToRPN()

        const operands = []

        for(let i = 0; i < rpn.length; i++) {
            const curr = rpn[i]
            const currNum = parseFloat(curr)

            if(isNaN(currNum)) {
                if(operands.length < 2) {
                    console.log("Error - bad input")
                }

                const op1 = operands.pop()
                const op2 = operands.pop()

                const opNew = evaluateOperator(op1, op2, curr)

                operands.push(opNew)
            } else {
                operands.push(currNum)
            }
        }

        const out = parseFloat(operands[0].toFixed(3))

        return out

        // loop through output
        // if number, add to operands
        // if operator, evaluate the last two operands
    }

    function equalsAction() {
        const ans = evaluateRPN()

        setCalcState(ans)
        setAnswer(ans)
    }

    function clearAction() {
        setCalcState("")
        // don't reset the answer, we still need it
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
