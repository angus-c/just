{join} = require 'path'
{existsSync} = require 'path'

class HulkHogan
	parsePartials : (source)->  # Return list of patial filenames in the source.
		{scan} = require 'hogan.js'
		result = []
		scanned = scan source
		for item in scanned
			if item.tag is '>'
				result.push item.n
		return result

	
	_readFile : (path)->
		{readFileSync} = require 'fs'
		return readFileSync(path).toString() # TODO better way to read file? especially large ones.

	getSourcePath : (file)-> # Get full filepath.
		join @root, file

	getSource : (file)->  # Return source file.
		filepath = @getSourcePath file

		if existsSync filepath
			return @_readFile filepath
		else if @ext and existsSync filepath+=".#{@ext}"
			return @_readFile filepath

		return ''
	
	_makePartials : (partials, list)->
		for file in list
			sublist = []
			source = null

			if file not of partials
				source = @getSource file

				if source
					partials[file] = source

					sublist = @parsePartials source

					if sublist.length
						@_makePartials partials, sublist
		
	render : (source, context={})->  # Shortcut for @compile(source, options)()
		do @compile source, context

	compile : (source='', options={})->
		@root = options.root if options.root
		@ext = options.defaultEngine if options.defaultEngine

		hogan = require 'hogan.js'
		compiled = hogan.compile source

		partials = {}
		# Get Partials #
		partial_files = @parsePartials source

		if partial_files.length
			@_makePartials partials, partial_files

		return ->
			return compiled.render options, partials

	__express : (filename, options, callback) =>
		# add support for Express 3.x templating scheme
		# in Express use like this:
		#
		#		app.engine 'html', hogan.__express
		#		app.set 'view engine', 'html'
		#
		source = @_readFile(filename)
		# pass options to compile method to support partials
		compiled = @compile(source, options)
		callback(null, compiled(options))

module.exports = new HulkHogan
