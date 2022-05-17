"use strict"

const gameBoardModule = (()=> {  
  const _gameBoardArr = [];
  const _container = document.querySelector(".container")

  function _createGameDiv() {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-div");
    gameDiv.setAttribute("data-position", _gameBoardArr.length)
    _gameBoardArr.push(gameDiv);
  }

  function _createAllGameDivs() {
    for (let i = 1; i <= 9; i++) {
      _createGameDiv();
    }
  }
  function displayGameDivs() {
    _createAllGameDivs();
    for (let div of _gameBoardArr) {
      _container.appendChild(div);
    }
  }
  return {
    displayGameDivs: displayGameDivs,
  }
})()

gameBoardModule.displayGameDivs();

