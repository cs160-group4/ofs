SET
    default_storage_engine = InnoDB;

CREATE DATABASE ofs_dev CHARACTER SET utf8mb4 COLLATE = utf8mb4_general_ci;

USE ofs_dev;

-- CREATE Tables for database
CREATE TABLE users (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    password_token varchar(50) NOT NULL,
    address varchar(150) NOT NULL,
    phone_number varchar(10) NOT NULL,
    role varchar(10) NOT NULL,
    -- (admin, customer, store_owner)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name varchar(40) NOT NULL,
    description varchar(100) NOT NULL,
    store varchar(30) NOT NULL,
    category varchar(30) NOT NULL,
    picture varchar(100) NOT NULL,
    item_weight int NOT NULL,
    item_price decimal(5, 2) NOT NULL,
    item_quantity int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    text varchar(100) NOT NULL,
    user_id int NOT NULL,
    product_id int NOT NULL,
    CONSTRAINT fk_user_review FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product_review FOREIGN KEY (product_id) REFERENCES products(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    rating_value INT,
    user_id int NOT NULL,
    product_id int NOT NULL,
    CONSTRAINT fk_user_rating FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_product_rating FOREIGN KEY (product_id) REFERENCES products(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE robots (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    status varchar(20) NOT NULL -- (available, busy, offline)
);

CREATE TABLE orders (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    total_weight int NOT NULL,
    total_price decimal(6, 2) NOT NULL,
    delivery_status varchar(20) NOT NULL,
    user_id int NOT NULL,
    robot_id int NOT NULL,
    CONSTRAINT fk_user_order FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_robot_order FOREIGN KEY (robot_id) REFERENCES robots(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE TABLE delivery (
--      id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     orderID int NOT NULL,
--     robotID int NOT NULL,
--     deliveryTime timestamp NOT NULL,
--     deliveryAddress varchar(50) NOT NULL,
--     PRIMARY KEY (deliveryID),
--     FOREIGN KEY (orderID) REFERENCES orders (orderID),
--     FOREIGN KEY (robotID) REFERENCES robots (robotID)
-- );