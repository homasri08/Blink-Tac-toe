document.addEventListener("DOMContentLoaded", () => {
    let roundsPlayed = 0;
    let timer = 0;
    let timerInterval;
    let scores = { 1: 0, 2: 0 };
    const clickSound = document.getElementById("click-sound");
    const winSound = document.getElementById("win-sound");
    const restartSound = document.getElementById("restart-sound");
    let currentPlayer = 1;
    let player1EmojiSet = [];
    let player2EmojiSet = [];
    let player1Pool = [];
    let player2Pool = [];
    const boardState = Array(9).fill(null);
    const playerPositions = { 1: [], 2: [] };
    document.getElementById("start-btn").addEventListener("click", () => {
      const cat1 = document.getElementById("player1-category").value;
      const cat2 = document.getElementById("player2-category").value;
      if (cat1 === cat2) {
        alert("Both players cannot choose the same category!");
        return;
      }
      const emojiSets = {
        tech: ["💻", "🖱️", "📱", "🖥️"],
        vehicles: ["🚗", "🚌", "🚕", "🚓", "🚑", "🚛"],
        faces: ["😀", "😂", "😎", "🥰"]
      };
      player1EmojiSet = [...emojiSets[cat1]];
      player2EmojiSet = [...emojiSets[cat2]];
      player1Pool = shuffle([...player1EmojiSet]);
      player2Pool = shuffle([...player2EmojiSet]);
      currentPlayer = 1;
      boardState.fill(null);
      playerPositions[1] = [];
      playerPositions[2] = [];
      document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.removeAttribute("data-content");
        cell.classList.remove("winner");
        cell.style.pointerEvents = "auto";
      });  
      clearInterval(timerInterval);
      timer = 0;
      document.getElementById("timer").textContent = timer;
      timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = timer;
      }, 1000);
      document.getElementById("game").style.display = "grid";
      document.getElementById("turn-info").textContent = `🎮 Player 1's Turn!`;
      document.getElementById("message").textContent = "";
      document.getElementById("restartBtn").style.display = "none";
    });
      document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.addEventListener("click", () => {
        handleMove(index, cell);
      });
    });
    document.getElementById("restartBtn").addEventListener("click", () => {
      restartSound.currentTime = 0;
      restartSound.play();
      setTimeout(() => {
        document.getElementById("start-btn").click();
      }, 300);
    });
  
    function handleMove(index, cell) {
      if (boardState[index] !== null) return;
  
      let removedIndex = null;
      if (playerPositions[currentPlayer].length === 3) {
        removedIndex = playerPositions[currentPlayer].shift();
        boardState[removedIndex] = null;
        const removedCell = document.querySelectorAll(".cell")[removedIndex];
        removedCell.textContent = "";
        removedCell.removeAttribute("data-content");
        if (index === removedIndex) {
          return;
        }
      }
      let emoji;
      if (currentPlayer === 1) {
        if (player1Pool.length === 0) player1Pool = shuffle([...player1EmojiSet]);
        emoji = player1Pool.pop();
      } else {
        if (player2Pool.length === 0) player2Pool = shuffle([...player2EmojiSet]);
        emoji = player2Pool.pop();
      }
  
      boardState[index] = currentPlayer;
      playerPositions[currentPlayer].push(index);
      cell.textContent = emoji;
      cell.setAttribute("data-content", emoji);
      clickSound.currentTime = 0;
      clickSound.play();
      if (checkWin(currentPlayer)) {
        document.getElementById("message").textContent = `🏆 Player ${currentPlayer} Wins!`;
        document.getElementById("turn-info").textContent = "";
        clearInterval(timerInterval);
        scores[currentPlayer]++;
        document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
        roundsPlayed++;
        document.getElementById("rounds").textContent = roundsPlayed;

        disableBoard();
        showPlayAgain();
        winSound.play();
        return;
      }
      if (!boardState.includes(null)) {
        document.getElementById("message").textContent = "It's a draw!";
        document.getElementById("turn-info").textContent = "";
        clearInterval(timerInterval);
        roundsPlayed++;
        document.getElementById("rounds").textContent = roundsPlayed;
        disableBoard();
        showPlayAgain();
        return;
      }
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      document.getElementById("turn-info").textContent = `🎮 Player ${currentPlayer}'s Turn!`;
    }
    function checkWin(player) {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (const pattern of winPatterns) {
        if (pattern.every(index => boardState[index] === player)) {
          highlightWinningCells(pattern);
          return true;
        }
      }
      return false;
    }
    function highlightWinningCells(pattern) {
      pattern.forEach(index => {
        document.querySelectorAll(".cell")[index].classList.add("winner");
      });
    }
    function disableBoard() {
      document.querySelectorAll(".cell").forEach(cell => {
        cell.style.pointerEvents = "none";
      });
    }
    function showPlayAgain() {
      document.getElementById("restartBtn").style.display = "inline-block";
    }
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    window.toggleHelp = function () {
        const help = document.getElementById("help-content");
        if (help.style.display === "block") {
          help.style.display = "none";
        } else {
          help.style.display = "block";
        }
      };
        const themeSwitch = document.getElementById("theme-switch");
        if (localStorage.getItem("theme") === "dark") {
          document.body.classList.add("dark");
          themeSwitch.checked = true;
        }
        themeSwitch.addEventListener("change", () => {
          document.body.classList.toggle("dark");
          if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "light");
          }
        });
    
  });
  