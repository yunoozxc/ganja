// === 3D Tilt Effect for Main Logo ===
const logo = document.querySelector('.logo'); 
const img = logo.querySelector('img');

logo.addEventListener('mouseenter', () => {
  logo.addEventListener('mousemove', handleMove);
});

logo.addEventListener('mouseleave', () => {
  img.style.transform = "";
  img.style.boxShadow = "";
  logo.removeEventListener('mousemove', handleMove);
});

function handleMove(e) {
  const rect = logo.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  const rotateX = (-y / rect.height) * 40; // up/down tilt
  const rotateY = (x / rect.width) * 40;   // left/right tilt

  img.style.transform = `scale(1.07) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// === Discord Lanyard Status Fetch ===
async function fetchStatuses() {
  const cards = document.querySelectorAll(".status-card");

  for (const card of cards) {
    const userId = card.getAttribute("data-user");
    if (!userId) continue;

    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      const data = await res.json();

      if (data.success) {
        const user = data.data.discord_user;
        const status = data.data.discord_status;

        // Avatar URLs
        const avatarUrl = user.avatar
          ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
          : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;

        // Set avatars (main + popup)
        card.querySelector(".avatar").src = avatarUrl;
        card.querySelector(".popup-avatar").src = avatarUrl;

        // Username (main + popup)
        card.querySelector(".username").textContent = user.username;

        // Status text + dot
        const dot = card.querySelector(".dot");
        dot.className = "dot " + status; // reset + add status class
        card.querySelector(".status-text").textContent = status;
      }
    } catch (err) {
      console.error("Error fetching Lanyard data for " + userId, err);
    }
  }
}

// Fetch on load + refresh every 10s
fetchStatuses();
setInterval(fetchStatuses, 10000);

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

// Disable right-click
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

const profileLinks = {
  "703440528657875005": "../yuno",
  "1307593274814500926": "../liya",
  "751257222792872056": "../akira",
  "616961997300432907": "../mika",
  "1260661874895224892": "../sanku",
  "529647572361674783": "../kai"
};

// Make each status card clickable
document.querySelectorAll(".status-card").forEach(card => {
  card.style.cursor = "pointer"; // show hand cursor
  card.addEventListener("click", () => {
    const userId = card.getAttribute("data-user");
    if (profileLinks[userId]) {
      window.location.href = profileLinks[userId];
    }
  });
});

