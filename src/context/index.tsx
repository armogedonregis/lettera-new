'use client'

import { ReactNode } from "react";
import { CartProvider } from "./cartContext";


export const CartWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    );
};