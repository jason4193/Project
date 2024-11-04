# Project Report

## Introduction
This project aims to explore and demonstrate the common network and web vulnerabilities that exist in the OSI model. By setting up a virtual lab environment, we can simulate attacks and exploits those vulnerabilities. The project will cover the following aspects:

1. Application Layer: SQL Injection, Cross-Site Scripting (XSS) **(Major Focus)**

2. Presentation Layer & Session Layer: Man-in-the-Middle (MITM) attacks, Session Hijacking

3. Network Layer & Transport Layer: TCP SYN Flooding

5. Physical Layer & Data Link Layer: Denial of Service (DoS) attacks

The report will explain what I have done in each week, what I have learned, and what challenges I have faced. The report will also include the GitHub repository link where all the demonstration scripts are stored.

## Week 1
### Goals
- Study the OSI model and research vulnerabilities for each layer.
- Set up the initial virtual environment using VirtualBox.

### What I have done
- I have studied the OSI model and the vulnerabilities that exist in each layer.
- I have decided to use docker containers to simulate the virtual environment.

### Challenges
- I have never used docker containers before, so I need to learn how to use them.

## Week 2
### Goals
- Write the project proposal and logbook.
- Install tools like Wireshark, Nmap on the virtual machines.

### What I have done
- I have written the project proposal and logbook.
- I have installed Wireshark locally and testing it on my machine.

### Challenges
- I have faced some issues with the Wireshark installation.
- Initialising the docker containers and setting up the network.

## Week 3
### Goals
- Focus on Physical and Data Link layers.
- Simulate attacks like ARP spoofing or MAC flooding.

### What I have done
- I decided to research on Denial of Service (DoS) attacks.

### Challenges
- I have faced some issues with the ARP spoofing simulation.

### Detailed Log
I was planning to simulate ARP spoofing attacks in the virtual environment. However, I have faced some issues with the ARP spoofing simulation. I found that my foundentment knowledge on Networking is not enought to understand how the ARP works and how to simulate the ARP spoofing attack. I have decided to research on Denial of Service (DoS) attacks instead.

#### Denial of Service (DoS) Attacks
Denial of Service (DoS) attacks are designed to make a machine or network resource unavailable to its intended users. There are many types of DoS attacks, but the most common ones are:

1. **Buffer Overflow Attacks**: The attacker sends more data to a network resource than the buffer can handle, causing the system to crash.

2. **SYN Flood Attacks**: The attacker sends a large number of SYN requests to a server, causing it to run out of resources and become unresponsive.

3. **Ping of Death Attacks**: The attacker sends an oversized ping packet to a server, causing it to crash.

4. **Code crashes**: The attacker sends malformed packets to a server, which cause the not well-written server code to crash.

## Week 4
### Goals
- Focus on Network and Transport layers.
- Research on TCP SYN Flooding attacks.

### What I have done
- I have researched on TCP SYN Flooding attacks.

### Challenges
- I found that it is difficult for me to simulate the TCP SYN Flooding attack on my docker containers. I decided to just write out the steps to simulate the attack and explain it in the report.

### TCP SYN Flooding Attacks
TCP SYN Flooding attacks are designed to make a server unresponsive by sending a large number of TCP SYN requests. The attacker sends a SYN request to the server, but does not respond to the SYN-ACK response from the server. This causes the server to keep the connection open and eventually run out of resources.

The steps to simulate a TCP SYN Flooding attack are as follows:

1. Create a server in python that listens for incoming TCP connections.
```python
import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 1234))

server.listen(5)

while True:
    client, addr = server.accept()
    print(f"Connection from {addr}")
    client.send("Hello".encode())
    client.close()
```

2. Create a client in python that sends a large number of SYN requests to the server.
```python
import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('localhost', 1234))

 # Send 1000 SYN requests continuously (need to be a very large number to make the server unresponsive)
for _ in range(1000):
    client.send("SYN".encode())
```

3. Run the server and client scripts. The server will become unresponsive after a while due to the large number of SYN requests.

This attack can be mitigated by implementing firewall rules that limit the number of incoming connections or by using SYN cookies to handle incoming SYN requests.

There is one of the ways to prevent the TCP SYN Flooding attack:
- **SYN Cookies**: SYN cookies are a method of preventing SYN flooding attacks by not keeping track of the connection state on the server. Instead, the server sends a SYN-ACK response with a cookie to the client. The client then sends the ACK response with the cookie, and the server verifies the cookie before establishing the connection.

## Week 5
### Goals
- Focus on Session and Presentation layers.
- Research on Man-in-the-Middle (MITM) attacks and Session Hijacking.

### What I have done
- I have researched on how man-in-the-middle (MITM) attacks work.
- I have researched on how session hijacking works.
- I create a simple MITM attack of capturing the traffic between the client and server and stealing the session cookie.

### Challenges
- Lack of understanding of how packets are transmitted via the OSI model.

### Detailed Log
#### Man-in-the-Middle (MITM)
Man-in-the-Middle (MITM) attacks are designed to intercept and manipulate the communication between two parties. The attacker positions themselves between the client and server and captures the traffic passing between them. There are many types of MITM attacks, but the most common ones are:

1. **Packet Sniffing**: The attacker captures the packets passing between the client and server and reads the data.

2. **Session Hijacking**: The attacker steals the session cookie from the client and uses it to impersonate the client.

3. **SSL Stripping**: The attacker downgrades the HTTPS connection to HTTP and captures the unencrypted traffic.

#### Session Hijacking
Session hijacking is a type of MITM attack where the attacker steals the session cookie from the client and uses it to impersonate the client. 

This vulnerability is due to the fact that the session cookie is transmitted in plaintext, making it easy for the attacker to capture and use it. To demonstrate this vulnerability, I have created a simple MITM attack that captures the traffic between the client and server and steals the session cookie.

The code for the MITM attack is on my GitHub repository.

To reduce the risk of session hijacking, it is recommended to use secure cookies that are encrypted and have an expiration time. Additionally, using HTTPS instead of HTTP can prevent the session cookie from being captured by the attacker.

However, the MITM attack can still be perform with multiple different ways since the packets are transmitted outside of the device, the attacker can still capture any signals that being transmitted. Therefore, it is important to use encryption to secure the communication between different devices.

## Week 6

### Goals
- Flexibility Week

### What I have done
- I have continued to build on the MITM attack and improve it.


## Week 7
### Goals
- Focus on Application layer vulnerabilities.
- Research on SQL Injection and Cross-Site Scripting (XSS) attacks.

### What I have done
- I have researched on SQL Injection and Cross-Site Scripting (XSS) attacks.
- I have created a simple web application that is vulnerable to SQL Injection this can be found in my GitHub repository with sqli1_Basic-Login-Bypass and sqli2_Data-Extraction-with-Union-Injection Challenges.

### Challenges
- I have faced some issues with the SQL Injection simulation.

### Detailed Log
#### SQL Injection
SQL Injection is a type of attack that allows the attacker to execute malicious SQL queries on the database. This vulnerability is due to the fact that the application does not properly validate user input before executing SQL queries. There are many types of SQL Injection attacks, but the most common ones are:

1. **Union Injection**: The attacker uses the UNION operator to combine the results of two SQL queries into one result.

2. **Error-Based Injection**: The attacker uses error messages from the database to extract information about the database schema.

3. **Blind Injection**: The attacker uses a series of true/false questions to extract information from the database.

To demonstrate this vulnerability, I have created a simple web application that is vulnerable to SQL Injection. The code for the web application is on my GitHub repository.

To prevent SQL Injection attacks, it is recommended to use parameterized queries and input validation to sanitize user input before executing SQL queries.

This are the code snippets that parameterized queries and input validation to sanitize user input before executing SQL queries:
```python
# Parameterized queries
cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))

# Input validation
if not re.match("^[a-zA-Z0-9_]*$", username):
    return "Invalid username"
```

## Week 8
### Goals
- Finalise all attack demonstrations and mitigation setups.
- Begin organizing results and writing the final report.

### What I have done
- I have created a final report that explains all the attacks and vulnerabilities that I have demonstrated.
- I have published my GitHub repository with all the demonstration scripts.
- I have created the demo for both XSS attack in the web application.

### Challenges
- The time constraint to complete the final report.
- The time constraint to complete the demo for both XSS attack in the web application.
- React have default protection against XSS attack, I have to use php to demonstrate the XSS attack.

### Detailed Log
#### Cross-Site Scripting (XSS)
Cross-Site Scripting (XSS) is a type of attack that allows the attacker to inject malicious scripts into web pages viewed by other users. This vulnerability is due to the fact that the application does not properly validate user input before displaying it on the web page. There are many types of XSS attacks, but the most common ones are:

1. **Stored XSS**: The attacker injects a malicious script into the web application, which is stored in the database and executed when other users view the page.

2. **Reflected XSS**: The attacker injects a malicious script into the URL of the web application, which is reflected back to the user and executed.

3. **DOM-based XSS**: The attacker injects a malicious script into the DOM of the web page, which is executed when the page is loaded.

To demonstrate this vulnerability, I have created a simple web application that is vulnerable to XSS. The code for the web application is on my GitHub repository.

When building the web application, I have faced some issues with the React framework as it has default protection against XSS attacks. Therefore, I have decided to use PHP to demonstrate the XSS attack. 

In REACT, there are some default protection against XSS attack, for example, the innerHTML property is sanitized by default. So `<script>` tags will not be executed when using innerHTML.

But the following code snippet will still be executed:
```javascript
<img src="x" onerror="alert('XSS')">
```

To prevent XSS attacks, it is recommended to use input validation and output encoding to sanitize user input before displaying it on the web page. Additionally, for REACT, it is not recommended to use the `dangerouslySetInnerHTML` property to render HTML content that may contain scripts

This are the code snippets that input validation and output encoding to sanitize user input before displaying it on the web page:
```javascript
// Input validation
if (!/^[a-zA-Z0-9_]*$/.test(username)) {
    return "Invalid username";
}

// Output encoding
document.getElementById("username").innerHTML = username;

// Preventing set innerHTML on the DOM
document.getElementById("username").textContent = username;
```

## Conclusion
During this project, I have learned a lot about the vulnerabilities that exist in the OSI model and how to exploit them. I have also learned how to set up a virtual lab environment using docker containers and simulate attacks on the network and web applications. I have faced some challenges along the way, but I have managed to overcome them and complete the project successfully.

I have demonstrated the following attacks and vulnerabilities:
1. TCP SYN Flooding attack (only on report explanation)
2. SQL Injection attack (bypass login and extract data)
3. Reflected Cross-Site Scripting (XSS) attack (demonstrated in PHP)
4. Stored Cross-Site Scripting (XSS) attack (demonstrated in React)
5. Man-in-the-Middle (MITM) attack (capturing traffic and stealing session cookie)

I have also explained how these attacks work and how they can be mitigated in real-world scenarios. I have provided the code for the demonstration scripts on my GitHub repository, along with the final report.

Overall, this project has been a great learning experience for me, and I have gained valuable knowledge and skills in the field of cybersecurity. I hope to continue exploring and learning more about network and web vulnerabilities in the future.

## Concpets and Tools learned
1. OSI Model
2. Docker Containers
3. Wireshark
4. Denial of Service (DoS) attacks
5. TCP SYN
6. Cross-Site Scripting (XSS)
7. SQL Injection
8. Man-in-the-Middle (MITM) attacks
9. Session Hijacking
10. Input Validation
11. Mixing Data and Control

## GitHub Repository
The GitHub repository for this project can be found [here](https://github.com/jason4193/Project/tree/main/write-ups).

## Write-ups for each demonstration
1. [SQL Injection 1 Login Bypass](https://github.com/jason4193/Project/blob/main/write-ups/sqli1_write-up.md)
2. [SQL Injection 2 Data Extraction with Union Injection](https://github.com/jason4193/Project/blob/main/write-ups/sqli2_write-up.md)
3. [Reflected XSS](https://github.com/jason4193/Project/blob/main/write-ups/sqli2_write-up.md)
4. [Stored XSS](https://github.com/jason4193/Project/blob/main/write-ups/xss2_write-up.md)
5. [MITM Attack Session Capture](https://github.com/jason4193/Project/blob/main/write-ups/mitm_write-up.md)



