// Вихідні дані
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
stopBtn.disabled = true;

// Функція для зміни атрибута на кнопці
function changeBtnAttribute() {
  if (!startBtn.disabled) {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
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
