let countdownTicRef = null;

// Set the deadline date to 11 January 2025
const deadlineDate = new Date("2025-01-11T00:00:00Z").toISOString();

function getTimeRemaining(date) {
  const time = Date.parse(date) - new Date().getTime(),
    days = Math.floor(time / 1000 / 60 / 60 / 24),
    hours = Math.floor((time / 1000 / 60 / 60) % 24),
    minutes = Math.floor((time / 1000 / 60) % 60),
    seconds = Math.floor((time / 1000) % 60);

  return {
    time,
    days,
    hours,
    minutes,
    seconds,
  };
}

function getZero(num) {
  return num >= 0 && num < 10 ? "0" + num : num + "";
}

function updateTimer() {
  const time = getTimeRemaining(deadlineDate);
  document.getElementById("days").textContent = getZero(time.days);
  document.getElementById("hours").textContent = getZero(time.hours);
  document.getElementById("minutes").textContent = getZero(time.minutes);
  document.getElementById("seconds").textContent = getZero(time.seconds);
}

function startCountdown() {
  countdownTicRef = setInterval(updateTimer, 1000);
}

startCountdown();
