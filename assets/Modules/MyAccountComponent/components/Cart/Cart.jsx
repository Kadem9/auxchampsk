import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { useCart } from "../../../../Context/CartContext.jsx";

function Cart() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    // Regroupement des produits par magasin
    const groupedCart = cart.reduce((acc, item) => {
        const magasinName = item.product.magasinDetails?.nom;
        if (!acc[magasinName]) {
            acc[magasinName] = [];
        }
        acc[magasinName].push(item);
        return acc;
    }, {});

    const handleQuantityChange = (productId, quantity) => {
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    };

    // Calcul du total du panier
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-page container">
            <h2>Mon Panier</h2>
            {cart.length > 0 ? (
                <>
                    {Object.keys(groupedCart).map((magasinName, index) => (
                        <div key={index} className="mb-4">
                            <h4 className="magasin-title">{magasinName}</h4>
                            <ul className="list-group mb-3">
                                {groupedCart[magasinName].map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center cart-item">
                                        <div className="cart-item-details d-flex align-items-center">
                                            <img src={`/assets/img/products/${item.product.productDetails?.image}`} alt={item.product.productDetails?.name} className="cart-item-image me-3" />
                                            <div className="cart-item-info">
                                                <h5 className="product-name">{item.product.productDetails?.name}</h5>
                                                <p className="product-price">Prix: {item.product.price} €</p>
                                                <div className="quantity-control d-flex align-items-center">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="form-control mx-2"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                                                        style={{ width: '60px', textAlign: 'center' }}
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.product.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="cart-total d-flex justify-content-between align-items-center">
                        <h4>Total :</h4>
                        <h4>{calculateTotal()} €</h4>
                    </div>
                    <button className="btn btn-danger w-100" onClick={clearCart}>Vider le Panier</button>
                </>
            ) : (
                <p>Votre panier est vide.</p>
            )}
        </div>
    );
}

export default Cart;
