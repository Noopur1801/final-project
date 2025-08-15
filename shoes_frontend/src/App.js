// // src/App.js
// import React from 'react';
// import Axios from "axios";

// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './Components/Layout/Layout';
// import Home from './Components/Pages/Home';
// import Collections from './Components/Pages/Collections';
// import ContactUs from './Components/Pages/ContactUs';
// import AboutUs from './Components/Pages/AboutUs';
// import Footer from './Components/Pages/Footer';
// import LandingPage from './Components/Pages/Landingpage';
// import Cart from './Components/Pages/Cart';
// import { Navbar } from 'react-bootstrap';
// import Login from './Components/Pages/Login';
// import Signup from './Components/Pages/SignUp';
// import Contactus from './Explore/Contactus';
// import OrderInfo from'./Explore/OrderInfo';
// import ShippingInfo from './Explore/ShippingInfo';
// import StorePickup from './Explore/StorePickup';
// import ReturnExchange from './Explore/Return';
// import { CartProvider } from './Components/Pages/CartContext';
// import { WishlistProvider } from './Components/Pages/ProductWishlist';

// // import Footer from './Components/Pages/Footer';

// //import Images from './public/shoes.png';

// function App() {

//    return (
//     <CartProvider>
//         <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout/>}>
//           {/* <Route exact path="/" element={<Home/>}/> */}
//           <Route exact path="/home" element={<Home/>}/>
//           <Route path="/collections" element={<Collections/>}/>
//           <Route path="/contactus" element={<ContactUs/>}/>
//           <Route path="/aboutus" element={<AboutUs/>}/>
//           {/* <Route path="/" element={<Footer/>}/> */}
//           <Route path="/cart" element={<Cart/>}/>
//           <Route path="/navbar" element={<Navbar/>}/>
//           <Route path="/" element={<LandingPage/>}/>
//           <Route path="/login" element={<Login/>}/>
//           <Route path="/signup" element={<Signup/>}/>
//           <Route path="/contact-us" element={<Contactus/>}/>
//           <Route path="/order-info" element={<OrderInfo/>}/>
//           <Route path="/shipping-info" element={<ShippingInfo/>}/>

//           <Route path="/store-pickup" element={<StorePickup/>}/>

//           <Route path="/return-exchange" element={<ReturnExchange/>}/>

//         </Route>
//       </Routes>
//     </BrowserRouter>
//     </CartProvider>
//   );
// }

// export default App;
// // src/App.js

// src/App.js
import React from "react";
import Axios from "axios";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home";
import Collections from "./Components/Pages/Collections";
import SearchedCollection from "./Components/Pages/SearchedCollection";
import ContactUs from "./Components/Pages/ContactUs";
import AboutUs from "./Components/Pages/AboutUs";
import Footer from "./Components/Pages/Footer";
import LandingPage from "./Components/Pages/Landingpage";
import Cart from "./Components/Pages/Cart";
import { Navbar } from "react-bootstrap";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/SignUp";
import Contactus from "./Explore/Contactus";
import OrderInfo from "./Explore/OrderInfo";
import ShippingInfo from "./Explore/ShippingInfo";
import StorePickup from "./Explore/StorePickup";
import ReturnExchange from "./Explore/Return";
import { CartProvider } from "./Components/Pages/CartContext";
import {
  WishlistContext,
  WishlistProvider,
} from "./Components/Pages/WishlistContext";
import WishlistComponent from "./Components/Pages/WishlistComponent";
//import { WishlistProvider } from './Components/Pages/WishlistContext'; // Ensure the correct path

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route exact path="/" element={<Home/>}/> */}
              <Route exact path="/home" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route
                path="/SearchedCollection"
                element={<SearchedCollection />}
              />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              {/* <Route path="/" element={<Footer/>}/> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact-us" element={<Contactus />} />
              <Route path="/order-info" element={<OrderInfo />} />
              <Route path="/shipping-info" element={<ShippingInfo />} />
              <Route path="/store-pickup" element={<StorePickup />} />
              <Route path="/return-exchange" element={<ReturnExchange />} />
              <Route path="/wishlistcontext" element={<WishlistContext />} />
              <Route
                path="/wishlistcomponent"
                element={<WishlistComponent />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
