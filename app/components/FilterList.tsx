import React from 'react';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

interface FilterListProps {
    category: string;
    brands: string[];
    checkedBrands: string[];
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    setCheckedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterList: React.FC<FilterListProps> = ({ category, brands, checkedBrands, sort, setSort, setCheckedBrands }) => {

    const sortFilters = ["Price - Low to High", "Price - High to Low", "Name - A to Z", "Name - Z to A"];

    const handleBrandChange = (item: string) => {
        const updatedCheckedItems = checkedBrands.includes(item)
            ? checkedBrands.filter((i) => i !== item)
            : [...checkedBrands, item];

        setCheckedBrands(updatedCheckedItems)
    };

    const handlePriceSortChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSort(event.target.value)
    }

    return (
        <div className='p-3 flex flex-col w-48'>
            <div className='text-2xl'>Filters</div>
            <div className='text-lg'>Brands</div>
            {brands.map((item) => (
                <div key={item} className="flex items-center">
                    <input
                        type="checkbox"
                        id={item}
                        checked={checkedBrands.includes(item)}
                        onChange={() => handleBrandChange(item)}
                    />
                    <label htmlFor={item} className="text-md ml-2">
                        {item}
                    </label>
                </div>
            ))}
            <div className='divider'></div>
            <div className='text-2xl'>Sort</div>
            <form>
                {sortFilters.map((item, index) => (
                    <div key={item}>
                        <input type="radio"
                            key={item}
                            id={"sort " + index}
                            name="sort"
                            className='radio radio-sm'
                            value={sortFilters[index]}
                            checked={sortFilters[index] === sort}
                            onChange={handlePriceSortChange}></input>
                        <label htmlFor={"sort " + index} className='text-md'>{item}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default FilterList;
