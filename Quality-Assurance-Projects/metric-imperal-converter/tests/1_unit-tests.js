const chai = require('chai')
let assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

let convertHandler = new ConvertHandler()

suite('Unit Tests', function () {
	suite('convertHandler.getNum(input)', function () {
		test('correctly read whole number input', function (done) {
			assert.equal(convertHandler.getNum('2L'), 2)
			done()
		})

		test('correctly decimal number input', function (done) {
			assert.equal(convertHandler.getNum('2.3L'), 2.3)
			done()
		})

		test('correctly fractional input', function (done) {
			assert.equal(convertHandler.getNum('2/3L'), 2 / 3)
			done()
		})

		test('correctly fractional input with a decimal', function (done) {
			assert.equal(convertHandler.getNum('2.3/4.5L'), 2.3 / 4.5)
			done()
		})

		test('correctly return error on a double-fraction', function (done) {
			assert.equal(convertHandler.getNum('2/3/4L'), undefined)
			done()
		})

		test('correctly return 1 when no numerical input is provided', function (done) {
			assert.equal(convertHandler.getNum('L'), 1)
			done()
		})
	})

	suite('convertHandler.getNum(input)', function () {
		test('correctly read each valid input', function (done) {
			assert.equal(convertHandler.getUnit('2L'), 'L')
			done()
		})

		test('correctly return an error for an invalid input unit', function (done) {
			assert.equal(convertHandler.getUnit('2Ls'), undefined)
			done()
		})
	})

	suite('convertHandler.getReturnUnit(input)', function () {
		test('correctly return unit for each valid input', function (done) {
			let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
			let returnUnit = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']
			input.forEach(function (element, index) {
				assert.equal(convertHandler.getReturnUnit(element), returnUnit[index])
			})
			done()
		})
	})

	suite('convertHandler.spellOutUnit(unit)', function () {
		test('correctly return the spelled-out string unit for each valid input unit', function (done) {
			let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
			let expect = [
				'gallons',
				'liters',
				'miles',
				'kilometers',
				'pounds',
				'kilograms',
			]
			input.forEach(function (element, index) {
				assert.equal(convertHandler.spellOutUnit(element), expect[index])
			})
			done()
		})
	})

	suite('convertHandler.convert(number, unit)', function () {
		test('correctly convert gal to L', function (done) {
			let input = [5, 'gal']
			let expectedOutput = 18.9371
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})

		test('correctly convert L to gal', function (done) {
			let input = [5, 'l']
			let expectedOutput = 1.32086
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})

		test('correctly convert mi to km', function (done) {
			let input = [5, 'mi']
			let expectedOutput = 8.0467
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})

		test('correctly convert km to mi', function (done) {
			let input = [5, 'km']
			let expectedOutput = 3.10686
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})

		test('correctly convert lbs to kg', function (done) {
			let input = [5, 'lbs']
			let expectedOutput = 2.26796
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})

		test('correctly convert kg to lbs', function (done) {
			let input = [5, 'kg']
			let expectedOutput = 11.02312
			assert.approximately(
				convertHandler.convert(input[0], input[1]),
				expectedOutput,
				0.1
			)
			done()
		})
	})
})
