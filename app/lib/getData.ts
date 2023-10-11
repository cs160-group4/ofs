import { db } from '../db/db'
import { eq } from 'drizzle-orm'
import { reviews, products } from "../db/schema"

type Review = {
    reviewID: number;
    name: string;
}

type BasicProduct = {
    productID: number,
    productName: string,
    productBrand: string,
    productCategory: string,
    productPictureLink: string,
    itemWeight: number,
    itemPrice: string
}

type CustomerProduct = {
    productName: string,
    productBrand: string,
    productCategory: string,
    productDescription: string,
    productPictureLink: string,
    itemWeight: number,
    itemPrice: string
}

type EmployeeProduct = {
    productID: number,
    productName: string,
    productBrand: string,
    productCategory: string,
    productPictureLink: string,
    itemWeight: number,
    itemPrice: number,
    itemQuantity: number
}

export const getReviews = async () => {
    const result: Review[] = await db.select().from(reviews);
    return result;
}

export const getBasicProduct = async () => {
    const result: BasicProduct[] = await db.select({
        productID: products.productID, 
        productName: products.productName,
        productBrand: products.productBrand,
        productCategory: products.productCategory,
        productPictureLink: products.productPictureLink,
        itemWeight: products.itemWeight,
        itemPrice: products.itemPrice 
    }).from(products);
    return result;
}

export const getProductFromID = async (id = 0) => {
    const result: CustomerProduct[] = await db.select({
        productName: products.productName,
        productBrand: products.productBrand,
        productDescription: products.productDescription,
        productCategory: products.productCategory,
        productPictureLink: products.productPictureLink,
        itemWeight: products.itemWeight,
        itemPrice: products.itemPrice 
    }).from(products)
    .where(eq(products.productID, id));
    return result;
}