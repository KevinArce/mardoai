import bot from 'assets/bot.svg';
import user from 'assets/user.svg';

const BOT_IMG = bot;
const USER_IMG = user;

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
    element.textContent = '';

  loadInterval = setInterval(() => {
    element.innerHTML += '.';

    if (element.textContent.length === 4) {
        element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
    let i = 0;

    let interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.chartAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    const hexadecimalString = randomNumber.toString(16);

    return 'id-' + timestamp + '-' + hexadecimalString;
}