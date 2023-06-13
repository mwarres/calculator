function generateCalculatorUI() {
    const operatorContainer = document.querySelector(".operatorContainer");
    const operators = ["+", "-", "x", "/", "=", "AC"];
    operators.forEach(operator => {
        const button = document.createElement("button");
        button.textContent = operator;
        button.addEventListener("click", changeInputDisplay);
        button.id = operator;
        operatorContainer.appendChild(button);
    })
    const digitContainer = document.querySelector(".digitContainer");
    const digits = Array.from(Array(10).keys());
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
    const currInput = calculatorInput.textContent;
    calculatorInput.textContent = currInput + e.target.id;
}

generateCalculatorUI();
