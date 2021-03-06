.PHONY: build deploy

build:
	npm run build

deploy:
	ssh root@85.187.132.237 -p 7822  'cd /var/www/khoahuy/bhxh && git pull'
