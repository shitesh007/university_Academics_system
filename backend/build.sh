#!/usr/bin/env bash
# Render build script for SAGE Portal Django backend
set -o errexit  # Exit on any error

# Install dependencies
pip install -r requirements.txt

# Collect static files (WhiteNoise needs this)
python manage.py collectstatic --noinput

# Run database migrations
python manage.py migrate
