import { useEffect, useState } from "react";
import { CartItemsContext } from "./CartItemsContext";

// const CartItemsProvider = (props) => {

//     const [cartItems, setCartItems] = useState([])
//     const [totalAmountOfItems, setTotalAmountOfItems] = useState(0)
    
//     const addToCartHandler = (item, quantity) => {
//         const { _id, name, price, image, category, size} = item;
//         removeFromCartHandler(item)
//         setCartItems((prevItems) => [...prevItems, {_id, name, price, image, category, itemQuantity: quantity, size}])
//     }

//     const removeFromCartHandler = (item) => {
//         setCartItems(cartItems.filter((prevItem) => prevItem._id !== item._id))
//     }

//     const calculateTotalAmount = (currentCartItems) => {
//         let total = 0
//         currentCartItems.forEach((item) => {
//             total = total + (item.price * item.itemQuantity)
//         })

//         setTotalAmountOfItems(total)
//     }

//     const quantityHandler = (itemId, action) => {
//         if(action === 'INC'){
//             setCartItems(cartItems.map((item) => {
//                 if(item.id  === itemId){
//                     item.itemQuantity += 1
//                 }
//                 return item
//             }))
//         }
//         else {
//             setCartItems(cartItems.map((item) => {
//                 if(item.id  === itemId){
//                     item.itemQuantity -= 1
//                 }
//                 return item
//             }))
//         }
//     }

//     useEffect(() => {
//         calculateTotalAmount(cartItems)
//     }, [cartItems])


//     const cartItemCtx = {
//         items: cartItems,
//         totalAmount: totalAmountOfItems,
//         addItem: addToCartHandler,
//         removeItem: removeFromCartHandler,
//         quantity: quantityHandler
//     }

//     return ( 
//         <CartItemsContext.Provider value={cartItemCtx}>
//             {props.children}
//         </CartItemsContext.Provider>
//      );
// }
 
// export default CartItemsProvider;


const CartItemsProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);


  const addToCartHandler = (item, quantity) => {
  const { _id, name, price, image, category, size } = item;
  let updatedQuantity = quantity;

  setCartItems((prevItems) => {
    const existingItemIndex = prevItems.findIndex((i) => i._id === _id);
    let updatedItems;

    if (existingItemIndex !== -1) {
      updatedQuantity = prevItems[existingItemIndex].itemQuantity + quantity;

      updatedItems = [...prevItems];
      updatedItems[existingItemIndex].itemQuantity = updatedQuantity;
    } else {
      updatedItems = [
        ...prevItems,
        { _id, name, price, image, category, itemQuantity: quantity, size }
      ];
    }

    return updatedItems;
  });

  return updatedQuantity; // ✅ return updated quantity to caller
};



  const removeFromCartHandler = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem._id !== item._id)
    );
  };

  const calculateTotalAmount = (currentCartItems) => {
    let total = 0;
    currentCartItems.forEach((item) => {
      total += item.price * item.itemQuantity;
    });
    setTotalAmountOfItems(total);
  };

  const quantityHandler = (itemId, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          const updatedQuantity =
            action === "INC"
              ? item.itemQuantity + 1
              : Math.max(1, item.itemQuantity - 1); // optional: prevent 0
          return { ...item, itemQuantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]);

  const cartItemCtx = {
    items: cartItems,
    totalAmount: totalAmountOfItems,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    quantity: quantityHandler
  };

  return (
    <CartItemsContext.Provider value={cartItemCtx}>
      {props.children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
