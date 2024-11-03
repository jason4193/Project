FROM python:3.12-slim

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    wget \
    netcat-openbsd \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Chromium and its dependencies
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
RUN npm install

# Ensure the server.py file has the correct permissions
RUN chmod 755 /app/server.py

EXPOSE 3001
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x wait-for-it.sh

EXPOSE 3001

CMD ["/wait-for-it.sh", "xss2-database", "3306", "--", "python", "server.py"]