require('dotenv').config()

const { response } = require('express')
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

let personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
})

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
	let jeremy = new Person({
		name: 'Jeremy',
		age: 17,
		favoriteFoods: ['beans'],
	})

	jeremy.save((error, data) => {
		if (error) {
			console.log(error)
		} else {
			done(null, data)
		}
	})
}

let arrayOfPeople = [
	{
		name: 'David',
		age: 19,
		favoriteFoods: ['coldstone', 'ice-cream'],
	},
	{
		name: 'Sonic',
		age: 12,
		favoriteFoods: ['hamburger', 'pies'],
	},
	{
		name: 'Mickey',
		age: 15,
		favoriteFoods: ['hamburger', 'pizza'],
	},
]

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (error, createdPeople) => {
		if (error) {
			console.log(error)
		} else {
			done(null, createdPeople)
		}
	})
}

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (error, arrayOfResults) => {
		if (error) {
			console.log(error)
		} else {
			done(null, arrayOfResults)
		}
	})
}

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: [food] }, (error, result) => {
		if (error) {
			console.log(error)
		} else {
			done(null, result)
		}
	})
}

const findPersonById = (personId, done) => {
	Person.findById(personId, (error, result) => {
		if (error) {
			console.log(error)
		} else {
			done(null, result)
		}
	})
}

const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger'

	Person.findById(personId, (error, person) => {
		if (error) {
			console.log(error)
		} else {
			person.favoriteFoods.push(foodToAdd)

			person.save((error, updatedPerson) => {
				if (error) {
					console.log(error)
				} else {
					done(null, updatedPerson)
				}
			})
		}
	})
}

const findAndUpdate = (personName, done) => {
	const ageToSet = 20

	Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(error, updatedDoc) => {
			if (error) {
				console.log(error)
			} else {
				done(null, updatedDoc)
			}
		}
	)
}

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (error, removedPerson) => {
		if (error) {
			console.log(error)
		} else {
			done(null, removedPerson)
		}
	})
}

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary'

	Person.remove({ name: nameToRemove }, (error, response) => {
		if (error) {
			console.log(error)
		} else {
			response.ok = true
			response.n = response.deletedCount
			done(null, response)
		}
	})
}

const queryChain = (done) => {
	const foodToSearch = 'burrito'

	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 'asc' })
		.limit(2)
		.select('-age')
		.exec((error, filteredResult) => {
			if (error) {
				console.log(error)
			} else {
				done(null, filteredResult)
			}
		})
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
