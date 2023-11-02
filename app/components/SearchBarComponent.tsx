'use client'
import React, { useState } from 'react'
import { Product, getProductByName } from '@/lib/products';
import OptionList from './OptionList';

export const SearchBarComponent = () => {

    const initOptions : Product[] = []

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(initOptions);

    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
    };

    const fetchProducts = async(term : string) => {
        try {
            const response = await fetch("/api/productByName?name="+term, {
                method: 'GET',
            });
            setFilteredOptions(await response.json());
        }
        catch (error) {
            console.error('Error: ', error);
        }
    }

    const handleSearch = (e: { target: { value: any; }; }) => {
        let term = e.target.value;
        setSearchTerm(term);
        if(term == "")
            term = ""
        else 
            term = "%" + e.target.value + "%";
        fetchProducts(term);
        
  };


  return (
    <div className="flex">

      {showSearch && (
        <div className="right-0 top-10  border-gray-300 p-2 rounded-md">
            <input
                type="text"
                placeholder="Search..."
                className="w-full px-2 py-1"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="absolute z-50 w-fit">
                <OptionList filteredOptions={filteredOptions}/>
            </div>
        </div>
      )}

        {/* Search Button*/}
        <button onClick={handleToggleSearch} className="btn btn-ghost btn-circle mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
    </div>
  );
}

