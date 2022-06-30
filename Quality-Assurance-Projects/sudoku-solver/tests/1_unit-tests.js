const chai = require('chai')
const assert = chai.assert

const Solver = require('../controllers/sudoku-solver.js')
let solver

suite('UnitTests', () => {
	test('Logic handles a valid puzzle string of 81 characters', () => {
		solver = new Solver()
		assert.equal(
			solver.validate(
				'135762984946381257728459613694517832812936745357824196473298561581673429269145378'
			),
			true
		)
	})

	test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
		solver = new Solver()
		assert.equal(
			solver.validate(
				'12345678912345678912345678912345678912345678912345A7891234567891234567891234567891'
			),
			false
		)
	})

	test('Logic handles a puzzle string that is not 81 characters in length', () => {
		solver = new Solver()
		assert.equal(solver.validate('123456789123456789'), false)
	})

	test('Logic handles a valid row placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkRowPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'3',
				'9'
			),
			true
		)
	})

	test('Logic handles an invalid row placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkRowPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'1',
				'2'
			),
			false
		)
	})

	test('Logic handles a valid column placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkColPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'3',
				'9'
			),
			true
		)
	})

	test('Logic handles an invalid column placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkColPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'1',
				'2'
			),
			false
		)
	})

	test('Logic handles a valid region (3x3 grid) placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkRegionPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'3',
				'9'
			),
			true
		)
	})

	test('Logic handles an invalid region (3x3 grid) placement', () => {
		solver = new Solver()
		assert.equal(
			solver.checkRegionPlacement(
				'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				'A',
				'1',
				'1',
				'2'
			),
			false
		)
	})

	test('Valid puzzle strings pass the solver', () => {
		solver = new Solver()
		assert.equal(
			solver.solve(
				'218396745753284196496157832531672984649831257827549613962415378185763429374928561'
			),
			'218396745753284196496157832531672984649831257827549613962415378185763429374928561'
		)
	})

	test('Invalid puzzle strings fail the solver', () => {
		solver = new Solver()
		assert.equal(
			solver.solve(
				'1234567891234567891234567891234567891234567891234567891234567891234567891234567891'
			),
			false
		)
	})

	test('Solver returns the expected solution for an incomplete puzzle', () => {
		solver = new Solver()
		assert.equal(
			solver.solve(
				'218396745753284196496157832531672984649831257827549613962415378185763429374928561'
			),
			'218396745753284196496157832531672984649831257827549613962415378185763429374928561'
		)
	})
})
