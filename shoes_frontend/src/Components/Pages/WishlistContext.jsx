// import React, { createContext, useState } from 'react';

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const addToWishlist = (product) => {
//     setWishlist((prevWishlist) => [...prevWishlist, product]);
//   };

//   const removeFromWishlist = (productId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.filter((product) => product.id !== productId)
//     );
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };
// import React, { createContext, useState } from 'react';

// // Create Wishlist Context
// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   const addToWishlist = (product) => {
//     setWishlist((prevWishlist) => {
//       if (prevWishlist.some(item => item.id === product.id)) {
//         return prevWishlist;
//       }
//       return [...prevWishlist, product];
//     });
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// WishlistContext.js

// WishlistContext.js

import React, { createContext, useState } from 'react';

// Create a context
export const WishlistContext = createContext();

// Create a provider component
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
  };

  return (
   <>
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
      
    </WishlistContext.Provider>
   </>
  );
};
