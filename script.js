const count = document.getElementById('count-input');
const btn = document.getElementById('submit');
const lowerCase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const num = document.getElementById('number');
const symbol = document.getElementById('symbol');
const display = document.querySelector('.displayscreen');
const copy = document.getElementById('copy-icon');
const message = document.querySelector('.notif-message');
const section = document.querySelector('.sec');
const darkMode = document.querySelector('.dark-mode-toggle');
const darkmodeBtn = document.querySelector('.dm-btn');
const heading = document.getElementById('heading');


const arr = [lowerCase, uppercase, num, symbol];

const randLower = () =>{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const randUpper = () =>{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const randNumber = () =>{
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const randSymbol = () =>{
    const symbols = '!@#$%^&*(){}[]+=<>/.,_';

    return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
    lower: randLower,
    upper: randUpper,
    symbol: randSymbol,
    number: randNumber,
}


btn.addEventListener('click', () =>{
    const countValue = +count.value;
    const hasLower = lowerCase.checked;
    const hasUpper = uppercase.checked;
    const hasNumber = num.checked;
    const hasSymbol = symbol.checked;

    display.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, countValue);


    //checkboxes checks
    arr.forEach((check) =>{
        if (!check) {
            check = true;
        }
    })
    //password count check
    if (count.value === '') {
        count.value = 10;
    }
});

const generatePassword = (lower, upper, number, symbol, count) =>{

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
   
    console.log(typeArr);
    
    if (typesCount === 0) {
        return '';
    }
    
    for (let i = 0; i < count; i += typesCount) {
        typeArr.forEach(type =>{
            const loopName = Object.keys(type)[0];
            console.log(loopName);
            generatedPassword += randomFunc[loopName]();
        })
        
    }
    return generatedPassword.slice(0, count);
};


//Copy password to clipboard function

copy.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
    const password = display.innerText;
    
    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    message.classList.add('show-notif');

    setTimeout(() => {
        message.classList.remove('show-notif');
    }, 2000);
})

darkMode.onclick = () =>{
    section.classList.toggle('darkmode');
    document.body.classList.toggle('darkmode');
    darkmodeBtn.classList.toggle('slide');
    darkMode.classList.toggle('btn-background-toggle');
    heading.classList.toggle('heading-dark-mode');
};

