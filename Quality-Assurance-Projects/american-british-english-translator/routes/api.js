'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
	const translator = new Translator()

	app.route('/api/translate').post((req, res) => {
		const { text, locale } = req.body
		if (!locale || text === undefined) {
			res.status(400).send({ error: 'Required field(s) missing' })
			return
		}
		if (text === '') {
			res.status(400).send({ error: 'No text to translate' })
			return
		}

		let translation
		if (locale === 'american-to-british') {
			translation = translator.toBritishEnglish(text)
		} else if (locale === 'british-to-american') {
			translation = translator.toAmericanEnglish(text)
		} else {
			res.status(400).send({ error: 'Invalid value for locale field' })
			return
		}

		if (translation == text || !translation) {
			res
				.status(200)
				.send({ text, translation: 'Everything looks good to me!' })
			return
		} else {
			res.send({ text, translation: translation[1] })
		}
	})
}
