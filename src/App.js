import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Shop } from "./pages/shop";
import { Cart } from "./pages/cart";
import { ShopContextProvider } from "./contexts/shopcontext";

function App() {
  return (
    <div className="bg-gradient-to-r from-yellow-800 to-yellow-900">
      <ShopContextProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      <Footer />
      </BrowserRouter>
      </ShopContextProvider>
    </div>
  );
}

export default App;
