"use strict";

/* GAMEBOARD */
const gameBoardModule = (() => {
  const gameBoardArr = [];
  const _container = document.querySelector(".container");
  const _nameContainer1 = document.querySelector(".player-1-container");
  const _nameContainer2 = document.querySelector(".player-2-container");
  

  /* creates a grid cell */
  function _createGameDiv() {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-div");
    gameDiv.setAttribute("data-position", gameBoardArr.length);
    gameBoardArr.push(gameDiv);
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
    for (let div of gameBoardArr) {
      _container.appendChild(div);
    }
  }
 /*  displayGameDivs(); */
  /*displays a green border around the winning pattern */
  function displayWinner(winArr) {
    for (let div of gameBoardArr) {
     if (winArr.includes(div.getAttribute("data-position"))) {
        div.classList.add("win-div")
      }
    }
  }
  /* display player names*/
  function displayPlayerNames(playerName1, playerName2) {
    _nameContainer1.textContent = `Player 1: ${playerName1}`;
    _nameContainer2.textContent = `Player 2: ${playerName2}`;
  }
  /* display player turn and victor */
  function displayTurn(turn, victor, player1, player2) {
    if (victor == "player 1") {
      _nameContainer1.classList.add("win-div");
      _nameContainer1.textContent= `Congratulations ${player1}! You've won!`
      _nameContainer2.classList.remove("turn");
    } else if (victor == "player 2") {
      _nameContainer2.classList.add("win-div");
      _nameContainer2.textContent= `Congratulations ${player2}! You've won!`
      _nameContainer1.classList.remove("turn");
    } else if (victor == "tie") {
      _nameContainer2.classList.add("win-div");
      _nameContainer1.classList.add("win-div");
      _nameContainer2.textContent= `Congratulations ${player2}! It's a tie!`
      _nameContainer1.textContent= `Congratulations ${player1}! It's a tie!`
      _nameContainer2.classList.remove("turn");
    } else if (turn == "player 1") {
      _nameContainer1.classList.add("turn");
      _nameContainer2.classList.remove("turn");
    } else if (turn == "player 2"){
      _nameContainer2.classList.add("turn");
      _nameContainer1.classList.remove("turn");
    }
  }


  return {
    displayGameDivs: displayGameDivs,
    gameBoardArr: gameBoardArr,
    displayWinner: displayWinner,
    displayPlayerNames,
    displayTurn,
  };
})();




/* DISPLAY FUNCTIONALITY */

const displayController = (() => {
  let turn = "player 1";
  let victor;
  let victorPattern; 
  let _gameDivs;
  const player1Arr = [];
  const player2Arr = [];
  let move = 0;
  const nameInput1 = document.querySelector("#player-1-name");
  const nameInput2 = document.querySelector("#player-2-name");
  const playerNamesBtn = document.querySelector("#sub-btn");
  const form = document.querySelector("form");

  const winningPatterns = {
    row1: [
      "0","1","2",
    ],
    row2: [
      "3","4","5",
    ],
    row3: [
      "6","7","8",
    ],
    col1: [
      "0","3","6",
    ],
    col2: [
      "1","4","7",
    ],
    col3: [
      "2","5","8",
    ],
    diagonal1: [
      "0", "4", "8",
    ],
    diagonal2: [
      "2", "4", "6",
    ],
  } 
  function victoryCheck(winningPattern, playerArr) {
    return winningPattern.every((i) => playerArr.includes(i));
  }
  function checkAllPatterns(object, playerArr) {
    let values = Object.values(object);
    let check = false;
    values.forEach((value) => {
      if (victoryCheck(value, playerArr)) {
        victorPattern = value;
        return check = true;
      }
    })
    return check;
  }
 
  playerNamesBtn.addEventListener("click", () => {
    if (nameInput1.value && nameInput2.value) {
    let player1 = Player(nameInput1.value);
    let player2 = Player(nameInput2.value);
    gameBoardModule.displayPlayerNames(player1.name, player2.name);
    form.classList.add("hidden");
    gameBoardModule.displayGameDivs();
    
    gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
    _gameDivs = document.querySelectorAll(".game-div");
   

    _gameDivs.forEach((gameDiv) => {
      gameDiv.addEventListener("click", () => {
        if (!gameDiv.textContent && turn === "player 1" && !victor) {
          gameDiv.textContent = "X";
          player1Arr.push(gameDiv.getAttribute("data-position"));
          turn = "player 2";
          gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
          move++;
        } else if (!gameDiv.textContent && turn === "player 2" && !victor) {
          gameDiv.textContent = "O";
          player2Arr.push(gameDiv.getAttribute("data-position"));
          turn = "player 1";
          gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
          move++;
        }
        if (move >= 5) {
          if (checkAllPatterns(winningPatterns, player1Arr)) {
            victor = "player 1";
            console.log(victor + " Won")
            gameBoardModule.displayWinner(victorPattern);

            gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
            
          } else if (checkAllPatterns(winningPatterns, player2Arr)) {
            victor = "player 2";
            console.log(victor) + " Won";
            gameBoardModule.displayWinner(victorPattern);
            gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
          } else if (player1Arr.length === 5) {
            victor = "tie";
            gameBoardModule.displayTurn(turn, victor, player1.name, player2.name);
            
            console.log("Tie")
          }
        }
      });
    });
    }
  })


  return {  }
})();


const Player = (playerName) => {
  const name = playerName;

  return {
    name,
  };
};




