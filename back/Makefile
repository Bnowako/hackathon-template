setup-local:
	( \
		uv venv --python 3.12.0; \
		source .venv/bin/activate; \
		uv pip install -r requirements/requirements-local.txt; \
	)
setup-prod:
	( \
		uv venv --python 3.12.0; \
		source .venv/bin/activate; \
		uv pip install -r requirements/requirements.txt; \
	)
run:
	( \
		source .venv/bin/activate; \
		uv run -m uvicorn src.main:app \
	)
lint:
	uv run ruff check --fix
