import { Product } from "@/lib/products";
import Link from "next/link";

interface OptionListProps {
    filteredOptions: Product[];
}

const OptionList : React.FC<OptionListProps> = ({ filteredOptions}) => {
    return (
    <ul className="mt-2">
        {filteredOptions.map((product, index) => (
          <li key={index} className="p-2 border bg-gray-600 w-full">
            <Link href={"/products/" + product.id} >
                {product.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  
  export default OptionList;