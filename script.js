const typingLines = [
  { status: "[ + ]", statusClass: "ok", text: "booting gnjz.xyz" },
  { status: "[ + ]", statusClass: "ok", text: "decompiling..." },
  { status: "[ + ]", statusClass: "ok", text: "killing snitch..." },
  { status: "[ + ]", statusClass: "ok", text: "starting ganja..." }
];

const typingLine = document.getElementById("typing-line");
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= typingLines.length) {
    // ✅ Done typing: fade out before redirect
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("fade-out");

    loadingScreen.addEventListener("animationend", () => {
      window.location.href = "main/"; // redirect after fade
    });

    return;
  }

  const { status, statusClass, text } = typingLines[lineIndex];

  typingLine.innerHTML = `
    <span class="status-label ${statusClass}">${status}</span>
    <span class="status-text"></span>
  `;

  const textSpan = typingLine.querySelector(".status-text");

  function typeChar() {
    if (charIndex < text.length) {
      textSpan.innerHTML =
        text.slice(0, charIndex + 1) + '<span class="cursor">|</span>';
      charIndex++;
      setTimeout(typeChar, 40);
    } else {
      textSpan.innerHTML = text;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 1200);
    }
  }

  typeChar();
}

typeLine();


