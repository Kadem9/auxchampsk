import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext.jsx";
import { toast } from "react-toastify";

const CartContext = createContext();

const CART_EXPIRATION_HOURS = 2;

const getCartFromLocalStorage = (userId) => {
    const cartData = localStorage.getItem(`cart_${userId}`);
    if (cartData) {
        const { cart, timestamp } = JSON.parse(cartData);
        const now = new Date().getTime();
        const expirationTime = new Date(timestamp).getTime() + CART_EXPIRATION_HOURS * 60 * 60 * 1000;
        if (now < expirationTime) {
            return cart;
        }
    }
    return [];
};

const resolveIRI = async (iri) => {
    try {
        const response = await fetch(iri);
        if (!response.ok) {
            throw new Error(`Impossible de récupérer les détails pour ${iri}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la résolution de l'IRI: ${iri}`, error);
        return null;
    }
};

const resolveCartItems = async (cart) => {
    return Promise.all(
        cart.map(async (item) => {
            const magasinDetails = await resolveIRI(item.product.magasin);
            const productDetails = await resolveIRI(item.product.product);
            return {
                ...item,
                product: {
                    ...item.product,
                    magasinDetails,
                    productDetails
                }
            };
        })
    );
};

export const CartProvider = ({ children }) => {
    const { user } = useUser();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const initializeCart = async () => {
            if (user) {
                const initialCart = getCartFromLocalStorage(user.id);
                const resolvedCart = await resolveCartItems(initialCart);
                setCart(resolvedCart);
            }
        };
        initializeCart();
    }, [user]);

    useEffect(() => {
        if (user) {
            const saveCartToLocalStorage = () => {
                const cartData = {
                    cart,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartData));
            };
            saveCartToLocalStorage();
        }
    }, [cart, user]);

    const addToCart = async (product, user, quantity = 1) => {
        const magasinDetails = await resolveIRI(product.magasin);
        const productDetails = await resolveIRI(product.product);
        const updatedProduct = { ...product, magasinDetails, productDetails };

        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.product.id === updatedProduct.id);
            if (existingProduct) {
                toast.info(`${updatedProduct.productDetails.name} quantité augmentée dans le panier`);
                return prevCart.map(item =>
                    item.product.id === updatedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                toast.success(`${updatedProduct.productDetails.name} ajouté au panier`);
                return [...prevCart, { product: updatedProduct, quantity }];
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            );
            toast.info(`Quantité mise à jour`);
            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter(item => item.product.id !== productId);
            toast.error(`Produit supprimé du panier`);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        toast.warn("Panier vidé");
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
