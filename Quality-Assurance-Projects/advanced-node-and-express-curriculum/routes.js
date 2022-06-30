const passport = require('passport')
const bcrypt = require('bcrypt')

module.exports = function (app, myDataBase) {
	app.route('/').get((req, res) => {
		res.render('pug', {
			title: 'Connected to Database',
			message: 'Please login',
			showLogin: true,
			showRegistration: true,
			showSocialAuth: true,
		})
	})

	app
		.route('/login')
		.post(
			passport.authenticate('local', { failureRedirect: '/' }),
			function (req, res) {
				// Successful login, redirect to chat
				res.redirect('/chat')
			}
		)

	app.route('/profile').get(ensureAuthenticated, (req, res) => {
		res.render(process.cwd() + '/views/pug/profile', {
			username: req.user.username,
		})
	})

	app.route('/chat').get(ensureAuthenticated, (req, res) => {
		res.render(process.cwd() + '/views/pug/chat', {
			user: req.user,
		})
	})

	app.route('/logout').get((req, res) => {
		// Successful logout, redirect home
		req.logout()
		res.redirect('/')
	})

	app.route('/register').post(
		(req, res, next) => {
			myDataBase.findOne({ username: req.body.username }, function (err, user) {
				if (err) {
					next(err)
				} else if (user) {
					// User account already exists, redirect home
					res.redirect('/')
				} else {
					// User not found, add user
					const hash = bcrypt.hashSync(req.body.password, 12)
					myDataBase.insertOne(
						{
							username: req.body.username,
							password: hash,
						},
						(err, doc) => {
							if (err) {
								res.redirect('/')
							} else {
								// The inserted document is held within
								// the ops property of the doc
								next(null, doc.ops[0])
							}
						}
					)
				}
			})
		},
		passport.authenticate('local', { failureRedirect: '/' }),
		(req, res, next) => {
			// Successful authentication, redirect to chat
			res.redirect('/chat')
		}
	)

	app.route('/auth/github').get(passport.authenticate('github'))

	app
		.route('/auth/github/callback')
		.get(
			passport.authenticate('github', { failureRedirect: '/' }),
			(req, res) => {
				// Successful authentication, redirect to chat
				req.session.user_id = req.user.id
				res.redirect('/chat')
			}
		)

	app.use((req, res, next) => {
		res.status(404).type('text').send('Not Found')
	})
}

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	// User not authenticated, redirect home
	res.redirect('/')
}
