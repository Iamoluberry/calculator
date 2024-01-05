let display = document.getElementById('main-display');
let clearBtn = document.getElementById('clear-btn');
let deleteBtn = document.getElementById('del-btn');
let equalBtn = document.getElementById('equal-btn');
let point = document.getElementById('point-btn');
let zeroBtn = document.getElementById('zero-btn');
let numberBtn = document.getElementsByClassName('number-btn');
let operatorBtn = document.getElementsByClassName('operator-btn');

let calculator = {
    firstNumber: '',
    secondNumber: '',
};


//iterate numberBtn
for (const numberButtons of numberBtn) {
    numberButtons.addEventListener('click', (e) =>{
        addNumber(e.target.textContent);
    })
}


function addNumber(e){
    
    let maxLength = 9;  
    

    if (!('operator' in calculator) || (calculator.firstNumber == '')){
        calculator['firstNumber'] += [e];

        if(calculator.firstNumber.length > maxLength){
            //return false;
            calculator.firstNumber = calculator.firstNumber.slice(0, maxLength);
          }

        if(calculator.firstNumber[0] == '.'){
           calculator.firstNumber = '0.';
           display.textContent = calculator.firstNumber;
        } 
        else if(calculator.firstNumber.includes('.') && calculator.firstNumber == '.'){
            // calculator.firstNumber = calculator.firstNumber.replace('.', '');
            // display.textContent = calculator.firstNumber;
        }

        display.textContent = calculator.firstNumber;        
    }   


    if(('firstNumber' in calculator) && ('operator' in calculator)){
        calculator['secondNumber'] += [e];

        if(calculator.secondNumber.length > maxLength){
            //return false;
            calculator.secondNumber = calculator.secondNumber.slice(0, maxLength);            
        }

        if(calculator.secondNumber[0] == '.'){
            calculator.secondNumber = '0.';
            display.textContent = calculator.secondNumber;
         }

        display.textContent = calculator.secondNumber;
    }
}

//for operator
for (const operatorButtons of operatorBtn) {
    operatorButtons.addEventListener('click', (e) =>{
        addOperator(e.target.textContent);
    })
}

function addOperator(e){
    if(!('firstNumber' in calculator)){
        return false
    } else if('firstNumber' in calculator){
        calculator['operator'] = [e];
    display.textContent = calculator.firstNumber + calculator['operator'];
    }
}

//to delete
deleteBtn.addEventListener('click', () =>{
    if (('firstNumber' in calculator) && !('operator' in calculator)){
        let newestFirstNumber = calculator.firstNumber.slice(0, -1);
        calculator.firstNumber = newestFirstNumber;
        display.textContent = calculator.firstNumber;
    }

    else if(('firstNumber' in calculator) && ('operator' in calculator) && !('secondNumber' in calculator)){
        delete calculator.operator;
        display.textContent = calculator.firstNumber;
    }

    else if(('operator' in calculator) && ('secondNumber' in calculator)){
        let newestSecondNumber = calculator.secondNumber.slice(0, -1);
        calculator.secondNumber = newestSecondNumber;
        display.textContent = calculator.secondNumber;
    }
})

//Equal button to execute operation
equalBtn.addEventListener('click', equalFunction);

function equalFunction(){
    operate((calculator.firstNumber), calculator.operator, (calculator.secondNumber));
}

function operate(firstNumber, operator, secondNumber){
    if(operator == '+'){
        calculator['result'] = Number(calculator.firstNumber) + Number(calculator.secondNumber);
        display.textContent = calculator.result;
    }
    if(operator == '-'){
        calculator['result'] = Number(calculator.firstNumber) - Number(calculator.secondNumber);
        display.textContent = calculator.result;
    }
    if(operator == '*'){
        calculator['result'] = Number(firstNumber) * Number(secondNumber);
        display.textContent = calculator.result;
    }
    if(operator == '/'){
        calculator['result'] = Number(firstNumber) / Number(secondNumber);
        display.textContent = calculator.result;
    }



    if ('result' in calculator) {
        calculator.firstNumber = calculator.result;
        calculator.secondNumber = '';    
    }
}

//to clear display
 clearBtn.addEventListener('click', ()=>{
    display.textContent = '';
    calculator.firstNumber = '';
    calculator.secondNumber = '';
    delete calculator.operator;
    delete calculator.result;
 });


