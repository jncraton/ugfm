all: do.min.css ugfm.min.js favicon.ico index.html

lint:
	npx prettier@3.6.2 --check .
	npx jshint@2.13.6
	
format:
	npx prettier@3.6.2 --write .

ugfm.min.js: ugfm.js
	npx uglify-js@3.19.3 --compress --mangle -- $< > $@
	wc -c $@

index.html: demo.html
	cp -f $< $@
	sed -i '/autocomplete="off">/r readme.md' $@

do.min.css:
	wget https://github.com/jncraton/docss/releases/download/v0.2.0/do.min.css

test: index.html
	uv run --with pytest-playwright==0.7.2 python -m playwright install chromium firefox
	uv run --with pytest-playwright==0.7.2 python -m pytest --browser chromium --browser firefox

favicon.ico:
	convert -size 48x48 xc:"#008030" -font "Noto-Mono" -pointsize 40 -fill white -gravity north -annotate 0 "md" -define icon:auto-resize=16,32,48 favicon.ico

clean:
	rm -rf .pytest_cache __pycache__ favicon* do.min.css ugfm.min.js index.html
