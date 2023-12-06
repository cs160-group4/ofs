import { Product } from "@/lib/products";

/*
  Authors: Aaron Low <aaron.c.low@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

interface OptionListProps {
  filteredOptions: Product[];
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionList: React.FC<OptionListProps> = ({ filteredOptions, setShowSearch }) => {

  const handleClick = () => {
    setShowSearch(false)
  }

  return (
    <ul className="mt-2 gap-1">
      {filteredOptions.map((product, index) => (
        <li key={index} className=" bg-base-100 rounded-box m-0 p-0">
          <a className="m-0 p-2" onClick={handleClick} href={"/products/" + product.id} >
            {product.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default OptionList;