//Traversity 

//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

//Store generator functions within object
const randomFunc = {
    lower: getRandomLower,
    upper:getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//Clipboard function
clipboardEl.addEventListener('click',() => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerHTML

    if(!password){
        return ''
    }

    textarea.value = password;
    document.body.appendChild(textarea);;
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard')
})

generateEl.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol,
        length
        )
})
//Generate password function

function generatePassword(lower, upper, number, symbol, length){
    //1. Init pw var
    let generatedPassword = '';
    //2. Filter out unchecked types
        //count the number of checked items
        const typesCount = lower + upper + number + symbol;
        console.log('typesCount:' + typesCount)
        
        //make the parameters objects with boolean values
        const typesArr = [{ lower }, { upper },{ number }, { symbol}].filter(
            //filter out falsey values(HO's take higer order values in plural form)
            item => Object.values(item)[0]
        );

        console.log('typesArr: ', typesArr)

        if(typesCount === 0){
            return '';
        }
        //as long as i is less than or equal to length, add to type count.
        for(let i = 0; i <= length; i += typesCount){
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0]
                
                generatedPassword += randomFunc[funcName]();
            });
        }
        const finalPassword = generatedPassword.slice(0, length);
        return finalPassword
    //3. Loop over length call generator function for each type
    //4. Add final pw to the pw var and return
}

//Generator Functions - http://www.net-comber.com/charser.html

function getRandomLower(){
    //generate random lowercase letter
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    //generate random lowercase letter
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol(){
    //strings chars can be accessed via bracket notation
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
// console.log(getRandomLower())
// console.log(getRandomUpper())
// console.log(getRandomNumber())
// console.log(getRandomSymbol())

//Animations