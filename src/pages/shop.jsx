import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"

export const Shop = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-4">
            {Data.map((item) => 
            (<div key={item.id}><ShopItems {...item} /></div>)
            )}
        </div>
    )
}