let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 1;
let breakTime = 1;
let isPaused = false;
let isStart = true;
let seconds = "00"

// 顯示
window.onload = () => {

    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// 啟動
function start() {
    console.log("start");
    // change button
    document.getElementById("start").classList.add("fa-solid.fa-pause");
    // 2. Remove a class
    document.getElementById("start").classList.remove("fa-solid.fa-play");
    // 3. Overwrite the classList
    document.getElementById("start").classList = ("fa-solid.fa-pause");



    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        console.log("timerFunction");
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++

                    // change the painel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++

                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    // setInterval(timerFunction, 1000); // 1000 = 1s

    setInterval(function() {
        console.log("setInterval" + isPaused);
        if (!isPaused) {
            timerFunction();
        }
    }, 1000);
    // function play(){
    //     isPaused = false;
    // }
    // function pause(){
    //     isPaused = true;
    // }
}

function countdownToggle() {
    console.log("countdownToggle 1" + isPaused);
    if (isStart) {
        start();
        isStart = !isStart;
        isPaused = !isPaused; //第一次Pause false=>true
    }
    isPaused = !isPaused;
    console.log("countdownToggle 2" + isPaused);

    // start();
}