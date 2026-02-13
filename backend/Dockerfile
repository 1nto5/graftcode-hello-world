# Base image: Python 3.11 slim — minimal footprint, has everything we need
FROM python:3.11-slim

WORKDIR /usr/app

# Copy the Python service module into the container
COPY hello_service/ ./hello_service/

# Download and install Graftcode Gateway (gg) from the official grft-dev repository
# Uses .deb package format installed via dpkg (matches the official tutorial)
# ARM64 build for Apple Silicon (M1/M2/M3) — used for local development
# For AMD64 (production/CI), replace "arm64" with "amd64" in the URL
RUN apt-get update && apt-get install -y wget && \
    wget -O /usr/app/gg.deb \
    "https://github.com/grft-dev/graftcode-gateway/releases/latest/download/gg_linux_arm64.deb" && \
    dpkg -i /usr/app/gg.deb && \
    rm /usr/app/gg.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Expose ports:
#   80  — WebSocket endpoint for client connections (frontend connects here)
#   81  — Vision portal (web UI to browse services and get npm install command)
EXPOSE 80 81

# Start Graftcode Gateway, pointing it at our Python module directory
# --modules: tells gg where to find Python classes to expose
# --projectKey: authenticates with the Graftcode platform (passed at runtime)
CMD ["sh", "-c", "gg --modules /usr/app/hello_service/ --projectKey $GRAFTCODE_PROJECT_KEY"]
