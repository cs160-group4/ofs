'use client'
import React, { useState } from 'react'

export const SearchBarComponent = () => {
    const [query, setQuery] = useState('');

    const handleInput = (e:any) =>
    {
        setQuery(e.target.value);
    }
    
    return (
        <>
            <input onChange={handleInput} type="text" placeholder='Search...' className='rounded-box pl-4'/>
        </>
    )
}