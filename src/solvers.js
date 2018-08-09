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
      if (solution.hasAnyRooksConflicts(i, j)) {
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
  var solutionCount = 0; //fixme
  //run findNRooksSolution function and use has any rooks 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  // debugger;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log('before: ', solution.rows());
      solution.togglePiece(i, j);
      if (solution.hasAnyQueensConflicts(i, j)) {
        solution.togglePiece(i, j);
        console.log('after: ', solution.rows());
      }
    }
  }

  var solution = solution.rows();
  // console.log('queens: ' + solution);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
