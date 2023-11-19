import { Product } from "@/lib/products";

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
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
    <ul className="mt-2">
      {filteredOptions.map((product, index) => (
        <li key={index} className="p-2 border bg-gray-600 w-full">
          <a onClick={handleClick} href={"/products/" + product.id} >
            {product.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default OptionList;