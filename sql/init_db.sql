CREATE DATABASE ofs_dev;

USE ofs_dev;

-- CREATE Tables for database

CREATE TABLE customers (
    customerID BIGINT NOT NULL AUTO_INCREMENT,
    firstName varchar(20) NOT NULL,
    lastName varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    passwordToken varchar(30) NOT NULL,
    customerAddress varchar(30) NOT NULL,
    phoneNumber varchar(10) NOT NULL,
    PRIMARY KEY(customerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE products (
    productID BIGINT NOT NULL AUTO_INCREMENT,
    productName varchar(40) NOT NULL,
    productDescription varchar(100) NOT NULL,
    productBrand varchar(30) NOT NULL,
    productCategory varchar(30) NOT NULL,
    productPictureLink varchar(100) NOT NULL,
    itemWeight int NOT NULL,
    itemPrice decimal(5, 2) NOT NULL,
    itemQuantity int NOT NULL,
    PRIMARY KEY(productID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE robots (
    robotID BIGINT NOT NULL AUTO_INCREMENT,
    currentWeight int NOT NULL,
    deliveryStatus varchar(20) NOT NULL,
    PRIMARY KEY(robotID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE reviews (
    reviewID int NOT NULL AUTO_INCREMENT,
    customerID BIGINT NOT NULL,
    reviewName varchar(50) NOT NULL,
    reviewDescription varchar(200) NOT NULL,
    PRIMARY KEY(reviewID),
    FOREIGN KEY (customerID) REFERENCES customers(customerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE orders (
    orderID BIGINT NOT NULL AUTO_INCREMENT,
    customerID BIGINT NOT NULL,
    robotID BIGINT NOT NULL, 
    orderDate timestamp NOT NULL,
    totalWeight int NOT NULL,
    totalPrice decimal(6, 2) NOT NULL,
    deliveryStatus varchar(20) NOT NULL,
    PRIMARY KEY(orderID),
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (robotID) REFERENCES robots(robotID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE delivery (
    deliveryID BIGINT NOT NULL AUTO_INCREMENT,
    orderID BIGINT NOT NULL,
    robotID BIGINT NOT NULL, 
    deliveryTime timestamp NOT NULL,
    deliveryAddress varchar(50) NOT NULL,
    PRIMARY KEY(deliveryID),
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (robotID) REFERENCES robots(robotID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
