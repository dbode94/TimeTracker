
//============================================================================================
// Getting elements
//============================================================================================
let inputs = document.getElementsByTagName('input');
let labels = document.getElementsByTagName('label');
let flipAnchors = document.getElementsByClassName('flipTrigger');
let showPasswordLogin = document.getElementById('showPasswordCBLogin');
let showPasswordRegister = document.getElementById('showPasswordCBRegister');
let clearButtons = document.getElementsByClassName('clearbutton');
let loginButton = document.getElementById('loginButton');
let registerButton = document.getElementById('registerButton');


//============================================================================================
// Login State
//============================================================================================
let inLogin = true;


//============================================================================================
// Defining functions
//============================================================================================
const toggleElementClass = (e, tag, className) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) {
        if(elementSiblings[i].tagName == tag.toUpperCase()){
            elementSiblings[i].classList.toggle(className);
            break;
        }    
    }
}

const addElementClass = (e, tag, className) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) {
        if(elementSiblings[i].tagName == tag.toUpperCase()){
            elementSiblings[i].classList.add(className);
            break;
        }    
    }
}

const removeElementClass = (e, tag, className) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) {
        if(elementSiblings[i].tagName == tag.toUpperCase()){
            elementSiblings[i].classList.remove(className);
            break;
        }    
    }
}

/**
 * Makes toast like message appear
 * Use <br> in message for new line.
 * @param {String} message 
 * @param {'error'|'good'|'info'} status 
 */
const showMessage = (message, status) => {
    const infoWrapper = document.getElementById('infoWrapper');
    infoWrapper.children[0].innerHTML = message;

    let animationClassName = 'slideInLeft';
    let messageTypeClassName = '';
    
    switch(status.toLowerCase()){
        case 'error':
            messageTypeClassName = 'errorMessage'
            break;
        case 'good':
            messageTypeClassName = 'goodMessage'
            break;
        case 'info':
            messageTypeClassName = 'infoMessage'
            break;
        default:
            messageTypeClassName = 'defaultMessage'
            break;
    }

    infoWrapper.classList.add(messageTypeClassName);
    infoWrapper.classList.add(animationClassName);

    setTimeout(() => {
        infoWrapper.classList.remove(messageTypeClassName)
        infoWrapper.classList.remove(animationClassName)
    }, 5000)
}

/**
 * attaches the animation class
 */
const wrongCredentialAnimation = () => {
    const mainWrapper = document.getElementById('main-wrapper');
    const loginContainer = document.getElementsByClassName('loginContainer')[0];
    mainWrapper.classList.add('shake-rotate');
    loginContainer.classList.add('flicker-red');

    setTimeout(() => {
        mainWrapper.classList.remove('shake-rotate');
        loginContainer.classList.remove('flicker-red');
    }, 500);
}

/**
 * Returns false if the format is not valid.
 * @param {String} email 
 */
const isValidEmailFormat = (email) =>  email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);


/**
 * Returns false if the format is not valid.
 * @param {String} password 
 */
const isValidPasswordFormat= (password) => password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/);

//============================================================================================
// Defining Event Handlers
//============================================================================================
const checkInputState = (e) => {
    if(e.type == 'focus' && e.target.value == ''){
        removeElementClass(e, 'LABEL', 'moveDown');
        addElementClass(e, 'LABEL', 'moveUp');
        addElementClass(e, 'BUTTON', 'visible');        
    }
    else if(e.type == 'blur' && e.target.value == ''){
        removeElementClass(e, 'LABEL', 'moveUp');  
        addElementClass(e, 'LABEL', 'moveDown');
        removeElementClass(e, 'BUTTON', 'visible'); 
    }
}

const showPasswordHandler = (e) => {
    if(e.target.checked){
        if(inLogin)
            document.getElementById('passwordLogin').type = 'text';
        else {
            document.getElementById('passwordRegister1').type = 'text';
            document.getElementById('passwordRegister2').type = 'text';
        }
    }
    else {
        if(inLogin)
            document.getElementById('passwordLogin').type = 'password';
        else{
            document.getElementById('passwordRegister1').type = 'password';
            document.getElementById('passwordRegister2').type = 'password';
        }
    }
}

const flipCard = (e) => {
    let loginContainer = document.getElementById('card');
    loginContainer.classList.toggle('rotate')
}

const clearInputHandler = (e) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) 
        if(elementSiblings[i].tagName == 'INPUT'){
            elementSiblings[i].value = '';
            elementSiblings[i].dispatchEvent(new FocusEvent('blur', {bubbles:false}));
            break;
        }    
}


const loginHandler = () => {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    
    if(!email || !password) {
        wrongCredentialAnimation(); 
        showMessage('Email and password cannot be blank.','error');
    }

    fetch('http://localhost:3000/login/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => {
        if(!res.ok){
            wrongCredentialAnimation();
            showMessage('Wrong email or password...', 'error');
        }
        else{
            showMessage('Welcome back !!!', 'good');
            setTimeout(()=>{window.location.href="/app"}, 1000) 
        }
    })
    .catch(err => {
        showMessage('Upps...something went wrong...', 'info');
    })
}

const registerHandler = () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('emailRegister').value;
    const password1 = document.getElementById('passwordRegister1').value;
    const password2 = document.getElementById('passwordRegister2').value;


    if(!firstName || !lastName || !email || !password1 || !password2){
        wrongCredentialAnimation();
        showMessage('All fields most be filled !', 'error');
    }
    else if(!isValidEmailFormat(email)){
        wrongCredentialAnimation();
        showMessage('Wrong email format... <br>example: example@domain.com', 'info');
    }
    else if(!isValidPasswordFormat(password1)){
        wrongCredentialAnimation();
        showMessage(
            'Wrong password format...' + 
            '<br> Password should complay with the following:' + 
            '<br> * At least 8 characters long' + 
            '<br> * At least 1 special characters' +
            '<br> * At least 1 upper case character' +
            '<br> * At least 1 lower case characters' +
            '<br> * At least 1 number' 
            , 'info');
    }
    else if(password1 != password2){
        wrongCredentialAnimation();
        showMessage('Passwords does not match...', 'error');
    }
    else{
        fetch('http://localhost:3000/login/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password1
            })
        })
        .then(res => {
            if(!res.ok){
                console.log(res.json())
                showMessage('Email is already in use...', 'error');
                wrongCredentialAnimation();
            }
            else{
                showMessage('Hi ' + firstName + '. Welcome in !!!', 'good');
                setTimeout(()=>{window.location.href="/app"}, 1000) 
            }
        })
        .catch(error => showMessage('Upps...something went wrong...', 'info'))
    }



}


//============================================================================================
// Adding Event Listeners
//============================================================================================
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('focus', checkInputState);
    inputs[i].addEventListener('blur', checkInputState);
}

for (let i = 0; i < flipAnchors.length; i++){
    flipAnchors[i].addEventListener('click', flipCard);
    flipAnchors[i].addEventListener('click', () => {inLogin = !inLogin;});
}

for (let i = 0; i < clearButtons.length; i++)
    clearButtons[i].addEventListener('click', clearInputHandler);

showPasswordLogin.addEventListener('change', showPasswordHandler);
showPasswordRegister.addEventListener('change', showPasswordHandler);
loginButton.addEventListener('click', loginHandler);
registerButton.addEventListener('click', registerHandler);


