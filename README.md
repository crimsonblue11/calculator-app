# Calculator App

A simple calculator app created using React.js

The calculator uses Dijkstra's [Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm) to convert infix input to postfix for evaluation. This is returned as an array of operands and operators. 

Evaluation is handled by looping through each member of the array of operands and operators. If the member is an operand, it is pushed to a stack of all operands. If the member is an operator, two operands are popped from the stack, and the specified operation is performed on them, with the result pushed back to the stack. At the end there will only be one operand left, which will be the answer to the input equation.

## Installation
This project was created using `npx create-react-app`, so installation should be as simple as pulling the repository and running `npm start` in the directory. If not, there might be some React dependencies I forgot about. Let me know!

Written and maintained by Conor Dempsey
