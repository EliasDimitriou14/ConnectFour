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

    this.cursor.setBackgroundColor();

    // Replace this with real commands
    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('space', 'places X or O according to player turn',this.makeMove.bind(this));


    Screen.render();
  }


  makeMove() {
    if(this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn)
      Screen.render();
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      let winner = ConnectFour.checkWin(this.grid)
      if(winner === false){
        console.log("No winner yet...")
      }else{
        ConnectFour.endGame(winner);
      }
      if(this.playerTurn === 'O'){
        this.playerTurn = 'X';
      }else{
        this.playerTurn = 'O';
      }
    }
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
          countO++;
          if(countO === 4){
            winner = 'O';
          }
          if(countX > 0){
            countX = 0;
          }
        }else if(grid[i][j] === 'X'){
          countX++;
          if(countX === 4){
            winner = 'X';
          }
          if(countO > 0){
            countO = 0;
          }
        }else{
          countX = countO = 0;
        }
      }
    }
    if(winner === 'X' || winner === 'O'){
      return winner;
    }
    // Recognize horizontal wins

    // Recognize vertical wins
    for(let i = 0; i < grid[0].length; i++){
      countX = countO = 0;
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
        else{
          countX = countO = 0;
        }
      }
    }
    // Recognize vertical wins

    if(winner === 'X' || winner === 'O'){
      return winner;
    }else if(count === grid.length * grid[0].length){
      return 'T';
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
