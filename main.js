document.addEventListener("DOMContentLoaded", function () {
  const board = document.querySelector(".board");
  const blackBtn = document.querySelector(".btn-dark");
  const redBtn = document.querySelector(".btn-danger");
  const randomBtn = document.querySelector(".btn-warning");
  const resetBtn = document.querySelector(".btn-primary");
  const popupBtn = document.getElementById("popup");

  let size = 32; 
  let colorMode = "black";
  let mouseDown = false;

  
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);

  function createBoard(size) {
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      
      cell.addEventListener("mouseover", () => {
        if (mouseDown) applyColor(cell);
      });
      cell.addEventListener("mousedown", () => {
        applyColor(cell);
      });

      board.appendChild(cell);
    }
  }

  function applyColor(cell) {
    if (colorMode === "black") {
      cell.style.backgroundColor = "black";
    } else if (colorMode === "red") {
      cell.style.backgroundColor = "red";
    } else if (colorMode === "random") {
      const hue = Math.floor(Math.random() * 360);
      const lightness = Math.floor(Math.random() * 40) + 30; // 30%-70%
      cell.style.backgroundColor = `hsl(${hue}, 80%, ${lightness}%)`;
    }
  }

  
  blackBtn.addEventListener("click", () => (colorMode = "black"));
  redBtn.addEventListener("click", () => (colorMode = "red"));
  randomBtn.addEventListener("click", () => (colorMode = "random"));
  resetBtn.addEventListener("click", () => createBoard(size));

  popupBtn.addEventListener("click", () => {
    const newSize = parseInt(prompt("Enter grid size (max 64):"));
    if (newSize && newSize > 0 && newSize <= 64) {
      size = newSize;
      createBoard(size);
    } else {
      alert("Invalid size! Please enter a number between 1 and 64.");
    }
  });

  createBoard(size);
});
