import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Shop } from "./pages/shop";
import { Cart } from "./pages/cart";
import { ShopContextProvider } from "./contexts/shopcontext";
import BestSellers from "./pages/bestsellers";

function App() {
  return (
    <div className="bg-gradient-to-r from-gray-300 to-slate-300">
      <ShopContextProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bestsellers" element={<BestSellers />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

export default App;
