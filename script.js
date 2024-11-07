// 定义计时器的三种模式
let workMinutes = 25;
let shortBreakMinutes = 5;
let longBreakMinutes = 15;

// 存储当前倒计时的分钟数，默认值为工作模式的25分钟
let currentMinutes = workMinutes;
// 存储当前倒计时的秒数，初始值为0
let currentSeconds = 0;
// 计时器初始运行状态为false
let isRunning = false;
// 用于保存setInterval的ID，以便在需要时清除计时器
let timeInterval;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startPauseBtn = document.getElementById("start-pause-btn");
const resetBtn = document.getElementById("reset-btn");

// 当用户点击按钮时，调用setMode函数，并将对应的分钟值和点击事件传递给函数，用于切换倒计时模式
document.getElementById("work-btn").addEventListener("click", () => setMode(workMinutes));
document.getElementById("short-break-btn").addEventListener("click", () => setMode(shortBreakMinutes));
document.getElementById("long-break-btn").addEventListener("click", () => setMode(longBreakMinutes));

// toggleTimer函数绑定到开始/暂停按钮的点击事件，当按钮被点击时，切换计时器的运行状态
startPauseBtn.addEventListener("click", toggleTimer);
// resetTimer函数绑定到重置按钮，点击时将计时器重置为初始工作模式
resetBtn.addEventListener("click", resetTimer);

// 它会清除任何正在运行的计时器，重置倒计时，更新显示，并在模式按钮上应用“active”样式
function setMode(minutes, event) {
  // clearInterval 是 JavaScript 中用于停止一个通过 setInterval 启动的定时器的函数，它会返回一个定时器 ID，代表这个计时器
  clearInterval(timeInterval);
  isRunning = false;
  currentMinutes = minutes;
  currentSeconds = 0;
  updateDisplay(); 
  // 更新页面显示的时间
  // 将所有模式按钮的“active”类移除，取消高亮
  document.querySelectorAll(".mode-buttons button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  // // 将按钮文本重置为“Start”
  startPauseBtn.textContent = "Start";
}

// 更新页面上显示的倒计时，将分钟和秒数填充为两位数，以确保显示始终是“00”的格式
function updateDisplay() {
  // 如果字符串长度小于目标长度（即小于 2），它会在字符串前面加上指定的字符，直到字符串达到指定的长度
  minutesEl.textContent = String(currentMinutes).padStart(2, "0");
  secondsEl.textContent = String(currentSeconds).padStart(2, "0");
}

// 当开始/暂停按钮被点击时，该函数切换计时器状态。如果计时器正在运行，则暂停；否则，启动倒计时
function toggleTimer() {
  if (isRunning) {
    clearInterval(timeInterval);
    startPauseBtn.textContent = "Start";
  } else {
    startPauseBtn.textContent = "Pause";
    // 每秒调用一次`countdown`
    timeInterval = setInterval(countdown, 1000);
  }
  isRunning = !isRunning;
}

// 每秒调用一次，倒计时1秒。如果分钟数和秒数都为0，计时器暂停，并自动切换模式
function countdown() {
  if (currentSeconds === 0) {
    if (currentMinutes === 0) {
      toggleTimer();
      autoSwitch();
      return;
    }
    currentMinutes--;
    currentSeconds = 59;
  } else {
    currentSeconds--;
  }
  updateDisplay();
}

// 重置计时器，将其恢复到初始工作模式，并停止计时
function resetTimer() {
  clearInterval(timeInterval);
  isRunning = false;
  setMode(workMinutes);
}

// 根据当前的模式自动切换下一个模式。如果当前模式是工作，则切换到短休息；否则，切换回工作
function autoSwitch() {
  if (document.getElementById("work-btn").classList.contains("active")) {
    setMode(shortBreakMinutes);
  } else {
    setMode(workMinutes);
  }
}

// 在页面加载时调用updateDisplay函数
updateDisplay();
