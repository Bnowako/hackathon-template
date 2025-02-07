.PHONY: install run-backend run-frontend start

install:
	cd back && make setup-local
	cd ../front && bun i

run-backend:
	cd back && make run

run-frontend:
	cd front && bun run dev

start:
	osascript -e 'tell application "Terminal" to do script "cd $(shell pwd)/back && make run"'
	osascript -e 'tell application "Terminal" to do script "cd $(shell pwd)/front && bun run dev"'