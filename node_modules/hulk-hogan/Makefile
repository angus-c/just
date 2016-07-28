food:	
	@mocha -R spec -r should -r mocha-cakes --globals log cakes/*.coffee

shake:
	@mocha -R spec -r should -r mocha-cakes --globals log $$(find spec -name \*.coffee)

buffet: shake food

.PHONY: food shake buffet
