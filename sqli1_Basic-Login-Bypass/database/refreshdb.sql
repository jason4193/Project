-- Create Table for Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    flag VARCHAR(255) NOT NULL
);

-- Insert some users
INSERT INTO users (username, password, flag) VALUES ('admin', 'securepassword', 'flag{You_Got_It}');
INSERT INTO users (username, password, flag) VALUES ('user1', 'simplepassword', 'Find the admin flag!');