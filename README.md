# Blink-Tac-toe
A fun twist on the classic Tic Tac Toe game with **blinking emojis**, category-based icons, round tracking, timer, dark/light mode toggle, and smooth sound effects — all built using **HTML, CSS, and vanilla JavaScript**.
**Live Demo**: [Click to Play](https://homasri08.github.io/Blink-Tac-toe/)

## Game Features

- **Unique Blink Mechanism**: 
  - Each player is allowed **only three emojis on the board** at a time.
  - When a fourth move is made, the **oldest emoji vanishes**, adding a strategic twist.

- **Emoji Category Selection**:
  - Players choose from different categories (e.g., 💻 tech, 🚗 vehicles, 😀 faces).
  - Prevents duplicate categories for a fair game experience.

- **Turn-Based Logic**:
  - Clear indication of whose turn it is with dynamic updates.

- **Win Detection**:
  - Automatically checks for win combinations after each move.
  - Highlights the winning cells and plays a victory sound.

- **Scoreboard & Timer**:
  - Tracks rounds played and individual player scores.
  - Displays elapsed time for each game round.

- **Dark/Light Mode**:
  - Theme toggle with persistent selection via local storage.

- **Restart & Play Again**:
  - Restart button appears after each round.
  - Smooth transition with restart sound.

- **Help Section**:
  - Toggleable help panel for quick guidance on gameplay.
- **error thrown**:
  - when the players opt to choose same categories it throws an error.
## Technologies Used(Tech stack):
- **HTML5** – For structure.
- **CSS3** – For layout, themes, and responsiveness.
- **JavaScript (Vanilla)** – For dynamic interactivity and logic.
- **Audio Effects** – To enhance game feedback.
##  Vanishing Feature Implementation:
  - One unique aspect of **Blink Tac Toe** is the *vanishing mark* feature that enhances the game's dynamics.

### Logic Behind the Vanishing Feature

- Each player is allowed to have **only 3 active emojis (moves)** on the board at a time.
- When a player makes their **4th move**, their **oldest emoji disappears (vanishes)** automatically.
- This creates a **shifting strategy** where players must think not only about where they place new emojis but also about which old ones will be removed.

### How It Works in Code

- Every player has a list: `playerPositions[1]` and `playerPositions[2]` which tracks their move positions.
- When the player tries to play their 4th move:
  - The first (oldest) index is removed from their position list using `shift()`.
  - The corresponding cell is cleared from the UI using `textContent = ""` and `removeAttribute("data-content")`.
  - The board state is also updated by setting that index back to `null`.

###  Code Snippet
```js
if (playerPositions[currentPlayer].length === 3) {
  removedIndex = playerPositions[currentPlayer].shift();
  boardState[removedIndex] = null;
  const removedCell = document.querySelectorAll(".cell")[removedIndex];
  removedCell.textContent = "";
  removedCell.removeAttribute("data-content");
}
```
## Future Improvements (If Given More Time)

### 1. Audio Enhancements
- **Unique sounds for each player**: Right now, there's a single click sound. I would add different click sounds based on the player, making interactions feel more personalized.
- **Thematic win sounds**: Each emoji category could have its own special win sound — for example, a digital beep for the tech category, or a car engine for the vehicles.
- **Time-based alerts**: Introduce subtle ticking or chime sounds when the timer hits key milestones to build excitement or pressure.

### 2. Visual Effects and Animations
- **Smooth vanishing animation**: The current disappearing logic is instant. With more time, I’d implement fade-out effects using CSS transitions to make it more polished.
- **Winning animations**: Add visual celebrations like confetti or glow effects on the winning cells to make victories feel more rewarding.
- **Emoji placement animation**: Make emojis slide or bounce into place instead of appearing instantly.

### 3. Smarter Gameplay Mechanics
- **Online multiplayer**: Allow players to play with friends remotely using WebSockets or Firebase — something that needs backend setup and takes time to implement securely.
- **AI opponent**: Introduce a computer player with basic to advanced difficulty levels. Even a simple AI would involve decision-making logic that needs testing.
- **Undo functionality**: A time-limited undo feature to fix accidental clicks — this would involve rethinking turn logic and history tracking.

### 4. User Customization Features
- **Custom emoji sets**: Let users create their own emoji combinations instead of picking from fixed categories. This would require a custom emoji selector and saving preferences.
- **Player profile settings**: Add name entry and avatars for players that are remembered across games.

### 5. Better Accessibility Support
- **Colorblind-friendly modes**: Provide alternate color themes that are easy to distinguish for colorblind users.

### 6. Score Tracking and Leaderboard
- **Session-based stats**: Keep track of win/loss history across multiple sessions using local storage.
- **Global leaderboard**: With time and backend support, implement a leaderboard where players can submit high scores and compare them globally.

These improvements would elevate the project from a fun interactive game to a more professional, customizable, and accessible experience.





