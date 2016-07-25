Describe 'hulk.coffee', ->
	hulk = require '../hulk'

	describe '#parsePartials(source)', ->
		it 'should return a list of partials', ->
			hulk.parsePartials('{{> test}} hi {{>test2}}').should.eql ['test', 'test2']

	describe '#compile()', ->
		it 'should be a function', ->
			hulk.compile.should.be.a 'function'
		it 'should return a function', ->
			hulk.compile().should.be.a 'function'

		it 'should compile template', ->
			hulk.compile('Hello {{what}}', {what:'world'})().should.eql 'Hello world'

		describe 'Partials', ->
			fs = require 'fs'
			file = 'test_partial'
			before ->
				fs.writeFileSync file, 'How are you, {{what}}?'

			it 'should include and compile template with {{> filename}} tag.', ->
				hulk.compile("Hello {{what}}. {{> #{file}}}", {what:'world'})().should.eql 'Hello world. How are you, world?'

			after ->
				fs.unlinkSync file

		describe 'Default Extension Partials', ->
			fs = require 'fs'
			filename = 'test_partial'
			file = filename+'.hulk'
			before ->
				fs.writeFileSync file, 'How are you, {{what}}?'

			it 'should include and compile template with {{> filename}} tag without extension.', ->
				hulk.compile("Hello {{what}}. {{> #{filename}}}", {what:'world', defaultEngine:'hulk'})().should.eql 'Hello world. How are you, world?'

			after ->
				fs.unlinkSync file

		describe 'Ignore missing Partials', ->
			before ->
			it 'should not throw if partials is missing', ->
				(->
					hulk.compile("Hi {{> test_ignore}}", {defaultEngine:'hulk'})().should.eql 'Hi '
				).should.not.throw()

		describe 'Recursive Sub-Partials', ->
			it 'should include partials from partials', ->
				hulk.compile('Yes, {{>view_partials}}', {what:'you', defaultEngine:'hulk', root:'views'})().replace(/\n/g,'').should.eql 'Yes, Hello you! How are you, you?'
