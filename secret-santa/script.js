const PARTICIPANTS = [
  "Anaïs",
  "Charmaine",
  "Christelle",
  "Khadidja",
  "Gaspard",
  "Loan",
  "Judner"
];

const ADMIN_CODE = "noel2025";

// Initialisation
if (!localStorage.getItem("remaining")) {
  localStorage.setItem("remaining", JSON.stringify(PARTICIPANTS));
}
if (!localStorage.getItem("players")) {
  localStorage.setItem("players", JSON.stringify([]));
}

function drawName() {
  const input = document.getElementById("username");
  const name = input.value.trim();
  const result = document.getElementById("result");

  if (!name) {
    result.innerText = "❌ Entre ton prénom";
    return;
  }

  let remaining = JSON.parse(localStorage.getItem("remaining"));
  let players = JSON.parse(localStorage.getItem("players"));

  if (players.includes(name)) {
    result.innerText = "🚫 Tu as déjà tiré";
    return;
  }

  let possible = remaining.filter(p => p !== name);

  if (possible.length === 0) {
    result.innerText = "🎉 Tout le monde a été tiré !";
    return;
  }

  const chosen = possible[Math.floor(Math.random() * possible.length)];

  remaining = remaining.filter(p => p !== chosen);
  players.push(name);

  localStorage.setItem("remaining", JSON.stringify(remaining));
  localStorage.setItem("players", JSON.stringify(players));

  input.disabled = true;

  result.innerHTML = `
    🎁 Tu offres un cadeau à :<br>
    <span style="color:#c4161c; font-size:22px">${chosen}</span>
  `;
}

// 🔐 ADMIN RESET
function resetGame() {
  const code = document.getElementById("adminCode").value;

  if (code !== ADMIN_CODE) {
    alert("❌ Mauvais code admin");
    return;
  }

  localStorage.clear();
  alert("🎄 Jeu réinitialisé !");
  location.reload();
}
