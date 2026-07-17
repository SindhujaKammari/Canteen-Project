import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "https://college-canteen-project.onrender.com";

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            // Update the cart on the backend only if there's a token
            if (token) {
                axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } }).catch(err => console.error('Error adding to cart:', err));
            }
            return newCartItems;
        });
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemId] || 1) - 1;
            if (newQuantity <= 0) {
                const { [itemId]: removed, ...rest } = prev;
                // Remove item from cart if quantity is zero
                setCartItems(rest);
            } else {
                setCartItems({ ...prev, [itemId]: newQuantity });
            }
            // Update the cart on the backend only if there's a token
            if (token) {
                axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } }).catch(err => console.error('Error removing from cart:', err));
            }
            return prev;
        });
    };

    const getTotalCartAmount = () => {
        return food_list.reduce((total, item) => {
            const quantity = cartItems[item._id] || 0;
            return total + item.price * quantity;
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (err) {
            console.error('Error fetching food list:', err);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (err) {
            console.error('Error loading cart data:', err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
