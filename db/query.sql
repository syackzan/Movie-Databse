-- Query to Render All Movies --
SELECT * FROM movies;

-- Query to Insert Movie --
INSERT INTO movies (title) VALUES (title);
INSERT INTO reviews (review) VALUES (review);

-- Query to Update a Movie --
UPDATE movies SET title = value1 WHERE id = ?;

-- Query to Delete a Movie --
DELETE FROM movies WHERE id = ?;
DELETE FROM reviews WHERE id = ?;

-- Query to Render Movies w/ their Reviews --
SELECT movies.title AS Title, reviews.review AS Reviews
FROM reviews
JOIN movies ON reviews.movies_id = movies.id;