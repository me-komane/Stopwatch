const time = document.getElementById("time");
const lapDetails = document.getElementById("lapDisplay");

function closure(){
    let initialTime = 0;
    let elapsedTime = 0;
    let setIntervalId;
    let isRunning = false;
    let laps = [];

    function startTime(){
        if (!isRunning){
            initialTime = Date.now() - elapsedTime;
            setIntervalId = setInterval(updateTime, 10);
            isRunning = true;
        }
    }

    function stopTime(){
        if (isRunning){
            clearInterval(setIntervalId);
            isRunning = false;
            elapsedTime = Date.now() - initialTime;
        }
    }

    function lapTime(){
        if (initialTime != 0){
            let hour = Math.floor(elapsedTime / (1000 *  60 * 60)) % 24;
            let min = Math.floor(elapsedTime / (1000 * 60)) % 60;
            let sec = Math.floor(elapsedTime / 1000) % 60;
            let millisec = Math.floor((elapsedTime % 1000) / 10);
            
            laps.push(hour.toString().padStart(2, 0) + ":" + min.toString().padStart(2, 0) + ":" + sec.toString().padStart(2, 0) + ":" + millisec.toString().padStart(2, 0));
        }
        console.log(laps);
        displayLaps();
    }

    function resetTime(){
        stopTime();

        initialTime = 0;
        elapsedTime = 0;
        isRunning = false;
        laps = [];
        setIntervalId;
        time.textContent = "00:00:00:00";
        lapDetails.textContent = "";
    }

    function updateTime(){
        elapsedTime = Date.now() - initialTime;

        let hour = Math.floor(elapsedTime / (1000 *  60 * 60)) % 24;
        let min = Math.floor(elapsedTime / (1000 * 60)) % 60;
        let sec = Math.floor(elapsedTime / 1000) % 60;
        let millisec = Math.floor((elapsedTime % 1000) / 10);
        
        time.textContent = hour.toString().padStart(2, 0) + ":" + min.toString().padStart(2, 0) + ":" + sec.toString().padStart(2, 0) + ":" + millisec.toString().padStart(2, 0);
    }

    function displayLaps(){
        let text = "";
        //console.log(text);
        for (let i = 0; i < laps.length; i++){
            text += i+1 + ".  " + laps[i] + "<br>";
        }
        lapDetails.innerHTML = text;
    }

    return {startTime, stopTime, lapTime, resetTime};
}

const clock = closure();

function startTimer(){
    clock.startTime();
}

function stopTimer(){
    clock.stopTime();
}

function lapTimer(){
    clock.lapTime();
}

function resetTimer(){
    clock.resetTime();
}