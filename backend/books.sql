

/* SHOW TABLES; */
/* DROP TABLE IF EXISTS books; */

USE azura_book_js;

/* table books */
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  pages INT,
  publication_date DATE,
  description TEXT
);

/* dummy */
INSERT INTO books (title, author, publisher, pages, publication_date, description) 
VALUES 
  ('Sample Book Title', 'Sample Author', 'Sample Publisher', 200, '2024-08-01', 'This is a description of the sample book.'),
  ('testestes ba bdfd9h SATU', 'John', 'Adventure', 320, '2023-05-15', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, ipsum. Soluta omnis, autem quis quae error facere accusantium quia alias!'),
  ('DUA dfbd djnjgif gdsjjig', 'Jane', 'Mystery Books', 250, '2022-10-22', 'A deep-sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled.'),
  ('TIGA dddj dhfhhdf hdbf', 'Emily', 'Raturu place', 400, '2021-08-10', 'A comprehensive -sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled. -sea mystery unravelled.');

INSERT INTO books (title, author, publisher, pages, publication_date, description) 
VALUES 
('Pride and Prejudice', 'Jane Austen', 'T. Egerton', 432, '1813-01-28', 'A classic romance novel set in early 19th-century England.');


/* categories table */
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name) 
VALUES ('Science Fiction'), ('Romance');


/* book_categories table */
CREATE TABLE IF NOT EXISTS book_categories (
    book_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
/* ondelete cascade, misal buku dihapus smua yg terkait akn dihapus */

/* dummy */
INSERT INTO book_categories (book_id, category_id) 
VALUES 
(8, 2);
