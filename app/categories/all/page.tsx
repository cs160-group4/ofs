import {FC} from 'react'
import Product from '../../components/ProductComponent'

interface pageProps {}

const page: FC<pageProps> = ({}) => {

    const productList = [
        {name : "Apple", price : 1, weight : 1, description : "1", quantity : 1},
        {name : "Pineapple", price : 2, weight : 1, description : "1", quantity : 1},
        {name : 'Peach', price : 3, weight : 1, description : '1', quantity : 1},
        {name : "Milk", price : 4, weight : 1, description : "1", quantity : 1},
        {name : 'Steak', price : 5, weight : 1, description : "1", quantity : 1},
        {name : "Eggs", price : 6, weight : 1, description : '1', quantity : 1},
        {name : "Plum", price : 7, weight : 1, description : '1', quantity : 1},
        {name : "Watermelon", price : 8, weight : 1, description : "1", quantity : 1},
        {name : "Oranges", price : 9, weight : 1, description : "1", quantity : 1}
    ];

    return <div className="flex">
                <div className="flex-shrink bg-blue-500 p-4 w-80">
                    <h6 className='text-lg font-large text-gray-900'>Filters</h6>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                    </div>
                </div>
                <div className="flex-grow bg-red-500 p-4">
                    <div className="flex flex-wrap">
                        {productList.map(item => (
                            <Product
                                name={item.name}
                                price={item.price}
                                weight={item.weight}
                                description={item.description}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>
            </div>
}

export default page