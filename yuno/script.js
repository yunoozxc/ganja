const userId = "703440528657875005"; // replace with your Discord ID

// Elements
const statusDot = document.getElementById("status-dot");
const activityText = document.getElementById("activity-text");
const avatarImg = document.getElementById("avatar");
const usernameEl = document.getElementById("username");
const tagEl = document.getElementById("tag");

const statusColors = {
  online: "limegreen",
  idle: "gold",
  dnd: "red",
  offline: "gray"
};

const statusLabels = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline"
};

// Connect to Lanyard WebSocket
const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.onopen = () => {
  ws.send(JSON.stringify({
    op: 2,
    d: { subscribe_to_id: userId }
  }));
};

ws.onmessage = ({ data }) => {
  const { t, d } = JSON.parse(data);
  if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
    const status = d.discord_status; // online, idle, dnd, offline
    statusDot.style.backgroundColor = statusColors[status] || "gray";
    statusDot.title = statusLabels[status] || "Unknown";

    // Update avatar dynamically
    let avatarUrl;
    if (d.discord_user && d.discord_user.avatar) {
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${d.discord_user.avatar}.png?size=512`;
      avatarImg.src = avatarUrl;
    } else {
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/0.png`; // default avatar
      avatarImg.src = avatarUrl;
    }

    // ✅ Update favicon with latest avatar
    let favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = avatarUrl;
    document.head.appendChild(favicon);

    // Show current activity
    if (d.activities && d.activities.length > 0) {
      activityText.textContent = d.activities[0].name;
    } else {
      activityText.textContent = "";
    }
  }
};


const bioTexts = [
  "Luv by Yuno",
  "killing snitch",
  "i luv liya",
  "discord.gg/revshit"
];

let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  currentText = bioTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length + 1) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // pause before deleting
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % bioTexts.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

document.addEventListener("contextmenu", event => event.preventDefault());

document.onkeydown = function(e) {
  // F12
  if (e.keyCode == 123) {
    return false;
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    return false;
  }
  // Ctrl+U
  if (e.ctrlKey && e.keyCode == 85) {
    return false;
  }
};

document.addEventListener("dragstart", event => event.preventDefault());

const intro = document.getElementById("intro-screen");
const content = document.getElementById("main-content");
const music = document.getElementById("bg-music");
const typeText = document.getElementById("type-text");

const message = "click to continue...";
let i = 0;

// Typewriter effect with fade-in
function typeWriter() {
  if (i < message.length) {
    const span = document.createElement("span");
    span.textContent = message.charAt(i);
    span.classList.add("fade-in");
    typeText.appendChild(span);
    i++;
    setTimeout(typeWriter, 100); // typing speed
  }
}
typeWriter();

// Click to continue
intro.addEventListener("click", () => {
  intro.classList.add("fade-out");

  setTimeout(() => {
    intro.style.display = "none";
    music.play().catch(err => console.log("Autoplay blocked:", err));
  }, 1000);
});

fetch("https://api.countapi.xyz/hit/yuno-profile/views")
  .then(res => res.json())
  .then(data => {
    document.getElementById("view-counter").textContent = data.value;
  });