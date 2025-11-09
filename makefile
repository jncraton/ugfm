all: do.min.css ugfm.min.js favicon.ico

lint:
	npx prettier@3.6.2 --check .
	npx jshint@2.13.6
	
format:
	npx prettier@3.6.2 --write .

ugfm.min.js: ugfm.js
	npx uglify-js@3.19.3 --compress --mangle -- $< > $@
	wc -c $@

do.min.css:
	wget https://jncraton.github.io/docss/do.min.css

test: index.html
	pytest --browser firefox --browser chromium

favicon.ico:
	convert -size 48x48 xc:"#008030" -font "Noto-Mono" -pointsize 40 -fill white -gravity north -annotate 0 "md" -define icon:auto-resize=16,32,48 favicon.ico

dev-deps:
	pip3 install pytest-playwright==0.7.1 && playwright install

clean:
	rm -rf .pytest_cache __pycache__ favicon* do.min.css ugfm.min.js
