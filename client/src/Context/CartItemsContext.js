import { createContext } from "react";

export const CartItemsContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => 0,
    removeItem: () => {},
    quantity: () => {}
})
 
export default CartItemsContext;