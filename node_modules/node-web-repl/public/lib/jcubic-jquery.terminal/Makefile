VERSION=0.4.17
JSC=java -jar bin/closure.bin/compiler.jar --js
SED=sed

ALL: js/jquery.terminal-$(VERSION).js js/jquery.terminal-$(VERSION).min.js

js/jquery.terminal-$(VERSION).js: js/jquery.terminal-src.js
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/`date -uR`/g" js/jquery.terminal-src.js > js/jquery.terminal-$(VERSION).js

js/jquery.terminal-$(VERSION).min.js: js/jquery.terminal-$(VERSION).js
	$(JSC) js/jquery.terminal-$(VERSION).js > js/jquery.terminal-$(VERSION).min.js
