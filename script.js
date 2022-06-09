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

  /* Display winning message and stylize it*/
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
  function displayTurn(turn, player1, player2) {
    if (player1.victor == "player 1") {
      displayVictor(_nameContainer1, _nameContainer2, player1.name);
    } else if (player2.victor == "player 2") {
      displayVictor(_nameContainer2, _nameContainer1, player2.name);
    } else if (player1.victor == "tie") {
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
  let _turn = "player 1";
  let _move = 0;

  let _player1;
  let _player2;
  /* Pattern that won, and arrays of all wining patterns */
  let _victorPattern;
  const _winningPatterns = {
    row1: ["0", "1", "2"],
    row2: ["3", "4", "5"],
    row3: ["6", "7", "8"],
    col1: ["0", "3", "6"],
    col2: ["1", "4", "7"],
    col3: ["2", "5", "8"],
    diagonal1: ["0", "4", "8"],
    diagonal2: ["2", "4", "6"],
  };
  let _gameDivs;

  const _nameInput1 = document.querySelector("#player-1-name");
  const _nameInput2 = document.querySelector("#player-2-name");
  const _playerNamesBtn = document.querySelector("#sub-btn");
  const _form = document.querySelector("form");
  const _resetBtn = document.querySelector(".reset");

  /* Checks if a one winning pattern has been made */
  function _victoryCheck(winningPattern, playerArr) {
    return winningPattern.every((i) => playerArr.includes(i));
  }
  /* checks all the winning patterns to see if one of the player arrays has numbers necessary to win */
  function _checkAllPatterns(object, playerArr) {
    let values = Object.values(object);
    let check = false;
    values.forEach((value) => {
      if (_victoryCheck(value, playerArr)) {
        _victorPattern = value;
        return (check = true);
      }
    });
    return check;
  }

  /* changes the turn and counts the move */
  function _changeTurnMove() {
    _move++;
    if (_turn === "player 1") {
      _turn = "player 2";
    } else {
      _turn = "player 1";
    }
  }
  /* Checks for winner and displays the winning pattern on the board + plus the winning message */
  function _checkForWinner() {
    if (_move >= 5) {
      if (_checkAllPatterns(_winningPatterns, _player1.playerArr)) {
        _player1.victor = "player 1";
        gameBoardModule.displayWinner(_victorPattern);
        gameBoardModule.displayTurn(_turn, _player1, _player2);
        _showResetBtn();
      } else if (_checkAllPatterns(_winningPatterns, _player2.playerArr)) {
        _player2.victor = "player 2";
        gameBoardModule.displayWinner(_victorPattern);
        gameBoardModule.displayTurn(_turn, _player1, _player2);
        _showResetBtn();
      } else if (_player1.playerArr.length === 5) {
        _player1.victor = "tie";
        gameBoardModule.displayTurn(_turn, _player1, _player2);
        _showResetBtn();
      }
    }
  }
  /* Submits the names of the players */
  _playerNamesBtn.addEventListener("click", () => {
    if (_nameInput1.value && _nameInput2.value) {
      _player1 = Player(_nameInput1.value);
      _player2 = Player(_nameInput2.value);
      gameBoardModule.displayPlayerNames(_player1.name, _player2.name);
      _form.classList.add("hidden");
      gameBoardModule.displayGameDivs();
      gameBoardModule.displayTurn(_turn, _player1, _player2);
      /* Checks if a div is empty and if not places the correct player image there */
      _gameDivs = document.querySelectorAll(".game-div");
      _gameDivs.forEach((gameDiv) => {
        gameDiv.addEventListener("click", () => {
          if (
            !gameDiv.getAttribute(
              "style",
              "background"
            ) /* here is the issue */ &&
            _turn === "player 1" &&
            !_player1.victor &&
            !_player2.victor
          ) {
            gameDiv.setAttribute(
              "style",
              "background: url(/images/X-SVG.svg); background-size: 70%; background-position: center; background-repeat: no-repeat;"
            );
            _player1.playerArr.push(gameDiv.getAttribute("data-position"));
            _changeTurnMove();
            gameBoardModule.displayTurn(_turn, _player1.name, _player2.name);
          } else if (
            !gameDiv.getAttribute("style", "background") &&
            _turn === "player 2" &&
            !_player1.victor &&
            !_player2.victor
          ) {
            gameDiv.setAttribute(
              "style",
              "background: url(/images/0-SVG.svg); background-size: 50%; background-position: center; background-repeat: no-repeat"
            );
            _player2.playerArr.push(gameDiv.getAttribute("data-position"));
            _changeTurnMove();
            gameBoardModule.displayTurn(_turn, _player1.name, _player2.name);
          }
          _checkForWinner();
        });
      });
    }
  });
  /* RESET BUTTON */
  function _useResetBtn() {
    _turn = "player 1";
    _victorPattern = false;
    _move = 0;
    _player1 = "";
    _player2 = "";
    _nameInput1.value = "";
    _nameInput2.value = "";
    _form.classList.remove("hidden");
    gameBoardModule.removeGameDivs();
    gameBoardModule.removePlayerNames();
    _resetBtn.classList.add("hidden");
  }
  function _showResetBtn() {
    _resetBtn.classList.remove("hidden");
    _resetBtn.addEventListener("click", _useResetBtn);
  }
  return {};
})();

/* PLAYER MODULE */
const Player = (playerName) => {
  const name = playerName;
  let playerArr = [];
  let victor;
  return {
    name,
    playerArr,
    victor,
  };
};
