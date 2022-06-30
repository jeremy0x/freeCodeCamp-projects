const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')
require('../connection')

chai.use(chaiHttp)

let deleteID

suite('Functional Tests', function () {
	suite('POST /api/issues/{project} => create new issue', function () {
		test('Every field filled in', function (done) {
			chai
				.request(server)
				.post('/api/issues/projects')
				.set('content-type', 'application/json')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
					created_by: 'Functional Test - Every field filled in',
					assigned_to: 'Chai and Mocha',
					status_text: 'In QA',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
          deleteID = res.body._id
					assert.equal(res.body.issue_title, 'Title')
					assert.equal(res.body.issue_text, 'text')
					assert.equal(
						res.body.created_by,
						'Functional Test - Every field filled in'
					)
					assert.equal(res.body.assigned_to, 'Chai and Mocha')
					assert.equal(res.body.status_text, 'In QA')
					done()
				})
		})

		test('Required fields filled in', function (done) {
			chai
				.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
					created_by: 'Functional Test - Required fields filled in',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.body.issue_title, 'Title')
					assert.equal(res.body.issue_text, 'text')
					assert.equal(
						res.body.created_by,
						'Functional Test - Required fields filled in'
					)
					assert.equal(res.body.assigned_to, '')
					assert.equal(res.body.status_text, '')
					done()
				})
		})

		test('Missing required fields', function (done) {
			chai
				.request(server)
				.post('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'required field(s) missing')
					done()
				})
		})
	})

	//////////////// GET REQUEST TESTS /////////////////////

	suite(
	'GET /api/issues/{project} => Array of objects with issue data',
	function () {
		test('No filter', function (done) {
			chai
				.request(server)
				.get('/api/issues/test')
				.query({})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.isArray(res.body)
					assert.property(res.body[0], 'issue_title')
					assert.property(res.body[0], 'issue_text')
					assert.property(res.body[0], 'created_on')
					assert.property(res.body[0], 'updated_on')
					assert.property(res.body[0], 'created_by')
					assert.property(res.body[0], 'assigned_to')
					assert.property(res.body[0], 'open')
					assert.property(res.body[0], 'status_text')
					assert.property(res.body[0], '_id')
					done()
				})
		})

		test('One filter', function (done) {
			chai
				.request(server)
				.get('/api/issues/test')
				.query({
					issue_title: 'Title',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.isArray(res.body)
					assert.property(res.body[0], 'issue_title')
					assert.property(res.body[0], 'issue_text')
					assert.property(res.body[0], 'created_on')
					assert.property(res.body[0], 'updated_on')
					assert.property(res.body[0], 'created_by')
					assert.property(res.body[0], 'assigned_to')
					assert.property(res.body[0], 'open')
					assert.property(res.body[0], 'status_text')
					assert.property(res.body[0], '_id')
					done()
				})
		})

		test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
			chai
				.request(server)
				.get('/api/issues/test')
				.query({
					issue_title: 'Title',
					issue_text: 'text',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.isArray(res.body)
					assert.property(res.body[0], 'issue_title')
					assert.property(res.body[0], 'issue_text')
					assert.property(res.body[0], 'created_on')
					assert.property(res.body[0], 'updated_on')
					assert.property(res.body[0], 'created_by')
					assert.property(res.body[0], 'assigned_to')
					assert.property(res.body[0], 'open')
					assert.property(res.body[0], 'status_text')
					assert.property(res.body[0], '_id')
					done()
				})
		})
	}
)

	//////////////// PUT REQUEST TESTS /////////////////////

	suite('PUT /api/issues/{project} => Text', function () {
		test('No body', function (done) {
			chai
				.request(server)
				.put('/api/issues/test')
				.send({})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.text, '{"error":"missing _id"}')
					done()
				})
		})

		test('One field to update', function (done) {
			chai
				.request(server)
				.put('/api/issues/test')
				.send({
					_id: '5c9b8f9b9d8f9b9c9a8b9f9',
					issue_title: 'Title',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(
						res.text,
						'{"error":"could not update","_id":"5c9b8f9b9d8f9b9c9a8b9f9"}'
					)
					done()
				})
		})

		test('Multiple fields to update', function (done) {
			chai
				.request(server)
				.put('/api/issues/test')
				.send({
					_id: '5c9b8f9b9d8f9b9c9a8b9f9',
					issue_title: 'Title',
					issue_text: 'text',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(
						res.text,
						'{"error":"could not update","_id":"5c9b8f9b9d8f9b9c9a8b9f9"}'
					)
					done()
				})
		})

		test('Missing _id', function (done) {
			chai
				.request(server)
				.put('/api/issues/test')
				.send({
					issue_title: 'Title',
					issue_text: 'text',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.text, '{"error":"missing _id"}')
					done()
				})
		})

		test('No fields to update', function (done) {
			chai
				.request(server)
				.put('/api/issues/test')
				.send({
					_id: '5c9b8f9b9d8f9b9c9a8b9f9',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(
						res.text,
						'{"error":"no update field(s) sent","_id":"5c9b8f9b9d8f9b9c9a8b9f9"}'
					)
					done()
				})
		})
	})

	//////////////// DELETE REQUEST TESTS /////////////////////

	suite('DELETE /api/issues/{project} => delete an issue', function () {
		test('Valid id', function (done) {
			chai
				.request(server)
				.delete('/api/issues/projects')
				.send({
					_id: deleteID,
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.body.result, 'successfully deleted')
					done()
				})
		})

		test('Invalid id', function (done) {
			chai
				.request(server)
				.delete('/api/issues/projects')
				.send({
					_id: '5fe0c500ec2f6f4c1815a770invalid',
				})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'could not delete')
					done()
				})
		})
		test('Missing id', function (done) {
			chai
				.request(server)
				.delete('/api/issues/projects')
				.send({})
				.end(function (err, res) {
					assert.equal(res.status, 200)
					assert.equal(res.body.error, 'missing _id')
					done()
				})
		})
	})
})
