// WishlistComponent.js

import React, { useContext } from 'react';
import { WishlistContext } from './WishlistContext';
//import { WishlistContext } from './WishlistContext';

const WishlistComponent = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>
            {item.name} - &#8377;{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistComponent;
