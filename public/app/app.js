class StopWatch {
    /**
     * Expects a Date, if starting anew then dont pass a value
     * @param {Date} time 
     */
    constructor(time = 0){
        this.start = 0;
        this.timeElapse = time;
        this.active = false;
        this.paused = false;
    }

    startTimer() {
        if(!this.active){
            this.start = new Date().getTime();
            this.active = true;    
        }
    }

    stopTimer() {
        this.start = 0;
        this.timeElapse = 0;
        this.active = false;
        this.paused = false;
    }

    pauseTimer() {
        if(this.active && !this.paused){
            this.timeElapse += (new Date().getTime()) - this.start;
            this.active = false;
            this.paused = true;
        }
    }

    resumeTimer() {
        if(this.paused && !this.active){
            this.start = new Date().getTime();
            this.paused = false;
            this.active = true;
        }
    }    

    peekAtTimer() {
        return this.paused || !this.active? this.timeElapse : ((new Date().getTime()) - this.start) + this.timeElapse;
    }
}

//============================================================================================
// Rendering and initializing app state
//============================================================================================
let header = document.getElementById('currentTimerName');
let warning = document.getElementById('warningMessage');
let timers = document.getElementById('list').getElementsByTagName('li');
let help = document.getElementById('help');
let helpText = document.getElementById('helpText');
let addTimer = document.getElementById('addTimer');
let addTimerText = document.getElementById('addTimerText');
let clock = document.getElementById('clock');
let start = document.getElementById('start_pause');
let stop = document.getElementById('stop');
let alert = document.getElementById('alert');
let alertButton = document.getElementById('alertButton');
let hadPrevTimer = false;
let prevSelTimer = '';
let sWatch = new StopWatch();
let intervalID;


/*
TODO: 
    2- Get UL Element and add each child with proper structure                             ❌
        <li id="id">
            <p><strong>>> </strong>Report Tracker</p>
            <p class="totalTime">total: 250h</p>
        </li>
*/
let populateTimers = () => {
    fetch('http://localhost:3000/app/getAllTimers', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        if(res.ok){
            console.log(res.json())
        }
        else console.error(res)
    })
    .catch(error => console.error('Error requesting:', error))
}


/*
TODO:
    1 - Format clock                                                                        ✅
 */
let updateRenderedTime = () => {
    let time = sWatch.peekAtTimer();

    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 60000) % 60);
    let hours = Math.floor(time / 120000);

    let strSeconds = seconds < 10 ? '0' + seconds : seconds;
    let strMinutes = minutes < 10 ? '0' + minutes : minutes;
    let strHours = hours < 10 ? '0' + hours : hours;

    clock.innerText = `${strHours}:${strMinutes}:${strSeconds}`;
}


//============================================================================================
// Event Listener Callbacks Functions
//============================================================================================

/*
TODO:
    1- Make warning disapear once a timer has been selected                                 ✅
    2- toggle font weight of the selected timer                                             ✅
    3- Hold on to the timer for updating later on                                           ✅
    4- Change the name of the header to reflect the selected timer                          ✅
    5- If timmer active while changin timers, alert user to stop before change to save      ✅
*/
let timersOnClickHandler = (e) => {
    if(!sWatch.active){
        start.classList.remove('grayOut');
        stop.classList.remove('grayOut');

        warning.classList.add('hide');
        let curTimerName = e.target.children[0].innerText.split('>')[2].trim();

        if(hadPrevTimer){
            let prevTimerName = prevSelTimer.children[0].innerText.split('>')[2].trim();
            
            if(curTimerName != prevTimerName)
                prevSelTimer.style.fontWeight = 'normal';
                
        }

        hadPrevTimer = true;
        prevSelTimer = e.target;
        prevSelTimer.style.fontWeight = 'bold';
        
        header.innerText = curTimerName;
    } else showAlert();

}

let showAlert = () => {
    alert.classList.remove('hide');
    alert.classList.add('flick');
}

let closeAlertHandler = () => {
    alert.classList.add('hide');
    alert.classList.remove('flick');
}

let showHelpHandler = (e) => {
    helpText.classList.remove('hide');
}

let hideHelpHandler = (e) => {
    helpText.classList.add('hide');
}

/*
TODO:
    1- Call add timer API                                                                   ❌
*/
let addTimerHandler = (e) => {
    if(e.key == 'Enter')
        console.log('Enter pressed')
}

addTimerFocushandler = (e) =>{
    if(e.type == 'focusin') {
        addTimerText.classList.remove('moveUp')
        addTimerText.classList.add('moveDown')
    }
    else{
        addTimerText.classList.remove('moveDown')
        addTimerText.classList.add('moveUp')
        addTimer.value = '';
    }
}

let startPauseHandler = () => {
    
    if(sWatch.active && !sWatch.paused){
        sWatch.pauseTimer();
        start.innerText = 'Start';
        clock.classList.add('beat');
    }
    else if(sWatch.paused){
        clock.classList.remove('beat');
        sWatch.resumeTimer();
        start.innerText = 'Pause';
    }else {
        intervalID = setInterval(updateRenderedTime, 1000);
        sWatch.startTimer();
        start.innerText = 'Pause';
    }
}
/*
TODO:
    1- Call API to add the count to db                                                      ❌
    2- Stop the timer                                                                       ✅
    3- Clear interval                                                                       ❌
*/
let stopHandler = () => {
    sWatch.stopTimer();
    start.innerText = 'Start';
    updateRenderedTime();
    clock.classList.remove('beat');
    clearInterval(intervalID);
}




//============================================================================================
// Adding Event Listeners
//============================================================================================
for (let i = 0; i < timers.length; i++)
    timers[i].addEventListener('click', timersOnClickHandler);

help.addEventListener('mouseover', showHelpHandler);
help.addEventListener('mouseout', hideHelpHandler);
addTimer.addEventListener('keydown', addTimerHandler);
addTimer.addEventListener('focusin', addTimerFocushandler);
addTimer.addEventListener('focusout', addTimerFocushandler);
start.addEventListener('click', startPauseHandler);
stop.addEventListener('click', stopHandler);
alertButton.addEventListener('click', closeAlertHandler);
populateTimers();
