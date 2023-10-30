import { check } from 'drizzle-orm/mysql-core';
import React, { useEffect, useState } from 'react';

interface FilterListProps {
    category:string;
    brands: string[];
    checkedBrands: string[];
    nameSort : string;
    priceSort : string;
    setNameSort: React.Dispatch<React.SetStateAction<string>>;
    setPriceSort: React.Dispatch<React.SetStateAction<string>>;
    setCheckedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterList: React.FC<FilterListProps> = ({category, brands, checkedBrands, nameSort, priceSort, setNameSort, setPriceSort, setCheckedBrands}) => {
  
    const sortPrice = ["Price - Low to High", "Price - High to Low"];
    const sortPriceSQL = ["ASC", "DESC"];
    const sortName = ["Name - A to Z", "Name - Z to A"];
    const sortNameSQL = ["ASC", "DESC"];

    const handleBrandChange = (item: string) => {
        const updatedCheckedItems = checkedBrands.includes(item)
        ? checkedBrands.filter((i) => i !== item)
        : [...checkedBrands, item];

        setCheckedBrands(updatedCheckedItems)
    };

    const handlePriceSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPriceSort(event.target.value)
    }
    const handleNameSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNameSort(event.target.value)
    }

    return (
        <div>
        <h2>Filters</h2>
        <h2>Brands</h2>
        {brands.map((item) => (
            <div key={item} className="flex items-center">
                <input
                    type="checkbox"
                    id={item}
                    checked={checkedBrands.includes(item)}
                    onChange={() => handleBrandChange(item)}
                />
                <label htmlFor={item} className="ml-2">
                    {item}
                </label>
            </div>
        ))}
        <h2>Sort By:</h2>
        <form>
            {sortPrice.map((item, index) => (
                <div key={item}>
                    <input type="radio" 
                    key={item} 
                    id={"sort "+index} 
                    name="sort"
                    value={sortPriceSQL[index]}
                    checked={sortPriceSQL[index] === priceSort}
                    onChange={handlePriceSortChange}></input>
                    <label htmlFor={"sort "+index}>{item}</label>
                </div>
            ))}
        </form>
        <form>
            {sortName.map((item, index) => (
                <div key={item}>
                    <input type="radio" 
                    key={item} 
                    id={"sort "+index} 
                    name="sort"
                    value={sortNameSQL[index]}
                    checked={sortNameSQL[index] === nameSort}
                    onChange={handleNameSortChange}></input>
                    <label htmlFor={"sort "+index}>{item}</label>
                </div>
            ))}
        </form>
        </div>
    );
};

export default FilterList;
