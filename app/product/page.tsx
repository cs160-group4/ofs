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
            <Navbar />
            <div className='bg-white flex'>
                <div className='flex-grow bg-red-500 max-w-screen-sm max-h-32 m-4'>
                    <div className='items-stretch w-fill h-fill'>Image</div>
                </div>
                <div className='flex-grow bg-blue-500 p-4 w-max'>
                    <div className="text-black">{searchParams.name}</div>
                    <div className="text-black">Weight: {retData.weight}</div>
                    <div className="text-black">Price: {retData.price}</div>
                    <div className="text-black">Description: {retData.description}</div>
                    <div className="text-black">Quanitty: {retData.quantity}</div>
                </div>
                
            </div>
        </div>
}

export default page
