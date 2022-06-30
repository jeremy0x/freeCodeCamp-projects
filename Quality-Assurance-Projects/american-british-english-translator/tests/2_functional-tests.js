const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server.js')

chai.use(chaiHttp)

let Translator = require('../components/translator.js')
let translator = new Translator()

suite('Functional Tests', () => {
	suite('POST /api/translate', () => {
		// Translation with text and locale fields: POST request to /api/translate
		test('POST /api/translate with text and locale fields', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					text: 'I ate yogurt for breakfast.',
					locale: 'american-to-british',
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(
						res.body.translation,
						'I ate <span class="highlight">yoghurt</span> for breakfast.'
					)
					done()
				})
		})

		// Translation with text and invalid locale field: POST request to /api/translate
		test('POST /api/translate with text and invalid locale field', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					text: 'I ate yogurt for breakfast.',
					locale: 'american-to-british-invalid',
				})
				.end((err, res) => {
					assert.equal(res.status, 400)
					assert.equal(res.body.error, 'Invalid value for locale field')
					done()
				})
		})

		// Translation with missing text field: POST request to /api/translate
		test('POST /api/translate with missing text field', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					locale: 'american-to-british',
				})
				.end((err, res) => {
					assert.equal(res.status, 400)
					assert.equal(res.body.error, 'Required field(s) missing')
					done()
				})
		})

		// Translation with missing locale field: POST request to /api/translate
		test('POST /api/translate with missing locale field', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					text: 'I ate yogurt for breakfast.',
				})
				.end((err, res) => {
					assert.equal(res.status, 400)
					assert.equal(res.body.error, 'Required field(s) missing')
					done()
				})
		})

		// Translation with empty text: POST request to /api/translate
		test('POST /api/translate with empty text', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					text: '',
					locale: 'american-to-british',
				})
				.end((err, res) => {
					assert.equal(res.status, 400)
					assert.equal(res.body.error, 'No text to translate')
					done()
				})
		})

		// Translation with text that needs no translation: POST request to /api/translate
		test('POST /api/translate with text that needs no translation', (done) => {
			chai
				.request(server)
				.post('/api/translate')
				.send({
					text: 'Everything looks good to me!',
					locale: 'american-to-british',
				})
				.end((err, res) => {
					assert.equal(res.status, 200)
					assert.equal(res.body.translation, 'Everything looks good to me!')
					done()
				})
		})
	})
})
