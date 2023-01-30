const NUMREGEX = /([0-9]|\.|ANS)/g;
const OPREGEX = /(\+|-|\*|\/|\(|\))/g;

/**
 * Function for converting string input to reverse polish notation via
 * Dijkstra's Shunting Yard Algorithm.
 * @param {string} val - String value to convert to RPN.
 * @param {string} ans - Previous answer that replaces ANS input.
 * @returns {Array} Queue containing operators and operands in RPN order
 */
function inputToRPN(val, ans) {
    var opsCounter = 0;

    var outQueue = [];
    var opStack = [];

    var nums = val.replace(OPREGEX, ",O,").split(",");
    var ops = val.replace(NUMREGEX, "");

    var inArray = [];
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === "O") {
            inArray.push(ops[opsCounter++]);
        } else if(nums[i] === "ANS") {
            inArray.push(ans);
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
 * Function for converting input to RPN and evaluating it.
 * @param {string} val - string value to convert to RPN and evaluate.
 * @returns {number} Final value of the equation.
 */
export default function evaluateRPN(val, ans) {
    const rpn = inputToRPN(val, ans);

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
