import {createContext, useContext} from "react";
import ProductTypeStore from "@/app/store/productTypeStore";
import UserStore from "@/app/store/UserStore";
import ProductStore from "@/app/store/ProductStore";
import OrderStore from "@/app/store/OrderStore";

export const stores = {
    productTypeStore: new ProductTypeStore(),
    userStore: new UserStore(),
    productStore: new ProductStore(),
    orderStore: new OrderStore(),
}

const StoreContext = createContext(stores);

// @ts-ignore
export const ContextProvider = ({children}) => {

    return (
        <StoreContext.Provider value={stores}>
            {children}
        </StoreContext.Provider>
    )
};

export function useStore() {
    return useContext(StoreContext);
}