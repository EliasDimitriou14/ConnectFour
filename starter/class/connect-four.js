const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    let empty = true;
    let countO = 0;
    let countX = 0;
    let winner = ' ';
    let count = 0;

    // Recognize empty grid as no winner
    grid.forEach((row) => {
      row.forEach((ele) => {
        if(ele !== ' '){
          count++;
          empty = false;
        }
      });
    });
    if(empty === true){
      return false;
    }
    // Recognize empty grid as no winner


    // Recognize horizontal wins
    for(let i = 0; i < grid.length; i++){
      countX = countO = 0;
      for(let j = 0; j < grid[0].length; j++){
        if(grid[i][j] === 'O'){
          countO++
          if(countO === 4){
            winner = 'O';
          }
          if(countX > 0){
            countX = 0;
          }
        }else if(grid[i][j] === 'X'){
          countX++
          if(countX === 4){
            winner = 'X';
          }
          if(countO > 0){
            countO = 0;
          }
        }
      }
    }
    if(winner === 'X' || winner === 'O'){
      return winner;
    }
    // Recognize horizontal wins

    // Recognize vertical wins
    for(let i = 0; i < grid[0].length; i++){
      countO = countX = 0;
      for(let j = 0; j < grid.length; j++){
        if(grid[j][i] === 'O'){
          countO++
          if(countO === 4){
            winner = 'O';
          }
          if(countX > 0){
            countX = 0;
          }
        }else if(grid[j][i] === 'X'){
          countX++
          if(countX === 4){
            winner = 'X';
          }
          if(countO > 0){
            countO = 0;
          }
        }
      }
    }
    if(winner === 'X' || winner === 'O'){
      return winner;
    }
    // Recognize vertical wins

    if(count === grid.length * grid[0].length){
      winner = 'T';
      return winner;
    }else{
      return false;
    }
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
