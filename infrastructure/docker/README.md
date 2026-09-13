# Docker services

The root `docker-compose.yml` is deliberately kept at repository level so `docker compose up -d` works from a freshly cloned project. It defines PostgreSQL, Redis, MinIO and the one-shot bucket initializer.
