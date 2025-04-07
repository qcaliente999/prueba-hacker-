const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.id = "matrixCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "0"; // IMPORTANTE: zIndex muy bajo
canvas.style.pointerEvents = "none"; // Para no bloquear clics
document.body.prepend(canvas); // Usamos prepend para que quede detrás

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&@".split("");
const fontSize = 14;
let columns;
let drops;

function initializeDrops() {
  columns = canvas.width / fontSize;
  drops = Array.from({ length: columns }).fill(1);
}
initializeDrops();

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 33);
