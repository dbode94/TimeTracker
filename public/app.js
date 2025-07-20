class StopWatch {
    /**
     * Expects a Date, if starting anew then dont pass a value
     * @param {Date} time 
     */
    constructor(time = 0){
        this.start = 0;
        this.timeElapse = time;
        this.running = false;
        this.paused = false;
    }

    startTimer() {
        if(!this.running){
            this.start = new Date().getTime();
            this.running = true;    
        }
    }

    stopTimer() {
        if(this.running){
           this.timeElapse += (new Date().getTime()) - this.start;
           this.running = false;
           this.start = 0;
        }
    }

    pauseTimer() {
        if(this.running && !this.paused){
            this.timeElapse += (new Date().getTime()) - this.start;
            this.running = false;
            this.paused = true;
        }
    }

    resumeTimer() {
        if(this.paused && !this.running){
            this.start = new Date().getTime();
            this.paused = false;
            this.running = true;
        }
    }    

    peekAtTimer() {
        return this.paused? this.timeElapse : ((new Date().getTime()) - this.start) + this.timeElapse;
    }
}


/*
TODO:
    - Create a state app class for global variables and organization
*/
let header = document.getElementById('currentTimerName');
let warning = document.getElementById('warningMessage');
let timers = document.getElementById('list').getElementsByTagName('li');
let help = document.getElementById('help');
let helpText = document.getElementById('helpText');
let hadPrevTimer = false;
let prevSelTimer = '';
let sWatch = new StopWatch();

/*
TODO: 
    1- Fetch all timers and total time                                                     ❌
    2- Get UL Element and add each child with proper structure                             ❌
        <li id="id">
            <p><strong>>> </strong>Report Tracker</p>
            <p class="totalTime">total: 250h</p>
        </li>
    3- the ID is necessary for updating the time in the db
*/
let renderTimers = () => {
    
}

/*
TODO:
    1- Make warning disapear once a timer has been selected                                 ✅
    2- toggle font weight of the selected timer                                             ✅
    3- Hold on to the timer for updating later on                                           ✅
    4- Change the name of the header to reflect the selected timer                          ✅
    5- If timmer running while changin timers, alert user to stop before change to save     ❌
    6- 
*/
let timersOnClickHandler = (e) => {

    if(!sWatch.running){
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
    } else {
        alert("Timer is running, please stop it before changing to another")
    }

}

let showHelpHandler = (e) => {
    helpText.classList.remove('hide');
}

let hideHelpHandler = (e) => {
    helpText.classList.add('hide');
}





for (let i = 0; i < timers.length; i++)
    timers[i].addEventListener('click', timersOnClickHandler);

help.addEventListener('mouseover', showHelpHandler);
help.addEventListener('mouseout', hideHelpHandler);


