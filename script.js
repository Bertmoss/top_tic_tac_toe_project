"use strict";

/* GAMEBOARD */
const gameBoardModule = (() => {
  const gameBoardArr = [];
  const _container = document.querySelector(".container");

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
  function displayWinner(winArr) {
    for (let div of gameBoardArr) {
     if (winArr.includes(div.getAttribute("data-position"))) {
        div.classList.add("win-div")
      }
    }
  }


  return {
    displayGameDivs: displayGameDivs,
    gameBoardArr: gameBoardArr,
    displayWinner: displayWinner,
  };
})();

gameBoardModule.displayGameDivs();



/* DISPLAY FUNCTIONALITY */

const displayController = (() => {
  let turn = "player 1";
  let victor;
  let victorPattern; 
  const _gameDivs = document.querySelectorAll(".game-div");
  const player1Arr = [];
  const player2Arr = [];
  let move = 0;
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
  _gameDivs.forEach((gameDiv) => {
    gameDiv.addEventListener("click", () => {
      if (!gameDiv.textContent && turn === "player 1" && !victor) {
        gameDiv.textContent = "X";
        player1Arr.push(gameDiv.getAttribute("data-position"));
        turn = "player 2";
        move++;
      } else if (!gameDiv.textContent && turn === "player 2" && !victor) {
        gameDiv.textContent = "O";
        player2Arr.push(gameDiv.getAttribute("data-position"));
        turn = "player 1";
        move++;
      }
      if (move >= 5) {
        if (checkAllPatterns(winningPatterns, player1Arr)) {
          victor = "Player 1";
          console.log(victor + " Won")
          gameBoardModule.displayWinner(victorPattern);
          
        } else if (checkAllPatterns(winningPatterns, player2Arr)) {
          victor = "Player 2";
          console.log(victor) + " Won";
          gameBoardModule.displayWinner(victorPattern);
        } else if (player1Arr.length === 5) {
          victor = "Tie";
          console.log("Tie")
        }
      }
    });
  });
  return {  }
})();

console.log(displayController.victor);


const Player = (playerName) => {
  const name = playerName;

  return {
    name,
  };
};

let John = Player("John");
console.log(John);

let John2 = Player("John2");
console.log(John2);

/* The general idea is that the player will click on any of the divs and then the opponent will choose a random num from the empty divs arr 
and will add text content to the div with the corresponding data-position  */
/* 



//GameDiv listener
/* gameDiv.addEventListener("click", () => {
  if (!gameDiv.textContent) {
    let thisDiv =
      gameDiv.getAttribute(
        "data-position"
      ); //locates the div that was clicked 
    let position = gameBoard.emptyDivsArr.indexOf(
      +thisDiv
    ); // finds the number of the div that was clicked in Empty divs 
    gameDiv.textContent = "X";
    gameBoard.emptyDivsArr.splice(
      position,
      1
    ); //removes the div that was clicked from Empty divs  
  }
});
gameBoard.emptyDivsArr.push(gameBoard.gameBoardArr.length);
 */
