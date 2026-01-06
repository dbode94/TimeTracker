//============================================================================================
// Getting elements
//============================================================================================
let inputs = document.getElementsByTagName('input');
let labels = document.getElementsByTagName('label');
let emojiDiv = document.getElementById('logoContiner');
let showPassword = document.getElementById('showPasswordCB');

//============================================================================================
// Defining functions
//============================================================================================
const movelabelUp = (e) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) {
        if(elementSiblings[i].tagName == 'LABEL'){
            elementSiblings[i].classList.remove('moveDown');
            elementSiblings[i].classList.add('moveUp')
            break;
        }    
    }
}

const movelabelDown = (e) => {
    const elementSiblings = e.target.parentElement.children
    for (let i = 0; i < elementSiblings.length; i++) {
        if(elementSiblings[i].tagName == 'LABEL'){
            elementSiblings[i].classList.remove('moveUp')
            elementSiblings[i].classList.add('moveDown')
            break;
        }    
    }
}

//TODO: Make it a class with a state to handle actions better
const changeEmojiState = (emotion) => {
    switch (emotion) {
        case 'surprise':
            emojiDiv.innerText = '😱'
            break;

        case 'focus':
            emojiDiv.innerText = '🤔'
            break;

        case 'hide':
            emojiDiv.innerText = '🫣'
            break;
    
        default:
            emojiDiv.innerText = '🫡'
            break;
    }
}

//============================================================================================
// Defining Event Handlers
//============================================================================================
const checkInputState = (e) => {
    if(e.type == 'focus' && e.target.value == ''){
        movelabelUp(e);
    }
    else if(e.type == 'blur' && e.target.value == ''){
        movelabelDown(e);
    }
}

const showPasswordHandler = (e) => {
    if(e.target.checked){
        document.getElementById('password').type= 'text'
    }
    else {
        document.getElementById('password').type= 'password'
    }

}
//============================================================================================
// Adding Event Listeners
//============================================================================================
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('focus', checkInputState);
    inputs[i].addEventListener('blur', checkInputState);
}

showPassword.addEventListener('change', showPasswordHandler)
