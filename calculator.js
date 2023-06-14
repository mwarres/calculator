// Note: Duplicating functions in util.js as a temporary work around. TODO: fix
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num2 === 0 ? "You can't divide by zero, dummy!" : num1 / num2;
}

function operate(num1, operator, num2) {
    switch(operator)  {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            return "Please either add, subtract, multiply, or divide!";
    }
}

class Calculator {
    constructor() {
        this.submission = [];
        this.operators = ["+", "-", "x", "/"];
        this.digits = Array.from(Array(10).keys());
        this.generateCalculatorUI();
    }

    generateCalculatorUI() {
        // Generate buttons for the mathematical operators.
        const operatorContainer = document.querySelector(".operatorContainer");
        this.operators.forEach(operator => {
            const button = document.createElement("button");
            button.textContent = operator;
            button.addEventListener("click", this.handleInput.bind(this));
            button.id = operator;
            operatorContainer.appendChild(button);
        })

        // Generate "=" button.
        const equalsButton = document.createElement("button");
        equalsButton.textContent = "=";
        equalsButton.addEventListener("click", this.submit.bind(this));
        operatorContainer.appendChild(equalsButton);

        // Generate a clear button to clear calculator's input.
        const clearButton = document.createElement("button");
        clearButton.textContent = "AC";
        clearButton.addEventListener("click", this.clear.bind(this));
        operatorContainer.appendChild(clearButton);

        // Generate buttons for digits 0-9.
        const digitContainer = document.querySelector(".digitContainer");
        this.digits.forEach(digit => {
            const button = document.createElement("button");
            button.textContent = digit;
            button.addEventListener("click", this.handleInput.bind(this));
            button.id = digit;
            digitContainer.appendChild(button);
        })
    }

    handleInput(e) {
        const nextElem = e.target.id;
        const submissionLen = this.submission.length;
        if (submissionLen && Boolean(parseInt(nextElem, 10)) && Boolean(parseInt(this.submission[submissionLen - 1]))) {
            this.submission[submissionLen - 1] = this.submission[submissionLen - 1] + nextElem;
        } else {
            this.submission.push(nextElem);
        }
        const calculatorDisplay = document.querySelector(".calculatorDisplay");
        calculatorDisplay.textContent = this.submission.join(" ");
    }

    submit() {
        if (this.verifyValidSubmission(this.submission)){
            const calculatorDisplay = document.querySelector(".calculatorDisplay");
            calculatorDisplay.textContent = this.calculateOutput(this.submission);
        } else {
            alert("Please provide a valid input");
        }
    }

    // The input, submission, is a string array of numbers and/or operators
    verifyValidSubmission(submission) {
        /* In order for a submission to be valid, we need to guarantee that:
        * 1. The length of the submission is odd (meaning we start and end with a
        * number)
        * 2. We start with a number and alternate between numbers and operators
        */
        if (submission.length % 2 === 0) return false;
        for (let i = 0; i < submission.length; i++) {
            if (i % 2 === 0) {
                if (!Boolean(parseInt(submission[i], 10))) return false;
            } else {
                if (!this.operators.includes(submission[i])) return false;
            }
        }
        return true;
    }

    calculateOutput(submission) {
        /* On the first pass, deal with multiplication and division to preserve
         * order of operations.
         */
        for (let i = 0; i < submission.length; i++) {
            const currElem = submission[i];
            if (currElem === "x" || currElem === "/") {
                const calculatedChunk = operate(parseInt(submission[i - 1], 10), currElem, parseInt(submission[i + 1], 10));
                submission.splice(i - 1, 3, calculatedChunk);
                i--;
            }
        }
        /* On second pass, use reduce and the operator function to calculate the
         * final output.
         */
        while (submission.length > 1) {
            const calculatedChunk = operate(parseInt(submission[0], 10), submission[1], parseInt(submission[2], 10));
            submission.splice(0, 3, calculatedChunk);
        }
        return submission;
    }

    clear() {
        this.submission = [];
        const calculatorDisplay = document.querySelector(".calculatorDisplay");
        calculatorDisplay.textContent = this.submission.join(" ");
    }
}

new Calculator();
