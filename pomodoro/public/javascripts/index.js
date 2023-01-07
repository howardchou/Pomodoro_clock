let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 1;
let breakTime = 1;
let isPaused = false;
let isStart = false;
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
    seconds = 59;
    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    breakCount = 0;

    //倒數計時器
    let timerFunction = () => {
        console.log("timerFunction");
        //倒數時間
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;
        if (workMinutes < 10) {
            document.getElementById('minutes').innerHTML = `0${workMinutes}`
        }
        if (seconds < 10) {
            document.getElementById('seconds').innerHTML = `0${seconds}`
        }
        // start
        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                isPaused = true;
                document.getElementById('btn').innerHTML = "Break";
                document.getElementById('seconds').innerHTML = "00";
                if (breakCount % 2 === 0) {
                    // start break
                    alert("結束番茄，準備休息囉");
                    workMinutes = breakMinutes;
                    breakCount++

                    // change the painel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // continue work
                    alert("休息時間結束，上工囉");
                    workMinutes = workTime;
                    breakCount++

                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                    document.getElementById('minutes').innerHTML = workTime;
                    document.getElementById('btn').innerHTML = "Start";
                }
            }
            seconds = 59;
        }
    }

    setInterval(function() {
        console.log("setInterval" + isPaused);
        if (!isPaused) {
            timerFunction();
        }
    }, 1000);
}

function countdownToggle() {
    console.log("countdownToggle 1" + isPaused);
    if (!isStart) {
        document.getElementById('btn').innerHTML = "Pause";
        start();
        isStart = !isStart;
        isPaused = !isPaused; //第一次Pause false=>true
        document.body.style.backgroundColor = '#c4604d';
    }
    isPaused = !isPaused;
    if (isPaused) {
        document.getElementById('btn').innerHTML = "Start";
        document.body.style.backgroundColor = '#CD533B';
        // isPaused = !isPaused; //第一次Pause false=>true
    }
    if (!isPaused) {
        document.getElementById('btn').innerHTML = "Pause";
        document.body.style.backgroundColor = '#c4604d';
        // isPaused = !isPaused; //第一次Pause false=>true
    }

    console.log("countdownToggle 2" + isPaused);
}