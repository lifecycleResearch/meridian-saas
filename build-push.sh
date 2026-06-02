#!/usr/bin/env bash
set -euo pipefail
TAG="${1:-latest}"
IMAGE="ghcr.io/lifecycleresearch/meridian-saas:${TAG}"
echo "=== Building meridian-saas ${TAG} ==="
docker build --platform linux/amd64 -t "$IMAGE" .
echo "=== Pushing ==="
docker push "$IMAGE"
echo "Done: $IMAGE"
