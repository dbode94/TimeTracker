//============================================================================================
// Getting elements
//============================================================================================
let inputs = document.getElementsByTagName('input');
let labels = document.getElementsByTagName('label');


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


//============================================================================================
// Defining Event Handlers
//============================================================================================
const checkInputState = (e) => {
    if(e.type == 'focus' && e.target.value == '')
        movelabelUp(e);
    else if(e.type == 'blur' && e.target.value == '')
        movelabelDown(e);
}


//============================================================================================
// Adding Event Listeners
//============================================================================================
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('focus', checkInputState);
    inputs[i].addEventListener('blur', checkInputState);  //for when the input loses focus
}