FROM golang:1.23

# Install project dependencies
RUN go install github.com/boumenot/gocover-cobertura@v1.3.0

# ------------------------
# BELOW SETS UP QODO COVER
# ------------------------

# Install system dependencies required by cover-agent-pro
RUN apt-get update && apt-get install -y \
    wget \
    sqlite3 \
    libsqlite3-dev \
    jq \
    python3 \
    python3-pip

# Force global installation of jinja2-cli
RUN pip3 install --break-system-packages jinja2-cli

# Define an argument for the cover-agent-pro release version
ARG ACTION_REF

# Download cover-agent-pro binary from GitHub releases and make it executable
RUN wget -q -O /usr/local/bin/cover-agent-pro \
    "https://github.com/qodo-ai/qodo-ci/releases/download/${ACTION_REF}/cover-agent-pro" && \
    chmod +x /usr/local/bin/cover-agent-pro

# Set the working directory to /app, where the user's repository will be mounted
WORKDIR /app