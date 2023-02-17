import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

changeBtnState(true);
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (selectedDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    changeBtnState(false);
  },
};

// Ініціалізація календаря
flatpickr(inputRef, options);

// --------------------------------------------------------------------------- //

// Функція зміни стану кнопки
function changeBtnState(isActive) {
  startBtn.disabled = isActive;
}

// Функція для додавання нулів перед значеннями
function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

// Функція для зміни значень в елементах
function changeFieldValue(timeLeft = null) {
  daysField.textContent = addLeadingZero(convertMs(timeLeft).days) ?? '00';
  hoursField.textContent = addLeadingZero(convertMs(timeLeft).hours) ?? '00';
  minutesField.textContent =
    addLeadingZero(convertMs(timeLeft)?.minutes) ?? '00';
  secondsField.textContent =
    addLeadingZero(convertMs(timeLeft)?.seconds) ?? '00';
}

// Функція запуску таймера
function onStartTiming() {
  changeBtnState(true);

  let timerId = setInterval(() => {
    const remainingTime = selectedDate - Date.now();
    changeFieldValue(remainingTime);
    if (remainingTime <= 0) {
      changeFieldValue();
      changeBtnState(false);
    }
  }, 1000);
}

// Функція конвертації значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// --------------------------------------------------------------------------- //

// Hendler
startBtn.addEventListener('click', onStartTiming);
