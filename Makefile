.PHONY: install run-backend run-frontend start

install:
	cd back && make setup-local
	cd ../front && bun i

run-backend:
	cd back && make run

run-frontend:
	cd front && bun run dev
