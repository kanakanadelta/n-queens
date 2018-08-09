// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log(this.attributes);
      // console.log(rowIndex)
      
      //initialize counter to check for piece counts
      var piecesInRow = 0;
      //iterate through the row index to count pieces in each row
      for (var i = 0; i < rowIndex.length; i++) {
        //if a piece is found
        if ( rowIndex[i] === 1) {
          //increment our piecesInRow counter
          piecesInRow++;
        }
      }
      //if more than 2 pieces found in row
      if (piecesInRow >= 2) {
        //conflict found = true
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //assign a matrix variable for board we are checking
      let matrix = this.rows();
      //iterate through each row index
      for (let i = 0; i < matrix.length; i++) {
        //check if row has conflict using method above
        if (this.hasRowConflictAt(matrix[i])) {
          //if found, return true
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      
      let matrix = this.rows();
      var piecesInColumn = 0;
      for (var i = 0; i < matrix.length; i++) {

        if (matrix[i][colIndex] === 1) {
          piecesInColumn++
        }
        if (piecesInColumn > 1){
          return true;
        }
      }
      return false; // fixme
    },

    // // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //assign a matrix variable for board we are checking
      let matrix = this.rows();
      //iterate through our matrix rows
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
  
      let matrix = this.rows();
      let pieceInDiagonal;
      let initial = majorDiagonalColumnIndexAtFirstRow;
      // console.log('initial:' + initial)
      while (majorDiagonalColumnIndexAtFirstRow < matrix.length){
        let columnIndex = majorDiagonalColumnIndexAtFirstRow;
        pieceInDiagonal = 0;
        for (let i = 0; i < matrix.length; i++) {
          console.log(`position: (${i}, ${columnIndex})`)
          if (i < matrix.length && columnIndex < matrix.length) {
            if (matrix[i][columnIndex] === 1) {
              pieceInDiagonal++;
              // console.log('pieces:' + pieceInDiagonal);
              // if (matrix[i][columnIndex] === undefined) {
              //   continue;
              // }
            }
            columnIndex++;
          }
        }
        if (pieceInDiagonal > 1) {
          return true;
        }
        majorDiagonalColumnIndexAtFirstRow++;
      }
      // majorDiagonalColumnIndexAtFirstRow = initial;
      
      while (initial < matrix.length){
        // console.log('initial in second while:' + initial);
        let rowIndex = initial;
        pieceInDiagonal = 0;
        for (let i = 0; i < matrix.length; i++) {
          console.log(`position: (${rowIndex}, ${i})`)
          if (i < matrix.length && rowIndex < matrix.length) {
            if (matrix[rowIndex][i] === 1) {
              pieceInDiagonal++;
              // console.log('pieces:' + pieceInDiagonal);
              if (matrix[rowIndex][i] === undefined) {
                continue;
              }
            }
            rowIndex++;
          }
        }
        if (pieceInDiagonal > 1) {
          return true;
        }
        initial++;
      }
  
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
  
      let matrix = this.rows();

      for (i = 0; i < matrix.length; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
