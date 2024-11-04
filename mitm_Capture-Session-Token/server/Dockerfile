# Dockerfile for server
FROM python:3.9-slim

WORKDIR /app

COPY server.py /app

RUN pip install flask

EXPOSE 3000

CMD ["python", "server.py"]