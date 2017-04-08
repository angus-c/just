.PHONY: clean compile npm test

compile: clean npm
	node_modules/.bin/coffee -o js/ coffee/

npm:
	npm install

clean:
	rm -rf js/

test: compile
	node_modules/.bin/coffee test/example.coffee
