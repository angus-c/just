Feature 'Express Engine',

	"As a developer",
	"I want to use Hulk-Hogan",
	"In order to use Hogan.js with Express", ->

		Scenario "Express 2.x", ->

			app = null

			Given 'an Express server', ->
				express = require 'express'
				app = express.createServer()
				app.set 'views', process.cwd()+'/views'
				app.listen 3000

			And "it's registered to use Hulk-Hogan", ->
				app.set 'view options', layout:false
				app.register '.hulk', require '../'

			fs = require 'fs'
			And 'I have a template file', ->
				file = 'views/express_engine.hulk'
				template = fs.readFileSync file
				template.toString().should.eql 'Hello {{what}}!'

			When 'I render that template', ->
				app.get '/', (req,res)->
					res.render 'express_engine.hulk', {what : 'World'}

			Then 'it should output rendered with Hogan.js', (done)->
				agent = require 'superagent'
				agent.get 'http://localhost:3000', (res)->
					res.text.should.eql 'Hello World!'
					done()

			after ->
				app.close()
