const chai = require('chai')
const assert = chai.assert

const Translator = require('../components/translator.js')
const translator = new Translator()

suite('Unit Tests', () => {
	suite('Translate to British English', () => {
		test('Translate Mangoes are my favorite fruit. to British English', (done) => {
			const american = 'Mangoes are my favorite fruit.'
			const british = 'Mangoes are my favourite fruit.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate I ate yogurt for breakfast. to British English', (done) => {
			const american = 'I ate yogurt for breakfast.'
			const british = 'I ate yoghurt for breakfast.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test("Translate We had a party at my friend's condo. to British English", (done) => {
			const american = "We had a party at my friend's condo."
			const british = "We had a party at my friend's flat."
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate Can you toss this in the trashcan for me? to British English', (done) => {
			const american = 'Can you toss this in the trashcan for me?'
			const british = 'Can you toss this in the bin for me?'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate The parking lot was full. to British English', (done) => {
			const american = 'The parking lot was full.'
			const british = 'The car park was full.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
			const american = 'Like a high tech Rube Goldberg machine.'
			const british = 'Like a high tech Heath Robinson device.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate To play hooky means to skip class or work. to British English', (done) => {
			const american = 'To play hooky means to skip class or work.'
			const british = 'To bunk off means to skip class or work.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate No Mr. Bond, I expect you to die. to British English', (done) => {
			const american = 'No Mr. Bond, I expect you to die.'
			const british = 'No Mr Bond, I expect you to die.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate Dr. Grosh will see you now. to British English', (done) => {
			const american = 'Dr. Grosh will see you now.'
			const british = 'Dr Grosh will see you now.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})

		test('Translate Lunch is at 12:15 today. to British English', (done) => {
			const american = 'Lunch is at 12:15 today.'
			const british = 'Lunch is at 12.15 today.'
			const translated = translator.toBritishEnglish(american)[0]
			assert.equal(translated, british)
			done()
		})
	})

	suite('Translate to American English', () => {
		test('Translate We watched the footie match for a while. to American English', (done) => {
			const british = 'We watched the footie match for a while.'
			const american = 'We watched the soccer match for a while.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate Paracetamol takes up to an hour to work. to American English', (done) => {
			const british = 'Paracetamol takes up to an hour to work.'
			const american = 'Tylenol takes up to an hour to work.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate First, caramelise the onions. to American English', (done) => {
			const british = 'First, caramelise the onions.'
			const american = 'First, caramelize the onions.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate I spent the bank holiday at the funfair. to American English', (done) => {
			const british = 'I spent the bank holiday at the funfair.'
			const american = 'I spent the public holiday at the carnival.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate I had a bicky then went to the chippy. to American English', (done) => {
			const british = 'I had a bicky then went to the chippy.'
			const american = 'I had a cookie then went to the fish-and-chip shop.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test("Translate I've just got bits and bobs in my bum bag.to American English", (done) => {
			const british = "I've just got bits and bobs in my bum bag."
			const american = "I've just got odds and ends in my fanny pack."
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate The car boot sale at Boxted Airfield was called off. to American English', (done) => {
			const british = 'The car boot sale at Boxted Airfield was called off.'
			const american = 'The swap meet at Boxted Airfield was called off.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate Have you met Mrs Kalyani? to American English', (done) => {
			const british = 'Have you met Mrs Kalyani?'
			const american = 'Have you met Mrs. Kalyani?'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test("Translate Prof Joyner of King's College, London. to American English", (done) => {
			const british = "Prof Joyner of King's College, London."
			const american = "Prof. Joyner of King's College, London."
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})

		test('Translate Tea time is usually around 4 or 4.30. to American English', (done) => {
			const british = 'Tea time is usually around 4 or 4.30.'
			const american = 'Tea time is usually around 4 or 4:30.'
			const translated = translator.toAmericanEnglish(british)[0]
			assert.equal(translated, american)
			done()
		})
	})

	suite('Highlight translation', () => {
		test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
			const american = 'Mangoes are my favourite fruit.'
			const british =
				'Mangoes are my <span class="highlight">favorite</span> fruit.'
			const translated = translator.toAmericanEnglish(american)[1]
			assert.equal(translated, british)
			done()
		})

		test('Highlight translation in I ate yogurt for breakfast.', (done) => {
			const british = 'I ate yoghurt for breakfast.'
			const american =
				'I ate <span class="highlight">yogurt</span> for breakfast.'
			const translated = translator.toAmericanEnglish(british)[1]
			assert.equal(translated, american)
			done()
		})

		test('Highlight translation in We watched the footie match for a while.', (done) => {
			const british = 'We watched the footie match for a while.'
			const american =
				'We watched the <span class="highlight">soccer</span> match for a while.'
			const translated = translator.toAmericanEnglish(british)[1]
			assert.equal(translated, american)
			done()
		})

		test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
			const british = 'Paracetamol takes up to an hour to work.'
			const american =
				'<span class="highlight">Tylenol</span> takes up to an hour to work.'
			const translated = translator.toAmericanEnglish(british)[1]
			assert.equal(translated, american)
			done()
		})
	})
})
