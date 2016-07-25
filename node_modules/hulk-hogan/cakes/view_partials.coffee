Feature 'View Partials',

	"As a developer",
	"I want to use Mustache Partials",
	"In order to not repeat myself.", ->

		Scenario "Partials", ->

			app = null

			Given 'an Express server', ->
				express = require 'express'
				app = express.createServer()
				app.set 'views', process.cwd()+'/views'
				app.listen 3000

			And "it's registered to use Hulk-Hogan", ->
				app.set 'view engine', 'hulk'
				app.set 'view options', layout:false
				app.register '.hulk', require '../'

			fs = require 'fs'

			And 'I have a partial template file', ->
				file = 'views/salute.hulk'
				template = fs.readFileSync file
				template.toString().replace('\n','').should.eql 'How are you, {{what}}?'
				

			file_template = 'view_partials.hulk'
			And 'I have a template file that includes that partial', ->
				template = fs.readFileSync 'views/'+file_template
				template.toString().replace('\n','').should.eql 'Hello {{what}}! {{> salute}}'

			When 'I render that template', ->
				app.get '/', (req,res)->
					res.render file_template, {what : 'World'}

			Then 'it should output the rendered template with partial', (done)->
				agent = require 'superagent'
				agent.get 'http://localhost:3000', (res)->
					res.text.replace(/\n/g,'').should.eql 'Hello World! How are you, World?'
					done()

			after ->
				app.close()
