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

    let flag = false;
    let countO = 0;
    let countX = 0;
    let winner = ' ';
    let count = 0;

    // Recognize empty grid as no winner
    grid.forEach((row) => {
      row.forEach((ele) => {
        if(ele !== ' '){
          count++;
          flag = true;
        }
      });
    });
    // Recognize empty grid as no winner

    // Recognize horizontal wins
    // grid.forEach((row) => {
    //   countO = 0;
    //   countX = 0;
    //   row.forEach((ele) => {
    //     if(ele === 'O'){
    //       countO++;
    //       if(countX > 0){
    //         countX = 0;
    //       }
    //     }else if(ele === 'X'){
    //       countX++;
    //       if(countO > 0){
    //         countO = 0;
    //       }
    //     }
    //   });
    //   if(countO >= 4){
    //     winner = 'O';
    //   }else if(countX >= 4){
    //     winner = 'X';
    //   }
    // });
    // if(winner === 'O' || winner === 'X'){
    //   return winner;
    // }
    // Recognize horizontal wins

    if(winner === 'O' || winner === 'X'){
      return winner;
    }else if(count === grid.length * grid[0].length){
      return 'T';
    }else if(flag === false){
      return flag;
    }else{
      return false;
    }


    // Recognize horizontal wins

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
