import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import Antdesign from "./components/Antdesign";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Antdesign />

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Products />} />
    //     <Route path="/ProductDetails/:productId" element={<ProductDetails />} />
    //     <Route path="/Cart" element={<Cart />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
