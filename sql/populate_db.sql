USE ofs_dev;

-- Populate Customer Data: ..., employeepass123, employeepass123, customerpass123, customerpass123
INSERT INTO user (id, email, password, name, image, role, first_name, last_name, phone_number)
VALUES 
    ('f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'hung.pham@sjsu.edu', '$2b$10$5sqxizup.X5Y5NT8JDJqiuC1sAPn8u1fBJJGNFuj4miW/p5NGvoHe', 'Hung Pham', '', 'admin', 'Hung', 'Pham', '4087778888'),
    ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', 'employee@gmail.com', '$2b$10$Y4yQBn47MqpWtAm32os/Y.Gl9pHjBAPDFgpGVPj2tiVYANG6rjND2', 'Employee Will', '', 'employee', 'Employee', 'Will', '4087776969'),
    ('a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 'lina@gmail.com', '$2b$10$Y4yQBn47MqpWtAm32os/Y.Gl9pHjBAPDFgpGVPj2tiVYANG6rjND2', 'Lina', '', 'employee', 'Lina', 'Medina', '408567699'),
    ('0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', 'customer@gmail.com', '$2b$10$TFJZ0jNa/iWejbnfukawJOgHeeAzCymMj8xkXrUcauUl/aSgTEvlm', 'Customer Gates', '', 'customer', 'Customer', 'Gates', '4086088899'),
    ('5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', 'jill@gmail.com', '$2b$10$TFJZ0jNa/iWejbnfukawJOgHeeAzCymMj8xkXrUcauUl/aSgTEvlm', 'Jill Lane', '', 'customer', 'Jill', 'Lane', '4085554688');

INSERT INTO addresses (id, userId, address_line1, city, state, postal_code, country, latitude, longitude)
VALUES 
	(1, 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', '729 Morse St', 'San Jose', 'CA', '95126', 'USA', 37.3365595, -121.9238857),
	(2, 'a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', '168 S 11th St', 'San Jose', 'CA', '95112', 'USA', 37.3386144, -121.880227),
	(3, '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', '1001 N 4th St', 'San Jose', 'CA', '95112', 'USA', 37.3567594, -121.9044815),
	(4, '5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', '259 Charles St', 'Sunnyvale', 'CA', '94086', 'USA', 37.3760182, -122.038707),
	(5, '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', '1402 Mt Whitney Dr', 'San Jose', 'CA', '95127', 'USA', 37.3531568, -121.8130381);


-- Populate Product Categories Data
INSERT INTO product_categories (id, name, slug, description)
VALUES (1, 'Fruits', 'fruits', 'Fresh and delicious fruits'),
       (2, 'Frozen', 'frozen', 'Frozen food items'),
       (3, 'Meats', 'meats', 'Fresh meat products'),
       (4, 'Dried-Goods', 'dried-goods', 'Packaged snacks and chips'),
       (5, 'Vegetables', 'vegetables', 'Fresh and delicious vegetables');

-- Populate Products Data
-- Fruits
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES (1, 'Oranges', 'oranges', 'Delicious Fresh Orange Oranges', 'Kirkland', 1, 'images/food/orange.jpg', 2, 2.49, 30),
       (2, 'Pineapple', 'pineapple', 'Delicious Fresh Yellow Pineapples', 'Kirkland', 1, 'images/food/pineapple.jpg', 5, 4.99, 20),
       (3, 'Red Apples', 'red-apples', 'Delicious Fresh Red Apples', 'Kirkland', 1, 'images/food/redApple.jpg', 3, 3.99, 10),
       (4, 'Watermelon', 'watermelon', 'Delicious Round Green Watermelon', 'Kirkland', 1, 'images/food/watermelon.jpg', 1, 1.89, 12),
       (5, 'Peach', 'peach', 'Delicious Pink Peaches', 'Driscolli', 1, 'images/food/peach.jpg', 6, 5.99, 6),
       (6, 'Black Berries', 'black-berries', 'Delicious Dark and Juicy Black Berries', 'Driscolli', 1, 'images/food/blackBerries.jpg', 1, 3.25, 15),
       (7, 'Banana', 'banana', 'Delicious Yellow and Large Bananas', '1 Farms', 1, 'images/food/banana.jpg', 5, 2.75, 50);
-- Frozen
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES (8, 'Chicken Pot Pie', 'chicken-pot-pie', 'Delicious Chicken Pot Pie with peas, carrots, and chicken', 'Marie Callenders', 2, 'images/food/chickenPotPie.jpg', 15, 4.5, 9),
       (9, 'Chicken Bowl and Rice', 'chicken-bowl-rice', 'Delicious Chicken Bowl and Rice with Broccoli', 'Marie Callenders', 2, 'images/food/chickenBowlRice.jpg', 10, 2.99, 7),
       (10,'Sweet and Sour Chicken', 'sweet-sour-chicken', 'Delicious Sweet and Sour Chicken Over Fried Rice', 'Banquet', 2, 'images/food/sweetSourChicken.jpg', 8, 6.99, 9),
       (11,'Dynamite Penne and Meatballs', 'penne-meatballs', 'Delicious Pasta with Meatballs', 'Banquet', 2, 'images/food/penneMeatballs.jpg', 4, 1.95, 69),
       (12,'Spaghetti with Meat Sauce', 'spaghetti-meat-sauce', 'Delicious Spaghetti with Meat Sauce', 'Stouffers', 2, 'images/food/spaghetti.jpg', 9, 5.25, 33);
-- Meats
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES (13, 'Beef Chuck Roast', 'beef-chuck-roast', 'Delicious Boneless Beef Chuck Roast', 'Tyson', 3, 'images/food/beefChuckRoast.jpg', 10, 3.49, 22),
       (14, 'Beef Country Style Ribs', 'beef-country-style-ribs', 'Delicious Beef Country Style Ribs', 'Tyson', 3, 'images/food/beefCountryRibs.jpg', 10, 4.99, 78),
       (15, 'Whole Chicken', 'whole-chicken', 'Delicious Fresh and Natural, No Antibiotics Ever, Young Whole Chicken', 'Foster Farms', 3, 'images/food/wholeChicken.jpg', 10, 4.75, 58),
       (16, 'Skinless Chicken Breast Tenderloins', 'chicken-breast-tenderloins', 'Delicious Fresh and Natural, No Antibiotics Ever, Skinless Chicken Breast Tenderloins', 'Foster Farms', 3, 'images/food/chickenBreastTenderloin.jpg', 4,9.99, 32);
-- Dried-Goods
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES  (17, 'Lay''s Classic', 'lays-classic', 'Lay''s Classic Potato Snack Chip, Party Size', 'Lays', 4, 'images/food/laysClassicChips.jpg', 15, 4.15, 9),
       (18, 'Frito-lay Classic Mix Variety Pack', 'frito-lay-variety-pack', 'Frito-lay Classic Mix Variety Pack, 18 Count', 'Fritos', 4, 'images/food/fritoMixVarietyPack.jpg', 10, 1.79, 2),
       (19, 'Doritos Nacho Cheese', 'doritos-nacho-cheese', 'Doritos Nacho Cheese Tortilla Snack Chips, Party Size', 'Doritos', 4, 'images/food/doritosNachoCheese.jpg', 12, 5.50, 15),
       (20, 'Goldfish Cheddar Cheese Crackers', 'goldfish-cheddar-crackers', 'Goldfish Cheddar Cheese Crackers, Baked Snack Crackers, 30 oz Carton', 'Pepperidge Farms', 4, 'images/food/goldfishCheddarCheese.jpg', 15, 9.49, 9);

-- Populate Robot Data
INSERT INTO robots (id, status, name) VALUES 
        (1, 'available', 'Robot1'),
        (2, 'available', 'Robot2'),
        (3, 'busy', 'Robot3'),
        (4, 'busy', 'Robot4'),
        (5, 'offline', 'Robot5'),
        (6, 'available', 'Robot6'),
        (7, 'busy', 'Robot7'),
        (8, 'available', 'Robot8'),
        (9, 'offline', 'Robot9'),
        (10, 'available', 'Robot10');

-- Populate Comments
INSERT INTO comments (text, userId, product_id)
VALUES 
    ('Great product, I love it!', 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 1),
    ('Highly recommended. Quality is excellent.', 'a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 2),
    ('Tasty and fresh, will buy again.', '5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', 1),
    ('Not bad, but could be better.', '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', 4),
    ('Amazing flavor, I am satisfied.', 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 1);

-- Populate Cart Data
INSERT INTO cart (userId, product_id, quantity) VALUES 
('f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 1, 3),
('f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 2, 6),
('f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 5, 7),
('a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 6, 4),
('a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 3, 1),
('a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 8, 5),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', 3, 6),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', 9, 7),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', 6, 8);


-- Populate Orders Data
INSERT INTO orders (id, total_weight, shipping_cost, tax, discount, subtotal, grand_total, created_at, updated_at, robot_id, shipping_address_id, delivery_status, userId) VALUES
(1,139,0.00,14.55,0.00,145.47,160.02,'2023-01-01 08:00:00','2023-01-01 08:00:00',5,1,'pending','f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5'),
(2,56,0.00,2.79,0.00,27.93,30.72,'2023-02-01 09:10:00','2023-02-01 09:10:00',7,2,'shipped','a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d'),
(3,37,0.00,2.47,0.00,24.67,27.14,'2023-03-10 08:30:30','2023-03-10 08:30:30',3,3,'delivered','1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6'),
(4,46,0.00,3.70,0.00,36.97,40.67,'2023-04-09 11:30:00','2023-04-09 11:30:00',2,4,'cancelled','5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0'),
(5,115,0.00,5.07,0.00,50.73,55.80,'2023-05-10 09:50:00','2023-05-10 09:50:00',9,5,'pending','0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5'),
(6,50,0.00,2.15,0.00,21.52,23.67,'2023-06-12 08:25:00','2023-06-12 08:25:00',8,1,'pending','f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5'),
(7,59,0.00,3.42,0.00,34.24,37.66,'2023-07-01 10:25:15','2023-07-01 10:25:15',4,2,'shipped','a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d'),
(8,26,0.00,8.75,0.00,87.47,96.22,'2023-08-20 12:22:10','2023-08-20 12:22:10',6,3,'delivered','1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6');


INSERT INTO order_item (order_id, product_id, item_weight, quantity, price) VALUES 
(1, 1, 2, 50, 2.49), 
(1, 3, 3, 3, 3.99), 
(1, 8, 15, 2, 4.5),
(2, 2, 5, 2, 4.99),
(2, 5, 6, 1, 5.99),
(2, 9, 10, 4, 2.99),
(3, 4, 1, 3, 1.89),
(3, 7, 5, 5, 2.75),
(3, 12, 9, 1, 5.25),
(4, 6, 1, 2, 3.25),
(4, 10, 8, 3, 6.99),
(4, 15, 10, 2, 4.75),
(5, 13, 10, 4, 3.49),
(5, 17, 15, 2, 4.15),
(5, 20, 15, 3, 9.49),
(6, 11, 4, 5, 1.95),
(6, 14, 10, 2, 4.99),
(6, 18, 10, 1, 1.79),
(7, 15, 10, 3, 4.75),
(7, 19, 12, 2, 5.50),
(7, 2, 5, 1, 8.99),
(8, 3, 3, 4, 12.75),
(8, 16, 4, 3, 9.99),
(8, 6, 1, 2, 3.25);

