DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE movies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review TEXT NOT NULL,
    movies_id INT,
    FOREIGN KEY (movies_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
);