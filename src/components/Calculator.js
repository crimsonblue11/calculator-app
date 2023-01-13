import React from "react"

export default function Calculator() {
    const [calcState, setCalcState] = React.useState("")
    const [answer, setAnswer] = React.useState(0)

    function addToState(event) {
        const {value} = event.target

        setCalcState(prevState => prevState + value)
    }

    function inputToRPN() {
        var opsCounter = 0

        var outQueue = []
        var opStack = []

        var nums = calcState.replace(/(\+|-|\*|\/|\(|\))/g, ",O,").split(",")
        var ops = calcState.replace(/([0-9]|\.)/g, "")

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
                    <span className="number-row">
                        <button value={"."} onClick={addToState}>.</button>
                        <button value={"ANS"} onClick={addToState}>ANS</button>
                    </span>
                </div>
                <div className="calculator--functions">
                    <button value={"+"} onClick={addToState}>+</button>
                    <button value={"-"} onClick={addToState}>-</button>
                    <button value={"*"} onClick={addToState}>*</button>
                    <button value={"/"} onClick={addToState}>/</button>
                    <button onClick={equalsAction}>=</button>
                </div>
                <div className="calculator--controls">
                    <button 
                        onClick={() => setCalcState(prevState => prevState.slice(0, prevState.length - 1))}
                    >BACK</button>
                    <button 
                        onClick={clearAction}
                    >CLEAR</button>
                </div>
            </div>
        </div>
    )
}
