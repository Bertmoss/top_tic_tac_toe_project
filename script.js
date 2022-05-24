"use strict";

/* GAMEBOARD */
const gameBoardModule = (() => {
  let _gameBoardArr = [];
  const _container = document.querySelector(".container");
  const _nameContainer1 = document.querySelector(".player-1-container");
  const _nameContainer2 = document.querySelector(".player-2-container");

  /* creates a grid cell */
  function _createGameDiv() {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-div");
    gameDiv.setAttribute("data-position", _gameBoardArr.length);
    _gameBoardArr.push(gameDiv);
  }
  /* creates all the grid cells */
  function _createAllGameDivs() {
    for (let i = 1; i <= 9; i++) {
      _createGameDiv();
    }
  }
  /* appends the grid cells to the DOM */
  function displayGameDivs() {
    _createAllGameDivs();
    for (let div of _gameBoardArr) {
      _container.appendChild(div);
    }
  }
  /* removes the grid cells from DOM and clears gameBoard Arr */
  function removeGameDivs() {
    for (let div of _gameBoardArr) {
      _container.removeChild(div);
    }
    _gameBoardArr = [];
  }
  /*displays a green border around the winning pattern */
  function displayWinner(winArr) {
    for (let div of _gameBoardArr) {
      if (winArr.includes(div.getAttribute("data-position"))) {
        div.classList.add("filter-green");
      }
    }
  }
  /* display player names*/
  function displayPlayerNames(playerName1, playerName2) {
    _nameContainer1.classList.remove("hidden");
    _nameContainer2.classList.remove("hidden");
    _nameContainer1.textContent = `Player 1: ${playerName1}`;
    _nameContainer2.textContent = `Player 2: ${playerName2}`;
  }
  function removePlayerNames() {
    _nameContainer1.textContent = "";
    _nameContainer2.textContent = "";
    _nameContainer1.classList.add("hidden");
    _nameContainer2.classList.add("hidden");
    _nameContainer1.classList.remove("win-div", "turn");
    _nameContainer2.classList.remove("win-div", "turn");
  }

  /* Display winning message and stylizeit*/
  function displayVictor(winningContainer, losingContainer, winner) {
    winningContainer.classList.add("win-div");
    winningContainer.textContent = "";

    let congrats = document.createElement("h4");
    congrats.textContent = "Congratulations!";
    winningContainer.appendChild(congrats);

    let message = document.createElement("p");
    message.textContent = `${winner} won!`;
    winningContainer.appendChild(message);

    losingContainer.classList.remove("turn");
  }

  /* display player turn and victor */
  function displayTurn(turn, victor, player1, player2) {
    if (victor == "player 1") {
      displayVictor(_nameContainer1, _nameContainer2, player1);
    } else if (victor == "player 2") {
      displayVictor(_nameContainer2, _nameContainer1, player2);
    } else if (victor == "tie") {
      _nameContainer2.classList.add("win-div");
      _nameContainer1.classList.add("win-div");
      _nameContainer2.textContent = `It's a tie!`;
      _nameContainer1.textContent = `It's a tie!`;
      _nameContainer2.classList.remove("turn");
    } else if (turn == "player 1") {
      _nameContainer1.classList.add("turn");
      _nameContainer2.classList.remove("turn");
    } else if (turn == "player 2") {
      _nameContainer2.classList.add("turn");
      _nameContainer1.classList.remove("turn");
    }
  }

  return {
    displayGameDivs: displayGameDivs,
    displayWinner: displayWinner,
    displayPlayerNames,
    displayTurn,
    removeGameDivs,
    removePlayerNames,
  };
})();

/* DISPLAY FUNCTIONALITY */

const displayController = (() => {
  let turn = "player 1";
  let victor;
  let victorPattern;
  let _gameDivs;
  let player1Arr = [];
  let player2Arr = [];
  let move = 0;
  let player1;
  let player2;
  const nameInput1 = document.querySelector("#player-1-name");
  const nameInput2 = document.querySelector("#player-2-name");
  const playerNamesBtn = document.querySelector("#sub-btn");
  const form = document.querySelector("form");
  const resetDiv = document.querySelector(".reset");

  const winningPatterns = {
    row1: ["0", "1", "2"],
    row2: ["3", "4", "5"],
    row3: ["6", "7", "8"],
    col1: ["0", "3", "6"],
    col2: ["1", "4", "7"],
    col3: ["2", "5", "8"],
    diagonal1: ["0", "4", "8"],
    diagonal2: ["2", "4", "6"],
  };
  function victoryCheck(winningPattern, playerArr) {
    return winningPattern.every((i) => playerArr.includes(i));
  }
  function checkAllPatterns(object, playerArr) {
    let values = Object.values(object);
    let check = false;
    values.forEach((value) => {
      if (victoryCheck(value, playerArr)) {
        victorPattern = value;
        return (check = true);
      }
    });
    return check;
  }

  playerNamesBtn.addEventListener("click", () => {
    if (nameInput1.value && nameInput2.value) {
      player1 = Player(nameInput1.value);
      player2 = Player(nameInput2.value);
      gameBoardModule.displayPlayerNames(player1.name, player2.name);
      form.classList.add("hidden");
      gameBoardModule.displayGameDivs();
      gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);

      _gameDivs = document.querySelectorAll(".game-div");
      _gameDivs.forEach((gameDiv) => {
        gameDiv.addEventListener("click", () => {
          if (
            !gameDiv.getAttribute("style", "background") &&
            turn === "player 1" &&
            !victor
          ) {
            gameDiv.setAttribute(
              "style",
              "background: url(/images/X-SVG.svg); background-size: 70%; background-position: center; background-repeat: no-repeat"
            );
            player1Arr.push(gameDiv.getAttribute("data-position"));
            turn = "player 2";
            gameBoardModule.displayTurn(
              turn,
              victor,
              player1.name,
              player2.name
            );
            move++;
          } else if (
            !gameDiv.getAttribute("style", "background") &&
            turn === "player 2" &&
            !victor
          ) {
            gameDiv.setAttribute(
              "style",
              "background: url(/images/0-SVG.svg); background-size: 70%; background-position: center; background-repeat: no-repeat"
            );
            player2Arr.push(gameDiv.getAttribute("data-position"));
            turn = "player 1";
            gameBoardModule.displayTurn(
              turn,
              victor,
              player1.name,
              player2.name
            );
            move++;
          }
          if (move >= 5) {
            if (checkAllPatterns(winningPatterns, player1Arr)) {
              victor = "player 1";
              gameBoardModule.displayWinner(victorPattern);
              gameBoardModule.displayTurn(
                turn,
                victor,
                player1.name,
                player2.name
              );
              showResetBtn();
            } else if (checkAllPatterns(winningPatterns, player2Arr)) {
              victor = "player 2";
              gameBoardModule.displayWinner(victorPattern);
              gameBoardModule.displayTurn(
                turn,
                victor,
                player1.name,
                player2.name
              );
              showResetBtn();
            } else if (player1Arr.length === 5) {
              victor = "tie";
              gameBoardModule.displayTurn(
                turn,
                victor,
                player1.name,
                player2.name
              );
              showResetBtn();
            }
          }
        });
      });
    }
  });
  function showResetBtn() {
    const resetBtn = document.querySelector(".reset");
    resetBtn.classList.remove("hidden");

    resetBtn.addEventListener("click", () => {
      turn = "player 1";
      victor = false;
      victorPattern = false;
      player1Arr = [];
      player2Arr = [];
      move = 0;
      player1 = "";
      player2 = "";
      nameInput1.value = "";
      nameInput2.value = "";
      form.classList.remove("hidden");
      gameBoardModule.removeGameDivs();
      gameBoardModule.removePlayerNames();
      resetBtn.classList.add("hidden");
    });
  }
  return {};
})();

const Player = (playerName) => {
  const name = playerName;

  return {
    name,
  };
};

let testArr = [1, 2, 3];
console.log(testArr);
testArr = [];
console.log(testArr);
