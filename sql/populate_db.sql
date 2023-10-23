USE ofs_dev;

-- Example Test Data

-- Populate Customer Data

INSERT INTO users (first_name, last_name, email, password, password_token, address, phone_number, role) VALUES ("Bob", "Li", "BobLi@gmail.com", "test1", "1", "12345 Bill Li Avenue", "1234567890", "customer");
INSERT INTO users (first_name, last_name, email, password, password_token, address, phone_number, role) VALUES ("Jill", "Lane", "JillLane@gmail.com", "test2", "2", "12345 Jill Lane Street", "0987654321", "customer");
INSERT INTO users (first_name, last_name, email, password, password_token, address, phone_number, role) VALUES ("Jogger", "Bogger", "JoggerBogger@gmail.com", "test3", "3", "12345 Jogger Bogger Highway", "1111111111", "customer");

-- Populate Products Data

INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Oranges", "Delicious Fresh Orange Oranges", "San Jose", "Kirkland", "Fruits", "orange.jpg", 2, 2.99, 0);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Pineapple", "Delicious Fresh Yellow Pineapples", "San Carlos", "Kirkland", "Fruits", "pineapple.jpg", 5, 4.99, 0);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Red Apples", "Delicious Fresh Red Apples", "San Jose", "Kirkland", "Fruits", "redApple.jpg", 3, 1.99, 0);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Watermelon", "Delicious Round Green Watermelon", "San Carlos", "Kirkland", "Fruits", "watermelon.jpg", 1, 6.99, 0);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Peach", "Delicious Pink Peaches", "San Jose", "Driscolli", "Fruits", "peach.jpg", 6, 2.99, 0);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Black Berries", "Delicious Dark and Juicy Black Berries", "San Jose", "Driscolli", "Fruits", "blackBerries.jpg", 1, 5.99, 15);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Banana", "Delicious Yellow and Large Bananas", "San Carlos", "1 Farms", "Fruits", "banana.jpg", 5, 3.99, 2);
-- Frozens
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Chicken Pot Pie", "Delicious Chicken Pot Pie with peas, carrots, and chicken", "San Jose", "Marie Callenders", "Frozen", "chickenPotPie.jpg", 15, 3.48, 9);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Chicken Bowl and Rice", "Delicious Chicken Bowl and Rice with Broccolli", "San Jose", "Marie Callenders", "Frozen", "chickenBowlRice.jpg", 10, 2.80, 2);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Sweet and Sour Chicken", "Delicious Sweet and Sour Chicken Over Fried Rice", "San Carlos", "Banquet", "Frozen", "sweetSourChicken.jpg", 8, 1.24, 9);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Dynamite Penne and Meatballs", "Delicious Pasta with Meatballs", "San Jose", "Banquet", "Frozen", "penneMeatballs.jpg", 4, 3.59, 32);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Spaghetti with Meat Sauce", "Delicious Spaghetti with Meat Sauce", "San Carlos", "Stouffers", "Frozen", "spaghetti.jpg", 9, 5.32, 15);
-- Meats
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Beef Chuck Roast", "Delicious Boneless Beef Chuck Roast", "San Jose", "Tyson", "Meats", "beefChuckRoast.jpg", 10, 6.21, 9);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Beef Country Style Ribs", "Delicious Beef Country Style Ribs", "San Carlos", "Tyson", "Meats", "beefCountryRibs.jpg", 10, 15.30, 2);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Whole Chicken", "Delicious Fresh and Nautral, No Antibiotics Ever, Young Whole Chicken", "San Carlos", "Foster Farms", "Meats", "wholeChicken.jpg", 10, 15.24, 9);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Skinless Chicken Breast Tenderloins", "Delicious Fresh and Nautral, No Antibiotics Ever, Skinless Chicken Breast Tenderloins", "San Jose", "Foster Farms", "Meats", "chickenBreastTenderloin.jpg", 4, 3.59, 32);
-- Dried Goods
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Lay's Classic", "Lay's Classic Potato Snack Chip, Party Size", "San Jose", "Lays", "Dried-Goods", "laysClassicChips.jpg", 15, 3.48, 9);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Frito-lay Classic Mix Variety Pack", "Frito-lay Classic Mix Variety Pack, 18 Count", "San Carlos", "Fritos", "Dried-Goods", "fritoMixVarietyPack.jpg", 10, 2.80, 2);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Doritos Nacho Cheese", "Doritos Nacho Cheese Tortilla Snack Chips, Party Size", "San Jose", "Doritos", "Dried-Goods", "doritosNachoCheese.jpg", 12, 3.78, 15);
INSERT INTO products(name, description, store, brand, category, picture, item_weight, item_price, item_quantity) values ("Goldfish Cheedar Cheeese Crackers", "Goldfish Cheddar Cheese Crackers, Baked Snack Crackers, 30 oz Carton", "San Carlos", "Pepperidge Farms", "Dried-Goods", "goldfishCheddarCheese.jpg", 15, 3.48, 9);
-- Populate Robot Data

INSERT INTO robots (status) VALUES ("Available");
INSERT INTO robots (status) VALUES ("Busy");

-- Populate Review Data

INSERT INTO reviews (user_id, product_id, text) VALUES (1, 1, "Test Review Description 1");
INSERT INTO reviews (user_id, product_id, text) VALUES (2, 2, "Test Review Description 2");
INSERT INTO reviews (user_id, product_id, text) VALUES (3, 3, "Test Review Description 3");

-- Populate Orders Data
INSERT INTO orders (user_id, robot_id, total_weight, total_price, delivery_status) VALUES (1, 1, 5, 9.99, "Waiting");
INSERT INTO orders (user_id, robot_id, total_weight, total_price, delivery_status) VALUES (3, 2, 10, 42.99, "In Progress");

-- Populate Delivery Data
-- INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (1, 1, "2025-12-01 03:25:00", "12345 Bill Li Avenue");
-- INSERT INTO delivery (orderID, robotID, deliveryTime, deliveryAddress) VALUES (2, 2, "2022-01-01 11:22:00", "12345 Jill Lane Street");