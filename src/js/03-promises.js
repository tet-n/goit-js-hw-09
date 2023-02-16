import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function onFormSubmit(e) {
  e.preventDefault();

  // Отримуємо значення полів форми
  let { amount, step, delay } = e.currentTarget.elements;
  const obj = {
    amount: Number(amount.value),
    step: Number(step.value),
    delay: Number(delay.value),
  };

  generatePromises(obj);
}

// Функція генерування промісів
function generatePromises({ amount, step, delay } = {}) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}

// Функція повернення проміса
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Слухач події
form.addEventListener('submit', onFormSubmit);
