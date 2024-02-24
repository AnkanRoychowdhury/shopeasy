import React from 'react'
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { useCounter } from './../hooks/useCounter';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductOverview = ({ isLogged }) => {
    const { products } = useContext(ProductContext);
    const { addItemToCart, isInCart } = useContext(CartContext);
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search)
    const productId = queryParameters.get("productId")
    const overviewProduct = products.filter(product => product.id === parseInt(productId));
    const product = {...overviewProduct[0]};

    const { counter, increment, decrement } = useCounter(1);

    const handleAddToCart = () => {
        if(!isLogged){
            Swal.fire({
                title: "Can't add product into cart!",
                text: "Please login to add products in your cart",
                icon: "warning"
            });
            return;
        }
        if (isInCart(product.id) || counter === 0) return;
        Object.assign(product, {quantity: counter});
        addItemToCart({ ...product });
        navigate('/cart');
    }


    return (
        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
            <div className="pt-8">
                <div className="flex items-center">
                    <ol className="flex w-full items-center overflow-hidden">
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a href="/">Home</a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="/">
                                products
                            </a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                                {product.title}
                        </li>
                    </ol>
                </div>
            </div>
            <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                            <img
                                src={product.thumbnail}
                                alt="Nike Air Max 95 By You--0"
                                className="w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="col-span-4 pt-8 lg:pt-0">
                    <div className="mb-7 border-b border-gray-300 pb-7">
                        <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                            {product.title}
                        </h2>
                        <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                            {product.description}
                        </p>
                        <div className="mt-5 flex items-center ">
                            <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                ${Math.round(product.price - (product.price*product.discountPercentage*1/100))}
                            </div>
                            <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                            ${product.price}
                            </span>
                        </div>
                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                            <button
                                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                                onClick={increment}
                            >
                                +
                            </button>
                            <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                {counter}
                            </span>
                            <button
                                onClick={decrement}
                                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                                -
                            </button>
                        </div>
                        <button
                            type="button"
                            className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="py-6 ">
                        <ul className="space-y-5 pb-1 text-sm">
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">Stock:</span>
                                {product.stock}
                            </li>
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                                <span className="hover:text-heading transition hover:underline">
                                {product.category}
                                </span>
                            </li>
                            <li className="productTags">
                                <span className="text-heading inline-block pr-2 font-semibold">Brand:</span>
                                <span
                                    className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                                >
                                    {product.brand}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-sm ">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Product Details
                            </h2>
                            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                <div className="bg-heading h-0.5 w-full rounded-sm" />
                                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                            </div>
                        </header>
                        <div>
                            <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                {product.description}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Additional Information
                            </h2>
                        </header>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Customer Reviews
                            </h2>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOverview;
