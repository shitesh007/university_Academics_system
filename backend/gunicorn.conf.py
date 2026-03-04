[gunicorn]
# ── Server Socket ──────────────────────────────────────────────────
bind = 0.0.0.0:8000
workers = 3
worker_class = sync
timeout = 120

# ── Logging ────────────────────────────────────────────────────────
accesslog = -
errorlog = -
loglevel = info

# ── App Entry ──────────────────────────────────────────────────────
# Run with: gunicorn -c gunicorn.conf.py config.wsgi:application
