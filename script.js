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

  return {
    displayGameDivs: displayGameDivs,
    gameBoardArr: gameBoardArr,
  };
})();

gameBoardModule.displayGameDivs();



/* DISPLAY FUNCTIONALITY */
/* need to write a function to check each row */
const displayController = (() => {
  let turn = "player 1";
  const _gameDivs = document.querySelectorAll(".game-div");

   
  _gameDivs.forEach((gameDiv) => {
    gameDiv.addEventListener("click", () => {
      if (!gameDiv.textContent && turn === "player 1") {
        gameDiv.textContent = "X";
        gameDiv.setAttribute("data-fill", "player 1")
        turn = "player 2";
      } else if (!gameDiv.textContent && turn === "player 2") {
        gameDiv.textContent = "O";
        let positionArr = gameDiv.getAttribute("data-position");
        gameBoardModule.gameBoardArr[positionArr].setAttribute("data-fill", "player 2")
/* 
        gameDiv.setAttribute("data-fill", "player 2") */
        turn = "player 1";
        console.log(gameBoardModule.gameBoardArr)
      }
    });
  });

  return {turn};
})();


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
