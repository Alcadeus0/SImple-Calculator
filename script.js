
const operandButtons = document.querySelectorAll('.operand')
const numberButtons = document.querySelectorAll('.number')
const equalsButton = document.querySelector('.equals')
const allClearButton = document.querySelector('.all-clear')
const deleteButton = document.querySelector('.delete')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')

let calculator = {
    previousText:previousOperand,
    currentText: currentOperand,
    operate: undefined,
    appendNumber(number){
        if (number === '.' && this.currentText.innerText.includes('.')){return}
        this.currentText.innerText += number.toString()
    },
    delete(){
        this.currentText.innerText = this.currentText.innerText.toString().slice(0,-1)
    },
    clear(){
        previousOperand.innerText = ''
        currentOperand.innerText = ''
    },
    operation(operand){
        if (this.currentText.innerText === ''){
            return
        }
        if (this.currentText.innerText !== ''){
            this.compute()
        }
        this.operate = operand
        this.previousText.innerText = this.currentText.innerText + operand
        this.currentText.innerText = ''
    },
    compute(){
        let computation
        const prev = parseFloat(this.previousText.innerText)
        const current = parseFloat(this.currentText.innerText)
        if (isNaN(prev) || isNaN(current)){return}
        switch (this.operate){
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
        this.previousText.innerText = ''
        this.currentText.innerText = computation
        this.operate = undefined
        
    }
}

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
    })
})

operandButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.operation(button.innerText)
    })
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
});

equalsButton.addEventListener('click', ()=> {
    calculator.compute()
})

deleteButton.addEventListener('click', ()=> {
    calculator.delete()
})