const operators = ["+", "-", "x", "/", "=", "AC"];
const digits = Array.from(Array(10).keys());

function generateCalculatorUI() {
    const operatorContainer = document.querySelector(".operatorContainer");
    operators.forEach(operator => {
        const button = document.createElement("button");
        button.textContent = operator;
        button.addEventListener("click", changeInputDisplay);
        button.id = operator;
        operatorContainer.appendChild(button);
    })
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

generateCalculatorUI();
