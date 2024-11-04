## Challenge 1: SQL Injection Login Bypass (Beginner)

### Objective
Bypass the login form using SQL injection.

### Write-up
The login form has a SQL injection vulnerability. We can bypass the login form by using the following payload:
```
' OR '1'='1 #--
```

This payload will return all users from the database, allowing us to log in as the first user in the database.

To solve the challenge, enter the following payload into the username and password fields:
```
Username: <any words>
Password: ' OR '1'='1 #--
```

After submitting the payload, you will be logged in as the first user in the database.

