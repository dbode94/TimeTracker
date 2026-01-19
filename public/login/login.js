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
    fetch('http://localhost:3000/login/sigin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: 'email@somewhere.com',
            password: 'thisShouldBeEncrypted'
        })
    })
    .then(res => {console.log(res)})
}

const registerHandler = () => {
    fetch('http://localhost:3000/login/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: 'Dennis',
            lastName: 'Bode',
            email: 'email@somewhere.com',
            password: 'thisShouldBeEncrypted'
        })
    })
    .then(res => {console.log(res)})
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


