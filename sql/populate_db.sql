USE ofs_dev;

-- Example Test Data

-- Populate Customer Data

INSERT INTO customers (firstName, lastName, email, passwordToken, customerAddress, phonenumber) VALUES ("Bob", "Li", "BobLi@gmail.com", "test1", "12345 Bill Li Avenue", "1234567890");
INSERT INTO customers (firstName, lastName, email, passwordToken, customerAddress, phonenumber) VALUES ("Jill", "Lane", "JillLane@gmail.com", "test2", "12345 Jill Lane Street", "0987654321");
INSERT INTO customers (firstName, lastName, email, passwordToken, customerAddress, phonenumber) VALUES ("Jogger", "Bogger", "JoggerBogger@gmail.com", "test3", "12345 Jogger Bogger Highway", "1111111111");

-- Populate Products Data

INSERT INTO products(productName, productDescription, productBrand, productCategory, productPictureLink, itemWeight, itemPrice, itemQuantity) values ("Oranges", "Delicious Fresh Orange Oranges", "Kirkland", "Fruits", "orange.jpg", 2, 2.99, 0);
INSERT INTO products(productName, productDescription, productBrand, productCategory, productPictureLink, itemWeight, itemPrice, itemQuantity) values ("Pineapple", "Delicious Fresh Yellow Pineapples", "Kirkland", "Fruits", "pineapple.jpg", 5, 4.99, 0);
INSERT INTO products(productName, productDescription, productBrand, productCategory, productPictureLink, itemWeight, itemPrice, itemQuantity) values ("Red Apples", "Delicious Fresh Red Apples", "Kirkland", "Fruits", "redApple.jpg", 3, 1.99, 0);
INSERT INTO products(productName, productDescription, productBrand, productCategory, productPictureLink, itemWeight, itemPrice, itemQuantity) values ("Watermelon", "Delicious Round Green Watermelon", "Kirkland", "Fruits", "watermelon.jpg", 1, 6.99, 0);
INSERT INTO products(productName, productDescription, productBrand, productCategory, productPictureLink, itemWeight, itemPrice, itemQuantity) values ("Peach", "Delicious Pink Peaches", "Kirkland", "Fruits", "peach.jpg", 6, 2.99, 0);

-- Populate Robot Data

INSERT INTO robots (currentWeight, deliveryStatus) VALUES (0, "Waiting");
INSERT INTO robots (currentWeight, deliveryStatus) VALUES (0, "Waiting");

-- Populate Review Data

INSERT INTO reviews (customerID, reviewName, reviewDescription) VALUES (1, "Test Review 1", "Test Review Description 1");
INSERT INTO reviews (customerID, reviewName, reviewDescription) VALUES (2, "Test Review 2", "Test Review Description 2");
INSERT INTO reviews (customerID, reviewName, reviewDescription) VALUES (3, "Test Review 3", "Test Review Description 3");

-- Populate Orders Data
INSERT INTO orders (customerID, robotID, orderDate, totalWeight, totalPrice, deliveryStatus) VALUES (1, 1, "2025-12-01 03:13:14", 5, 9.99, "Waiting");
INSERT INTO orders (customerID, robotID, orderDate, totalWeight, totalPrice, deliveryStatus) VALUES (3, 2, "2022-01-01 11:12:52", 10, 42.99, "In Progress");

-- Populate Delivery Data
INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (1, 1, "2025-12-01 03:25:00", "12345 Bill Li Avenue");
INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (2, 2, "2022-01-01 11:22:00", "12345 Jill Lane Street");