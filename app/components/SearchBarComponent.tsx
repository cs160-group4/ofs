'use client'
import { Product } from '@/lib/products';
import { useEffect, useState } from 'react';
import OptionList from './OptionList';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export const SearchBarComponent = () => {

  const initOptions: Product[] = []

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(initOptions);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && !target.closest('#search-container')) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSearch]);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const fetchProducts = async (term: string) => {
    try {
      const response = await fetch("/api/productByName?name=" + term, {
        method: 'GET',
      });
      const x = await response.json()
      setFilteredOptions(x);
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  const handleSearch = (e: { target: { value: any; }; }) => {
    let term = e.target.value;
    setSearchTerm(term);
    if (term == "")
      term = ""
    else
      term = "%" + e.target.value + "%";
    fetchProducts(term);

  };


  return (
    <>
      <div className="hidden sm:block dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Search products by name</span>
            </div>
            <input type="text" placeholder="Search..." className="input input-bordered w-full max-w-xs"
              value={searchTerm}
              onChange={handleSearch} />
          </label>
          <div>
            <OptionList filteredOptions={filteredOptions} setShowSearch={setShowSearch} />
          </div>
        </div>
      </div>

      {/* <div className="flex" id="search-container">

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
              <OptionList filteredOptions={filteredOptions} setShowSearch={setShowSearch} />
            </div>
          </div>
        )}

        <button onClick={handleToggleSearch} className="btn btn-ghost btn-circle mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div> */}






    </>


  );
}

