check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	./node_modules/.bin/mocha

.PHONY: check lint test
