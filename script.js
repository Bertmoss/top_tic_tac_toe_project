"use strict";

const gameBoardModule = (() => {
  const gameBoard = {
    gameBoardArr: [] /* renders the divs */,
    emptyDivsArr: [] /*shows which divs are still free/empty*/,
  };

  const _container = document.querySelector(".container");

  function _createGameDiv() {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-div");
    gameDiv.setAttribute("data-position", gameBoard.gameBoardArr.length);
    gameDiv.addEventListener("click", () => {
      if (!gameDiv.textContent) {
        let thisDiv =
          gameDiv.getAttribute(
            "data-position"
          ); /* locates the div that was clicked */
        let position = gameBoard.emptyDivsArr.indexOf(
          +thisDiv
        ); /* finds the number of the div that was clicked in Empty divs */
        gameDiv.textContent = "X";
        gameBoard.emptyDivsArr.splice(
          position,
          1
        ); /* removes the div that was clicked from Empty divs  */
      }
    });
    gameBoard.emptyDivsArr.push(gameBoard.gameBoardArr.length);
    gameBoard.gameBoardArr.push(gameDiv);
  }

  function _createAllGameDivs() {
    for (let i = 1; i <= 9; i++) {
      _createGameDiv();
    }
  }

  function displayGameDivs() {
    _createAllGameDivs();
    for (let div of gameBoard.gameBoardArr) {
      _container.appendChild(div);
    }
  }

  return {
    displayGameDivs: displayGameDivs,
    gameBoard: gameBoard,
  };
})();

gameBoardModule.displayGameDivs();

/* The general idea is that the player will click on any of the divs and then the opponent will choose a random num from the empty divs arr 
and will add text content to the div with the corresponding data-position  */
/* 
const displayModule = (()=> {
  const 

})(); */
