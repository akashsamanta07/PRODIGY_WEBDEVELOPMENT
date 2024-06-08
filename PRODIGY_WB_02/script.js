
const timer = document.getElementById("stopwatch");
const lap = document.querySelector(".lapContainer");
const resetlap = document.querySelectorAll(".lap");

let hr = 0;
let min = 0;
let sec = 0;
let ms = 0;
let lapNo = 0;
let stoptime = true;

function startTimer() {
  if (stoptime) {
    stoptime = false;
    timerCycle();
  }
}

function stopTimer() {
  stoptime = true;
}

function timerCycle() {
  if (!stoptime) {
    ms++;
    if (ms === 100) {
      sec++;
      ms = 0;
    }
    if (sec === 60) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hr++;
      min = 0;
    }

    timer.innerHTML = 
      (hr < 10 ? "0" + hr : hr) + ":" + 
      (min < 10 ? "0" + min : min) + ":" + 
      (sec < 10 ? "0" + sec : sec) + ":" + 
      (ms < 10 ? "0" + ms : ms);

    setTimeout(timerCycle, 10); // Adjusting the interval to 10ms for better accuracy
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00:00";
  stoptime = true;
  lap.style.visibility = "hidden";
  resetlap.forEach(element => element.innerHTML = "");
  hr = 0;
  sec = 0;
  min = 0;
  ms = 0;
  lapNo = 0;
}

let prevHr = 0;
let prevMin = 0;
let prevSec = 0;
let prevMs = 0;

const fnLap = () => {
  lap.style.visibility = "visible";
  document.querySelector(".total").innerHTML += `<p>${timer.innerHTML}</p>`;
  document.querySelector(".lapno").innerHTML += `<p>${++lapNo}</p>`;
  
  let lapMs = ms - prevMs;
  let lapSec = sec - prevSec;
  let lapMin = min - prevMin;
  let lapHr = hr - prevHr;

  if (lapMs < 0) {
    lapMs += 100;
    lapSec--;
  }
  if (lapSec < 0) {
    lapSec += 60;
    lapMin--;
  }
  if (lapMin < 0) {
    lapMin += 60;
    lapHr--;
  }

  document.querySelector(".lapTime").innerHTML += 
    `<p>${(lapHr < 10 ? "0" + lapHr : lapHr)}:${(lapMin < 10 ? "0" + lapMin : lapMin)}:${(lapSec < 10 ? "0" + lapSec : lapSec)}:${(lapMs < 10 ? "0" + lapMs : lapMs)}</p>`;
  
  prevHr = hr;
  prevMin = min;
  prevSec = sec;
  prevMs = ms;
}