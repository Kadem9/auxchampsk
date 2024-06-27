import React, { useState } from "react";
import ProductSearch from "./ProductSearch.jsx";
import ProductDetailsForm from "./ProductDetailsForm.jsx";
import { useProduct } from "../../../../../../Context/ProductContext.jsx";
import {useParams} from "react-router-dom";

function CreateProductModal({ onClose }) {
    const { createProduct } = useProduct();
    const { id } = useParams();
    const [step, setStep] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
console.log(id)
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setStep(2);
    };

    const handleDetailsSubmit = async (details) => {
        setProductDetails(details);
        const newProduct = {
            ...details,
            magasin: `/api/magasins/${id}`
        };
        await createProduct(newProduct);
        onClose();
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div>
            {step === 1 && <ProductSearch onSelect={handleProductSelect} />}
            {step === 2 && <ProductDetailsForm product={selectedProduct} onSubmit={handleDetailsSubmit} onBack={handleBack} />}
        </div>
    );
}

export default CreateProductModal;
