USE ofs_dev;



-- Populate Customer Data
INSERT INTO user (id, email, password, name, image, role, first_name, last_name, phone_number)
VALUES 
    ('f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'hung.pham@sjsu.edu', 'masterm', 'Hung Pham', 'images/avatars/default.png', 'admin', 'Hung', 'Pham', '4086039113'),
    ('a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 'jack@sjsu.edu', 'password', 'Jack Ma', 'images/avatars/default.png', 'employee', 'Jack', 'Ma', '4085027699'),
    ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6', 'bobli@gmail.com', 'test1', 'Bob Li', 'images/avatars/default.png', 'employee', 'Bob', 'Li', '4084892987'),
    ('5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', 'jill@gmail.com', 'jill123456lane', 'Jill Lane', 'images/avatars/default.png', 'customer', 'Jill', 'Lane', '4086056555'),
    ('0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', 'joggerbogger@gmail.com', 'Jogger123456', 'Jogger Bogger', 'images/avatars/default.png', 'customer', 'Jogger', 'Bogger', '4086088899');

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
VALUES (1, 'Oranges', 'oranges', 'Delicious Fresh Orange Oranges', 'Kirkland', 1, 'images/food/orange.jpg', 2, 2.99, 30),
       (2, 'Pineapple', 'pineapple', 'Delicious Fresh Yellow Pineapples', 'Kirkland', 1, 'images/food/pineapple.jpg', 5, 4.99, 20),
       (3, 'Red Apples', 'red-apples', 'Delicious Fresh Red Apples', 'Kirkland', 1, 'images/food/redApple.jpg', 3, 1.99, 10),
       (4, 'Watermelon', 'watermelon', 'Delicious Round Green Watermelon', 'Kirkland', 1, 'images/food/watermelon.jpg', 1, 6.99, 12),
       (5, 'Peach', 'peach', 'Delicious Pink Peaches', 'Driscolli', 1, 'images/food/peach.jpg', 6, 2.99, 6),
       (6, 'Black Berries', 'black-berries', 'Delicious Dark and Juicy Black Berries', 'Driscolli', 1, 'images/food/blackBerries.jpg', 1, 5.99, 15),
       (7, 'Banana', 'banana', 'Delicious Yellow and Large Bananas', '1 Farms', 1, 'images/food/banana.jpg', 5, 3.99, 50);

-- Frozen
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES (8, 'Chicken Pot Pie', 'chicken-pot-pie', 'Delicious Chicken Pot Pie with peas, carrots, and chicken', 'Marie Callenders', 2, 'images/food/chickenPotPie.jpg', 15, 3.48, 9),
       (9, 'Chicken Bowl and Rice', 'chicken-bowl-rice', 'Delicious Chicken Bowl and Rice with Broccoli', 'Marie Callenders', 2, 'images/food/chickenBowlRice.jpg', 10, 2.80, 7),
       (10,'Sweet and Sour Chicken', 'sweet-sour-chicken', 'Delicious Sweet and Sour Chicken Over Fried Rice', 'Banquet', 2, 'images/food/sweetSourChicken.jpg', 8, 1.24, 9),
       (11,'Dynamite Penne and Meatballs', 'penne-meatballs', 'Delicious Pasta with Meatballs', 'Banquet', 2, 'images/food/penneMeatballs.jpg', 4, 3.59, 69),
       (12,'Spaghetti with Meat Sauce', 'spaghetti-meat-sauce', 'Delicious Spaghetti with Meat Sauce', 'Stouffers', 2, 'images/food/spaghetti.jpg', 9, 5.32, 33);

-- Meats
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES (13, 'Beef Chuck Roast', 'beef-chuck-roast', 'Delicious Boneless Beef Chuck Roast', 'Tyson', 3, 'images/food/beefChuckRoast.jpg', 10, 6.21, 22),
       (14, 'Beef Country Style Ribs', 'beef-country-style-ribs', 'Delicious Beef Country Style Ribs', 'Tyson', 3, 'images/food/beefCountryRibs.jpg', 10, 15.30, 78),
       (15, 'Whole Chicken', 'whole-chicken', 'Delicious Fresh and Natural, No Antibiotics Ever, Young Whole Chicken', 'Foster Farms', 3, 'images/food/wholeChicken.jpg', 10, 15.24, 58),
       (16, 'Skinless Chicken Breast Tenderloins', 'chicken-breast-tenderloins', 'Delicious Fresh and Natural, No Antibiotics Ever, Skinless Chicken Breast Tenderloins', 'Foster Farms', 3, 'images/food/chickenBreastTenderloin.jpg', 4, 3.59, 32);

-- Dried-Goods
INSERT INTO products(id, name, slug, description, brand, category_id, picture, item_weight, item_price, item_quantity)
VALUES  (17, 'Lay''s Classic', 'lays-classic', 'Lay''s Classic Potato Snack Chip, Party Size', 'Lays', 4, 'images/food/laysClassicChips.jpg', 15, 3.48, 9),
       (18, 'Frito-lay Classic Mix Variety Pack', 'frito-lay-variety-pack', 'Frito-lay Classic Mix Variety Pack, 18 Count', 'Fritos', 4, 'images/food/fritoMixVarietyPack.jpg', 10, 2.80, 2),
       (19, 'Doritos Nacho Cheese', 'doritos-nacho-cheese', 'Doritos Nacho Cheese Tortilla Snack Chips, Party Size', 'Doritos', 4, 'images/food/doritosNachoCheese.jpg', 12, 3.78, 15),
       (20, 'Goldfish Cheddar Cheese Crackers', 'goldfish-cheddar-crackers', 'Goldfish Cheddar Cheese Crackers, Baked Snack Crackers, 30 oz Carton', 'Pepperidge Farms', 4, 'images/food/goldfishCheddarCheese.jpg', 15, 3.48, 9);

-- Populate Robot Data

INSERT INTO robots (status, name) VALUES 
        ('available', 'Robot1'),
        ('available', 'Robot2'),
        ('busy', 'Robot3'),
        ('busy', 'Robot4'),
        ('offline', 'Robot5'),
        ('available', 'Robot6'),
        ('busy', 'Robot7'),
        ('available', 'Robot8'),
        ('offline', 'Robot9'),
        ('available', 'Robot10');

-- Populate Review Data

INSERT INTO comments (text, userId, product_id)
VALUES 
    ('Great product, I love it!', 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 1),
    ('Highly recommended. Quality is excellent.', 'a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 2),
    ('Tasty and fresh, will buy again.', '5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', 1),
    ('Not bad, but could be better.', '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', 4),
    ('Amazing flavor, I am satisfied.', 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 1);


-- Populate Orders Data
INSERT INTO orders (total_weight, total_price, delivery_status, userId)
VALUES  (12, 35.99, 'Pending', 'f0a1b2c3-d4e5-f6a7-b8c9-d0e1f2a3b4c5'),
        (10, 25.50, 'Processing', 'a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d'),
        (9, 56.75, 'Delivered', '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5'),
        (25, 120.00, 'Cancelled', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6');

INSERT INTO orders (total_weight, total_price, delivery_status, userId, robot_id)
VALUES  (9, 15.00, 'Shipped', '5f6a7b8c-9d0e-1f2a-3b4c-5d6e7f8a9b0', 1),
        (17, 32.55, 'Shipped', '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5', 2),
        (25, 60.99, 'Shipped', 'a1b2c3d4-e5f6-a7b8-9c0d-e1f2a3b4c5d', 3);

-- Populate Delivery Data
-- INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (1, 1, "2025-12-01 03:25:00", "12345 Bill Li Avenue");
-- INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (2, 2, "2022-01-01 11:22:00", "12345 Jill Lane Street");