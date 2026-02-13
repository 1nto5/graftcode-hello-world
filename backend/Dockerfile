# Base image: Python 3.11 slim — minimal footprint, has everything we need
FROM python:3.11-slim

WORKDIR /usr/app

# Copy the Python service module into the container
COPY hello_service/ ./hello_service/

# Download and install Graftcode Gateway (gg)
# ARM64 build for Apple Silicon (M1/M2/M3) — used for local development
# For AMD64 (production/CI), replace "arm64" with "amd64" in the URL
RUN apt-get update && apt-get install -y curl && \
    curl -L -o /usr/local/bin/gg \
    "https://github.com/niceindiabro/gg/releases/download/latest/gg-linux-arm64" && \
    chmod +x /usr/local/bin/gg && \
    apt-get remove -y curl && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Expose ports:
#   80  — WebSocket endpoint for client connections (frontend connects here)
#   81  — Vision portal (web UI to browse services and get npm install command)
EXPOSE 80 81

# Start Graftcode Gateway, pointing it at our Python module directory
# --modules: tells gg where to find Python classes to expose
# --projectKey: authenticates with the Graftcode platform (passed at runtime)
CMD ["sh", "-c", "gg --modules /usr/app/hello_service/ --projectKey $GRAFTCODE_PROJECT_KEY"]
