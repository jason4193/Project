-- Create Table for Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    flag VARCHAR(255) NOT NULL
);

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    userid INT NOT NULL REFERENCES users(id)
);

-- Insert some users
INSERT INTO users (username, password, flag) VALUES ('admin', 'securepassword', 'flag{You_Got_It}');
INSERT INTO users (username, password, flag) VALUES ('user1', 'simplepassword', 'fake{Just_A_Little_More}');

-- Insert some blogs
INSERT INTO blogs (title, content, userid) VALUES ('First Blog', 'This is the first blog', 1);
INSERT INTO blogs (title, content, userid) VALUES ('Second Blog', 'This is the second blog', 1);
INSERT INTO blogs (title, content, userid) VALUES ('Third Blog', 'This is the third blog', 2);
