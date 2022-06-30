class SudokuSolver {
	validate(puzzleString) {
		if (!/^[0-9.]+$/.test(puzzleString)) return false
		if (puzzleString.length !== 81) return false
		return true
	}

	letterToNumber(row) {
		switch (row.toUpperCase()) {
			case 'A':
				return 1
			case 'B':
				return 2
			case 'C':
				return 3
			case 'D':
				return 4
			case 'E':
				return 5
			case 'F':
				return 6
			case 'G':
				return 7
			case 'H':
				return 8
			case 'I':
				return 9
			default:
				return 'none'
		}
	}

	checkRowPlacement(puzzleString, row, col, value) {
		let grid = this.transform(puzzleString)
		row = this.letterToNumber(row)

		// check if value is already placed in puzzle on that coordinate
		if (grid[row - 1][col - 1] == value) return true

		// check if value is already in the row
		for (let i = 0; i < 9; i++) {
			if (grid[row - 1][i] == value) {
				return false
			}
		}
		return true
	}

	checkColPlacement(puzzleString, row, col, value) {
		let grid = this.transform(puzzleString)
		row = this.letterToNumber(row)

		// check if value is already placed in puzzle on that coordinate
		if (grid[row - 1][col - 1] == value) return true

		// check if value is already in the column
		for (let i = 0; i < 9; i++) {
			if (grid[i][col - 1] == value) {
				return false
			}
		}
		return true
	}

	checkRegionPlacement(puzzleString, row, col, value) {
		let grid = this.transform(puzzleString)
		row = this.letterToNumber(row)

		// check if value is already placed in puzzle on that coordinate
		if (grid[row - 1][col - 1] == value) return true

		// check if value is already in the region
		let startRow = row - (row % 3),
			startCol = col - (col % 3)

		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++)
				if (grid[i + startRow][j + startCol] == value) return false
		return true
	}

  // backtracking algorithm to solve the sudoku
	solveSudoku(grid, row, col) {
		const N = 9
		if (row == N - 1 && col == N) {
			return grid
		}
		if (col == N) {
			row++
			col = 0
		}
		if (grid[row][col] != 0) {
			return this.solveSudoku(grid, row, col + 1)
		}
		for (let num = 1; num < 10; num++) {
			if (this.isSafe(grid, row, col, num)) {
				grid[row][col] = num
				if (this.solveSudoku(grid, row, col + 1)) return grid
			}
			grid[row][col] = 0
		}
		return false
	}

	isSafe(grid, row, col, num) {
		// check if the number is already in the row
		for (let x = 0; x < 9; x++) if (grid[row][x] == num) return false

		// check if the number is already in the column
		for (let x = 0; x < 9; x++) if (grid[x][col] == num) return false

		// check if the number is already in the 3x3 box
		let boxRowStart = row - (row % 3),
			boxColStart = col - (col % 3)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (grid[i + boxRowStart][j + boxColStart] == num) return false
			}
		}
		return true
	}

  // convert string to array
	transform(puzzleString) {
		let grid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		]
		let row = -1
		let col = 0
		for (let i = 0; i < puzzleString.length; i++) {
			if (i % 9 == 0) row++
			if (col % 9 == 0) col = 0
			grid[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i]
			col++
		}
		return grid
	}

	transformBack(grid) {
		// convert array to string
		return grid.flat().join('')
	}

  solve(puzzleString) {
    // console.log('puzzleString', puzzleString)
    
    // check if the puzzleString is valid
		if (puzzleString.length != 81) return false
    if (/[^0-9.]/g.test(puzzleString)) return false

    // solve the puzzle
    let puzzleGrid = this.transform(puzzleString)
    // console.log('puzzleGrid', puzzleGrid)
  
    let solvedPuzzle = this.solveSudoku(puzzleGrid, 0, 0)
    // console.log('solvedPuzzle', solvedPuzzle)
    // return false if the puzzle is not solved
    if (!solvedPuzzle) return false
    
    // convert array to string
		let solvedString = this.transformBack(solvedPuzzle)
    // console.log('solvedString', solvedString)
    
		return solvedString
	}
}

module.exports = SudokuSolver
