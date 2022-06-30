'use strict'

const SudokuSolver = require('../controllers/sudoku-solver.js')

module.exports = function (app) {
	let solver = new SudokuSolver()

	app.route('/api/check').post((req, res) => {
		const { puzzle, coordinate, value } = req.body

		// check if input is valid
		if (!puzzle || !coordinate || !value)
			res.status(400).send({ error: 'Required field(s) missing' })

		const row = coordinate.split('')[0]
		const col = coordinate.split('')[1]

		if (coordinate.length !== 2 || !/^[A-I]$/.test(row) || !/^[1-9]$/.test(col))
			res.status(400).send({ error: 'Invalid coordinate' })

		if (value.match(/[^1-9]/)) res.status(400).send({ error: 'Invalid value' })

		if (puzzle.length != 81)
			res
				.status(400)
				.send({ error: 'Expected puzzle to be 81 characters long' })

		if (/[^0-9.]/g.test(puzzle))
			res.status(400).send({ error: 'Invalid characters in puzzle' })

		// check if value doesn't conflict with row or column or region
		let validCol = solver.checkColPlacement(puzzle, row, col, value)
		let validRow = solver.checkRowPlacement(puzzle, row, col, value)
		let validRegion = solver.checkRegionPlacement(puzzle, row, col, value)
		if (validRow && validCol && validRegion) res.send({ valid: true })
		// if there are conflicts, send back the coordinates of the conflicts
		else {
			let conflicts = []
			if (!validCol) {
				conflicts.push('column')
			}
			if (!validRow) {
				conflicts.push('row')
			}
			if (!validRegion) {
				conflicts.push('region')
			}
			return res.json({ valid: false, conflict: conflicts })
		}
	})

	app.route('/api/solve').post((req, res) => {
		const { puzzle } = req.body

		// check if puzzle submitted is valid
		if (!puzzle) {
			res.status(400).send({ error: 'Required field missing' })
		}
		if (!/^[0-9.]+$/.test(puzzle)) {
			res.status(400).send({ error: 'Invalid characters in puzzle' })
		}
		if (puzzle.length !== 81) {
			res
				.status(400)
				.send({ error: 'Expected puzzle to be 81 characters long' })
		}

		// solve puzzle
		const solution = solver.solve(puzzle)
		if (!solution) {
			res.status(400).send({ error: 'Puzzle cannot be solved' })
		} else {
			res.send({ solution: solution })
		}
	})
}
