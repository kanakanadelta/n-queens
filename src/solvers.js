/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  // var solution = newBoard.rows();
  // console.log(solution);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      solution.togglePiece(i, j);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(i, j);
      }
    }
  }
  //manipulating solution
  //  --> use togglePiece helper function to place piece
  //iterate through the rows
  //  --> nest another for loop to toggle piece in column
  //  --> use our helper function (hasAnyRooksConflicts) to check for conflicts (columns and rows)

  //change our object of arrays to an array of arrays for the spec
  var solution = solution.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //define initial board
  var solution = new Board({n: n});
  //iterating through the columns
  //function that takes row as an input and iterates through the rows recursively
  //  -->finds possible solutions in the possible solution branches
  var iterateThroughRows = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (!solution.hasAnyRooksConflicts()) {
        //iterate through the remainder of the board with pieces of current branch still in place 
        iterateThroughRows(row + 1);
        //take current piece off and continue iterating through the columns
      }

      solution.togglePiece(row, i);
    }
  }

  
  //start from first row
  iterateThroughRows(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  var solutionArray;
  // var numPieces = _.reduce(solution.rows(), function(memo, row) {
  //   return memo + _.reduce(row, function(memo, col) {
  //     return memo + col;
  //   }, 0);
  // }, 0);
  // //need to check if number of pieces on the board is equal to n
  // //if not must reset board and loop through with different column start

  // for (let i = 0; i < n; i++) {
  //   for (let j = 0; j < n; j++) {
  //     console.log('before: ', solution.rows());
  //     solution.togglePiece(i, j);
  //     if (solution.hasAnyQueensConflicts()) {
  //       console.log(numPieces)
  //       solution.togglePiece(i, j);
  //       console.log('after: ', solution.rows());
  //     }
  //   }
  // }

  // var solution = solution.rows();

  // // console.log('queens: ' + solution);
  var iterateThroughRows = function(row) {
    if (row === n) {
      // solution = new Board(solution);
      // return solutionArray.rows();
      // console.log(solution);
      solutionArray = JSON.parse(JSON.stringify(solution));
      return solutionArray;
    }

    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (!solution.hasAnyQueensConflicts()) {
        //iterate through the remainder of the board with pieces of current branch still in place 
        // let solutionArray = _.map(solution, function(rowIndex) {
        //   return rowIndex
        // })

        // for(var j = 0; j < solution.rows().length; j++){
        //   solutionArray.push(solution.rows()[j]);
        // }
        // solutionArray.push(JSON.parse(JSON.stringify(solution.get(row))));
        iterateThroughRows(row + 1);
        //take current piece off and continue iterating through the columns
      }

      solution.togglePiece(row, i);
    }
  }

  //start from first row
  iterateThroughRows(0);

  solutionArray = Object.keys(solutionArray).map(function(key) {
    return solutionArray[key];
  });

  solutionArray.pop();
  // console.log(solutionArray);
  // let noMoreBrackets = [];
  // for (let i = 0; i < solutionArray.length; i++) {
  //   noMoreBrackets.push(solutionArray[i][0]);
  // }

  console.log('Single solution for ' + n + ' queens:', solutionArray);
  return solutionArray;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  //define initial board
  var solution = new Board({n: n});
  //iterating through the columns
  //function that takes row as an input and iterates through the rows recursively
  //  -->finds possible solutions in the possible solution branches
  var iterateThroughRows = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let i = 0; i < n; i++) {
      solution.togglePiece(row, i);

      if (!solution.hasAnyQueensConflicts()) {
        //iterate through the remainder of the board with pieces of current branch still in place 
        iterateThroughRows(row + 1);
        //take current piece off and continue iterating through the columns
      }

      solution.togglePiece(row, i);
    }
  }

  
  //start from first row
  iterateThroughRows(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
