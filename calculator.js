function generateCalculatorUI() {
    const operatorContainer = document.querySelector(".operatorContainer");
    const operators = ["+", "-", "x", "/", "="];
    operators.forEach(operator => {
        const button = document.createElement("button");
        button.textContent = operator;
        operatorContainer.appendChild(button);
    })
    const digitContainer = document.querySelector(".digitContainer");
    const digits = Array.from(Array(10).keys());
    digits.forEach(digit => {
        const button = document.createElement("button");
        button.textContent = digit;
        digitContainer.appendChild(button);
    })
}

generateCalculatorUI();
