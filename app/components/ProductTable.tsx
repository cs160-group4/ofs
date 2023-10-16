"use client"
import React, { useEffect, useState } from 'react'

const ProductTable = () => {
    const[products, setProducts] = useState([]);
    console.log(products);
    useEffect(() => {
        const url = "http://localhost:3000/api/basicProduct";
        fetch(url).then((res) => res.json()).then((products) => {
            setProducts(products);
        });
    }, []);

    
    return (
        <div></div>
  )
}

export default ProductTable