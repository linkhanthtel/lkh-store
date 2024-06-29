import { Data } from "../data/data"
import { ShopItems } from "../components/shopitems"

function BestSellers() {
  return (
        <div>
            <div className="my-5">
                <h1 className="text-center text-3xl text-slate-900">Best Selling Items of the month</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {Data.map((item) => 
                (<div key={item.id}><ShopItems {...item} /></div>)
                )}
            </div>
        </div>
  )
}

export default BestSellers
