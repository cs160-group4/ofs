import {FC} from 'react'
import Navbar from '../components/NavbarComponent'

interface pageProps {
    searchParams : any
}

const page: FC<pageProps> = ({searchParams}) => {

    // Grab data using api with name
    
    let retData = {
        weight : 1,
        price : 1,
        description : "boo",
        quantity : 50
   }

    return <div> 
            <div className='bg-white flex'>
                <div className='flex-grow bg-red-500 max-w-screen-sm max-h-screen-sm m-4'>
                    <div className='items-stretch w-fill h-fill'>Image</div>
                </div>
                <div className='flex-grow bg-blue-500 p-4 w-max'>
                    <div className="text-black text-2xl mb-4">{searchParams.name}</div>
                    <div className="text-black">Weight: {retData.weight}</div>
                    <div className="text-black">Price: {retData.price}</div>
                    <div className="text-black">Description: {retData.description}</div>
                    <div className="text-black">Quanitty: {retData.quantity}</div>
                    <div className='flex'>
                        <label htmlFor="itemQuantity" className="block text-gray-900 dark:text-white">Quantity: </label>
                        <input type="text" id="itemQuantity" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ml-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required></input>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
}

export default page
