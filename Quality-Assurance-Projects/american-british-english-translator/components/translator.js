const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishOnly = require('./british-only.js')

const reverseDictionary = (dictionary) => {
	return Object.assign(
		{},
		...Object.entries(dictionary).map(([key, value]) => ({ [value]: key }))
	)
}

class Translator {
	toBritishEnglish(text) {
		const dictionary = { ...americanOnly, ...americanToBritishSpelling }
		const titles = americanToBritishTitles
		const timeRegex = /\d{1,2}\:\d{2}/g
		const translated = this.translate(
			text,
			dictionary,
			titles,
			timeRegex,
			'toBritish'
		)
		if (!translated) return text
		return translated
	}

	toAmericanEnglish(text) {
		const dictionary = {
			...britishOnly,
			...reverseDictionary(americanToBritishSpelling),
		}
		const titles = reverseDictionary(americanToBritishTitles)
		const timeRegex = /\d{1,2}\.\d{2}/g
		const translated = this.translate(
			text,
			dictionary,
			titles,
			timeRegex,
			'toAmerican'
		)
		if (!translated) return text
		return translated
	}

	translate(text, dictionary, titles, timeRegex, locale) {
		const lowerText = text.toLowerCase()
		const matchesMap = {}

		// Search for titles/honorifics and add them to the matchesMap object
		Object.entries(titles).map(([key, value]) => {
			if (lowerText.includes(key)) {
				matchesMap[key] = value.charAt(0).toUpperCase() + value.slice(1)
			}
		})

		// Filter words with spaces from current dictionary
		const wordsWithSpace = Object.fromEntries(
			Object.entries(dictionary).filter(([key, value]) => key.includes(' '))
		)

		// Search for spaced word matches and add them to the matchesMap object
		Object.entries(wordsWithSpace).map(([key, value]) => {
			if (lowerText.includes(key)) matchesMap[key] = value
		})

		// Search for individual word matches and add'em to the matchesMap object
		lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach((word) => {
			if (dictionary[word]) matchesMap[word] = dictionary[word]
		})

		// Search for time matches and add'em to the matchesMap object
		const matchedTimes = lowerText.match(timeRegex)
		if (matchedTimes) {
			matchedTimes.map((item) => {
				if (locale === 'toBritish') {
					return (matchesMap[item] = item.replace(':', '.'))
				}
				return (matchesMap[item] = item.replace('.', ':'))
			})
		}

		// check for no matches
		if (Object.keys(matchesMap).length === 0) return null

		// Replace all matches with their corresponding translation
		console.log('matchesMap', matchesMap)
		const translation = this.replaceAll(text, matchesMap)
		const translationWithHighlight = this.replaceAllWithHighlight(
			text,
			matchesMap
		)
		return [translation, translationWithHighlight]
	}

	// replace all matches with their corresponding translation
	replaceAll(text, matchesMap) {
		const re = new RegExp(Object.keys(matchesMap).join('|'), 'gi')
		return text.replace(re, (matched) => matchesMap[matched.toLowerCase()])
	}

	// highlight replaced text(s)
	replaceAllWithHighlight(text, matchesMap) {
		const re = new RegExp(Object.keys(matchesMap).join('|'), 'gi')
		return text.replace(re, (matched) => {
			const match = matchesMap[matched.toLowerCase()]
			return `<span class="highlight">${match}</span>`
		})
	}
}

module.exports = Translator
