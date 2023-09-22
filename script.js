class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement //Kai: Sets text elements inside class
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
 
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1) //Kai: From index 0 - end
    }
 
    appendNumber(number){
        if (number == '.'&& this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
 
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if(this.previousOperand !== ''){ //Kai: Check for previous operand Ex. 2+2+2 = 4 + 2
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
 
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev)||isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
 

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])//Kai: Takes String and turns into array. First num in array is pre period, second is post period.
        const decimalDigits = stringNumber.split('.')[1] //Kai: Only want numbers after decimal place.
        let integerDisplay
        if (isNaN(intergerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = intergerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
 

    updateDisplay(){
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //Kai: String that appends operation to end.
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}
 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
 
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
 
numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
 
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
 
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
 
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
 
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})