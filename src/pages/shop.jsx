import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"
import heroimage from "../images/hero.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Shop = () => {
    const discount = () => toast("You have claimed a discount");

    return(
        <div>
            {/* Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-[450px] bg-white">
                <div className="flex flex-col justify-center items-center">
                    <img src={heroimage} alt="Image" className="h-72" />
                    <p className="flex text-center md:hidden">Reward yourself with amazing items and products from LKH store. Taste the best online shopping experience with awesome items with reasonable price.</p>
                    <button onClick={() => {alert("You have claimed your discount!")}} className="p-3 mt-5 flex md:hidden font-extralight text-white bg-green-700 rounded-full animate-bounce">Claim Discount</button>
                    <ToastContainer />
                </div>
                <div className="hidden md:flex flex-col items-center text-xl pt-20 px-10">
                    <p className="font-light">Reward yourself with amazing items and products from LKH store. Taste the best online shopping experience with awesome items with reasonable price. Claim up to 50% with LKH gift cards.</p>
                    <button onClick={discount} className="p-3 mt-16 font-extralight text-white bg-green-700 rounded-full animate-bounce">Claim Discount</button>
                </div>
            </div>

            {/* Items Section */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                {Data.map((item) => 
                (<div key={item.id}><ShopItems {...item} /></div>)
                )}
            </div>

        </div>
    )
}