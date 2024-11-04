# Network Vulnerabilities DEMO

This repository contains a set of demo challenges for practicing network security vulnerabilities. The challenges cover common web vulnerabilities such as SQL injection (SQLi), cross-site scripting
(XSS), and network capturing (MITM). Each challenge is designed to help you understand and exploit these vulnerabilities in a controlled environment.

## Challenges

1. [SQLi1: Basic Login Bypass](#sqli1-basic-login-bypass)
2. [SQLi2: Data Extraction with Union Injection](#sqli2-data-extraction-with-union-injection)
3. [XSS1: Reflected XSS](#xss1-reflected-xss)
4. [XSS2: Stored XSS](#xss2-stored-xss)
5. [MITM: Capture Session Token](#mitm-capture-session-token)

## Prerequisites
- Docker
- Docker Compose
- Web browser
- Wireshark (optional)

## SQLi1: Basic Login Bypass

### Introduction

In this challenge, you will perform a SQL injection attack to bypass a login page. The objective is to log in as any user by injecting a payload into the login form.

### Setup Instructions

1. Navigate to the `sqli1_Basic-Login-Bypass` directory:

    ```sh
    cd sqli1_Basic-Login-Bypass
    ```

2. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Try to bypass the login form by using SQL Injection.

## SQLi2: Data Extraction with Union Injection

### Introduction

In this challenge, you will use SQL injection to extract hidden data from the database using UNION injection. The objective is to retrieve sensitive information by manipulating the SQL query.

### Setup Instructions

1. Navigate to the `sqli2_Data-Extractio-with-Union-Injection` directory:

    ```sh
    cd sqli2_Data-Extractio-with-Union-Injection
    ```

2. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Use the search bar to perform UNION injection and extract hidden data.

## XSS1: Reflected XSS

### Introduction

In this challenge, you will perform a reflected XSS attack by injecting JavaScript into a search query. The objective is to execute a script that steals the user's cookie by exploiting the reflected XSS vulnerability.

hint: The admin will use the link that sent from the Debugging form.

### Setup Instructions

1. Navigate to the `xss1_Reflected-XSS` directory:

	```sh
	cd xss1_Reflected-XSS
	```

2. Build and run the Docker containers:

	```sh
	docker-compose up --build
	```

3. Open your browser and navigate to `http://localhost:3000`.

4. Try to craft a phishing link that exploits the reflected XSS vulnerability.

## XSS2: Stored XSS

### Introduction

In this challenge, you will perform a stored XSS attack by injecting JavaScript into a blog post. The objective is to steal the admin's cookie by exploiting the stored XSS vulnerability.

hint: The admin will view the homepage in periodical time.

### Setup Instructions

1. Navigate to the `xss2_Stored-XSS` directory:

    ```sh
    cd xss2_Stored-XSS
    ```

2. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Log in using the provided credentials and navigate to the AddBlog page.

5. Inject a script tag into the blog content to test for stored XSS.

## MITM: Capture Session Token

### Introduction

In this challenge, you will perform a man-in-the-middle attack to capture a session token from a packet capture file. The objective is to intercept the data between the client and server and extract the session token.

### Setup Instructions

1. Navigate to the `mitm_Capture-Session-Token` directory:

    ```sh
    cd mitm_Capture-Session-Token
    ```

2. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

3. Use `tcpdump` to capture the network traffic:

    ```sh
    docker exec -it <client_container_id> sh -c "apt-get update && apt-get install -y tcpdump"
    docker exec -it <client_container_id> tcpdump -i eth0 -w /tmp/capture.pcap
    ```

4. Copy the capture file to your host machine:

    ```sh
    docker cp <client_container_id>:/tmp/capture.pcap .
    ```

5. Open the capture file with Wireshark and use the `http.cookie` filter to locate the session token.

## Conclusion

These challenges are designed to help you understand and exploit common web and network vulnerabiltities. Follow the setup instructions for each challenge and try to achieve the objectives. Happy hacking! Write-ups for each challenge are available in the `writeups` directory.