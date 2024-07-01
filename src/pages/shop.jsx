import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"
import heroimage from "../images/hero.jpg"

export const Shop = () => {
    return(
        <div>
            {/* Hero Section */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 h-[400px] bg-white">
                <div className="flex justify-center items-center">
                    <img src={heroimage} alt="Image" className="h-72" />
                </div>
                <div className="flex flex-col items-center text-xl pt-20 px-10">
                    <p className="font-light">Reward yourself with amazing items and products from LKH store. Taste the best online shopping experience with awesome items with reasonable price. Claim up to 50% with LKH gift cards.</p>
                    <button onClick={() => {alert("You have claimed your discount!")}} className="p-3 my-5 font-extralight text-white bg-green-700 rounded-full animate-bounce">Claim Discount</button>
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