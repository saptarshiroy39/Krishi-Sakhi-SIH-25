#!/bin/sh
source .venv/bin/activate
python -m flask --app 'main:create_app()' run --debug --port 3000
