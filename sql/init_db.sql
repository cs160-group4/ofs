-- Authors: Hung Pham <mryo.hp@gmail.com>, Aaron Low <aaron.c.low@sjsu.edu>
-- Copyright (c) 2023 Hung Pham, Aaron Low. All rights reserved.
SET
    default_storage_engine = InnoDB;

CREATE DATABASE ofs_dev CHARACTER SET utf8mb4 COLLATE = utf8mb4_general_ci;

USE ofs_dev;

-- CREATE Tables for database
CREATE TABLE user (
    id varchar(255) NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    emailVerified timestamp(3),
    password varchar(255),
    name varchar(255),
    image varchar(255),
    role varchar(20) NOT NULL DEFAULT 'customer',
    -- (admin, customer, store_owner)
    first_name varchar(100),
    last_name varchar(100),
    phone_number varchar(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userId varchar(255) NOT NULL,
    address_line1 varchar(255) NOT NULL,
    address_line2 varchar(255),
    city varchar(100) NOT NULL,
    state varchar(100) NOT NULL,
    postal_code varchar(20) NOT NULL,
    country varchar(100),
    latitude decimal(12, 8),
    longitude decimal(12, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_address FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE account (
    userId varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    provider varchar(255) NOT NULL,
    providerAccountId varchar(255) NOT NULL,
    refresh_token varchar(255),
    access_token varchar(255),
    expires_at int,
    token_type varchar(255),
    scope varchar(255),
    id_token varchar(255),
    session_state varchar(255),
    PRIMARY KEY (provider, providerAccountId)
);

CREATE TABLE session (
    sessionToken varchar(255) NOT NULL PRIMARY KEY,
    userId varchar(255) NOT NULL,
    expires timestamp NOT NULL
);

CREATE TABLE verificationToken (
    identifier varchar(255) NOT NULL,
    token varchar(255) NOT NULL,
    expires timestamp NOT NULL,
    PRIMARY KEY(identifier, token)
);

CREATE TABLE product_categories (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    slug varchar(100) NOT NULL,
    description varchar(255),
    image varchar(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name varchar(100) NOT NULL,
    slug varchar(100),
    description varchar(255) NOT NULL,
    brand varchar(30) NOT NULL,
    category_id int NOT NULL,
    picture varchar(255) NOT NULL,
    item_weight int NOT NULL,
    item_price decimal(5, 2) NOT NULL,
    item_quantity int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE reviews (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    text varchar(255) NOT NULL,
    userId varchar(255) NOT NULL,
    product_id int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_review FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_product_review FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE comments (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    text varchar(255) NOT NULL,
    userId varchar(255) NOT NULL,
    product_id int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_comment FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_product_comment FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE ratings (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    rating_value INT NOT NULL,
    userId varchar(255) NOT NULL,
    product_id int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_rating FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_product_rating FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE cart (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userId varchar(255) NOT NULL,
    product_id int NOT NULL,
    quantity int NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_cart FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_product_cart FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE orders (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    total_weight int NOT NULL,
    shipping_cost decimal(10, 2) NOT NULL,
    -- free shipping if total_weight > 20lbs  
    tax decimal(10, 2) NOT NULL,
    -- total tax = subtotal * 0.1
    discount decimal(10, 2) NOT NULL,
    subtotal decimal(10, 2) NOT NULL,
    -- total price of all items
    grand_total decimal(10, 2) NOT NULL,
    -- subtotal + shipping_cost + tax - discount
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    shipping_address_id int NULL,
    -- references addresses(id)
    delivery_status varchar(20) NOT NULL,
    -- (pending, shipped, delivered, cancelled)
    userId varchar(255) NOT NULL,
    -- references user(id)
    CONSTRAINT fk_user_order FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_shipping_address FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE
    set
        NULL ON UPDATE no action
);

CREATE TABLE order_item (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    order_id int NOT NULL,
    product_id int,
    product_name varchar(100),
    item_weight int NOT NULL,
    quantity int NOT NULL,
    price decimal(6, 2) NOT NULL,
    product_image varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_detail_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_order_detail_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE
    set
        NULL ON UPDATE no action
);

CREATE TABLE payment_methods (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userId varchar(255) NOT NULL,
    card_number varchar(20) NOT NULL,
    expiration_date varchar(7) NOT NULL,
    cvv varchar(4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_payment FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action
);

CREATE TABLE coupons (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    code varchar(100) NOT NULL,
    discount decimal(5, 2) NOT NULL,
    expires_at timestamp NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE robots (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    status varchar(20) NOT NULL,
    -- (available, busy, offline)
    name varchar(100),
    max_orders int NOT NULL default 10,
    max_weight_in_lbs int NOT NULL default 200,
    current_weight_in_lbs int NOT NULL default 0,
    latitude decimal(12, 8) DEFAULT 0.0,
    longitude decimal(12, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE delivery (
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    order_id int NOT NULL,
    robot_id int NOT NULL,
    latitude decimal(12, 8),
    longitude decimal(12, 8),
    delivery_at timestamp NOT NULL,
    delivery_status varchar(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_delivery FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE cascade ON UPDATE no action,
    CONSTRAINT fk_robot_delivery FOREIGN KEY (robot_id) REFERENCES robots(id) ON DELETE cascade ON UPDATE no action
);

ALTER TABLE
    account
ADD
    CONSTRAINT account_userId_user_id_fk FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action;

ALTER TABLE
    session
ADD
    CONSTRAINT session_userId_user_id_fk FOREIGN KEY (userId) REFERENCES user(id) ON DELETE cascade ON UPDATE no action;