// Вихідні дані
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
stopBtn.disabled = true;

// Функція для зміни атрибута на кнопці
function changeBtnAttribute() {
  if (!startBtn.disabled) {
    onChangeDisabled(true, false);
  } else {
    onChangeDisabled(false, true);
  }
}

// Функція зміни стану кнопки
function onChangeDisabled(startState, endState) {
  startBtn.disabled = startState;
  stopBtn.disabled = endState;
}

// Функція зміни кольору
function getRandomHexColor() {
  document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;
}

// Функція зауску зміни кольору
function startChangeColor() {
  // "Костиль" для зміни кольору одразу за натискання кнопки. Чесно кажучи, умови такої не було, тому реалізувала таким чином
  getRandomHexColor();

  // Змінюємо кожну секунду
  timerId = setInterval(() => {
    getRandomHexColor();
  }, 1000);

  changeBtnAttribute();
}

// Функція для зупинки зміни кольору
function stopChangingColor() {
  clearInterval(timerId);
  changeBtnAttribute();
}

// Event handlers
startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangingColor);
