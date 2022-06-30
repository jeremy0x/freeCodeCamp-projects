const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', () => {
	test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
		chai
			.request(server)
			.post('/api/solve')
			.send({
				puzzle:
					'827549163531672894649831527496157382218396475753284916962415738185763249374928651',
			})
			.end((err, res) => {
				assert.equal(res.status, 200)
				assert.equal(
					res.body.solution,
					'827549163531672894649831527496157382218396475753284916962415738185763249374928651'
				)
				done()
			})
	})

	test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
		chai
			.request(server)
			.post('/api/solve')
			.send({
				// missing puzzle string
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Required field missing')
				done()
			})
	})

	test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
		chai
			.request(server)
			.post('/api/solve')
			.send({
				puzzle:
					'827549163531672894649831527496157382218396475753284916962415738185763249374928@#A',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Invalid characters in puzzle')
				done()
			})
	})

	test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
		chai
			.request(server)
			.post('/api/solve')
			.send({
				puzzle: '8275491635316728946498315274961',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
				done()
			})
	})

	test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
		chai
			.request(server)
			.post('/api/solve')
			.send({
				puzzle:
					'115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Puzzle cannot be solved')
				done()
			})
	})

	test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				coordinate: 'A3',
				value: '9',
			})
			.end((err, res) => {
				assert.equal(res.status, 200)
				assert.equal(res.body.valid, true)
				done()
			})
	})

	test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
		chai.request(server).post('/api/check').send({
			puzzle:
				'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
			coordinate: 'A1',
			value: '2',
	  }).end((err, res) => {
	    assert.equal(res.status, 200)
	    assert.equal(res.body.valid, false)
	    assert.equal(res.body.conflict.length, 1)
	    done()
	  })
	})

	test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
				coordinate: 'A1',
				value: '1',
			})
			.end((err, res) => {
				assert.equal(res.status, 200)
				assert.equal(res.body.valid, false)
				assert.equal(res.body.conflict.length, 2)
				done()
			})
	})

	test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'135762984946381257728459613694517832812936745357824196473298561581673429269145378',
				coordinate: 'A2',
				value: '6',
			})
			.end((err, res) => {
				assert.equal(res.status, 200)
				assert.equal(res.body.valid, false)
				assert.equal(res.body.conflict.length, 3)
				done()
			})
	})

	test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				// missing required fields
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Required field(s) missing')
				done()
			})
	})

	test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'1.5..2.84..63.12.7.2..5..h..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
				coordinate: 'A2',
				value: '3',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Invalid characters in puzzle')
				done()
			})
	})

	test('Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({ puzzle: '123456789123456789', coordinate: 'I7', value: '4' })
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
				done()
			})
	})

	test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				coordinate: 'J7',
				value: '4',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Invalid coordinate')
				done()
			})
	})

	test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
		chai
			.request(server)
			.post('/api/check')
			.send({
				puzzle:
					'769235418851496372432178956174569283395842761628713549283657194516924837947381625',
				coordinate: 'A2',
				value: 'y',
			})
			.end((err, res) => {
				assert.equal(res.status, 400)
				assert.equal(res.body.error, 'Invalid value')
				done()
			})
	})
})
