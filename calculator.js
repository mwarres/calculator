const operators = ["+", "-", "x", "/", "="];
const digits = Array.from(Array(10).keys());

function generateCalculatorUI() {
    // Generate buttons for the mathematical operators.
    const operatorContainer = document.querySelector(".operatorContainer");
    operators.forEach(operator => {
        const button = document.createElement("button");
        button.textContent = operator;
        button.addEventListener("click", changeInputDisplay);
        button.id = operator;
        operatorContainer.appendChild(button);
    })

    // Generate a clear button to clear calculator's input.
    const clearButton = document.createElement("button");
    clearButton.textContent = "AC";
    clearButton.addEventListener("click", clear);
    operatorContainer.appendChild(clearButton);

    // Generate buttons for digits 0-9.
    const digitContainer = document.querySelector(".digitContainer");
    digits.forEach(digit => {
        const button = document.createElement("button");
        button.textContent = digit;
        button.addEventListener("click", changeInputDisplay);
        button.id = digit;
        digitContainer.appendChild(button);
    })
}

function changeInputDisplay(e) {
    const calculatorInput = document.querySelector(".calculatorInput");
    const currInput = calculatorInput.textContent ? calculatorInput.textContent : "";
    const lastElem = currInput[currInput.length - 1];
    const nextElem = e.target.id;
    const spaces = digits.includes(parseInt(lastElem, 10)) && digits.includes(parseInt(nextElem, 10)) ? "" : " ";
    calculatorInput.textContent = currInput + spaces + nextElem;
}

function clear() {
    const calculatorInput = document.querySelector(".calculatorInput");
    calculatorInput.textContent = "";
}

generateCalculatorUI();
