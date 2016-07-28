Describe 'index.js', ->
	index = require '../index.js'

	it 'should equal hulk.coffee', ->
		index.should.equal require '../hulk.coffee'
