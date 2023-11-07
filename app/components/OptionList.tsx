import { Product } from "@/lib/products";
import Link from "next/link";

interface OptionListProps {
    filteredOptions: Product[];
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionList : React.FC<OptionListProps> = ({ filteredOptions,setShowSearch}) => {
  
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