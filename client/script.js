import bot from "/assets/bot.svg";
import user from "/assets/user.svg";

const BOT_IMG = bot;
const USER_IMG = user;

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.innerHTML += ".";

    if (element.textContent.length === 4) {
      element.textContent = "";
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

  return "id-" + timestamp + "-" + hexadecimalString;
}

function chatStripe(isAi, value, uniqueId) {
  return `
  <div class="wrapper ${isAi && "ai"}">
    <div class="chat">
        <div className="profile">
        <img 
        src="${isAi ? BOT_IMG : USER_IMG}" 
        alt="${isAi ? "bot" : "user"}"
        />
    </div>
    <div class="message" id="${uniqueId}">${value}</div>
   </div>
`;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // User's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  // Loader
  form.reset();

  // Bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});
