import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export const ThankYou = () => {
    const { cart, totalCartDiscountedPrice, amountOfItemsInCart } = useContext(CartContext);
    const navigate = useNavigate();
    const generateRandomOrder = () => {
        return Math.round(Math.random()*9999*1000);
    }
    return (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            <h2 className="text-3xl font-bold">Order Details</h2>
            <div className="mt-3 text-sm">
                Check the status of recent and old orders & discover more products
            </div>
            <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
                {amountOfItemsInCart() > 0 &&
                <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                    <div className="p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                            {[
                                ['Order ID', `#${generateRandomOrder()}`],
                                ['Date', `${new Date()}`],
                                ['Total Amount', `$${totalCartDiscountedPrice()}`],
                                ['Order Status', 'Confirmed'],
                            ].map(([key, value]) => (
                                <div key={key} className="mb-4">
                                    <div className="text-sm font-semibold">{key}</div>
                                    <div className="text-sm font-medium text-gray-700">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                }
                <div className="flex-1">
                    <div className="p-8">
                        { amountOfItemsInCart() > 0 ?
                        <ul className="-my-7 divide-y divide-gray-200">
                            {cart.map((product) => (
                                
                                <li
                                    key={product.id}
                                    className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                >
                                    <div className="flex flex-1 items-stretch">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                                src={product.thumbnail}
                                                alt={product.thumbnail}
                                            />
                                        </div>
                                        <div className="ml-5 flex flex-col justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900">{product.title}
                                                    <span className="ml-3 text-sm font-medium text-blue-500">x {product.quantity}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-auto flex flex-col items-end justify-between">
                                        <p className="text-right text-sm font-bold text-gray-900">
                                            ${Math.round(product.price - (product.price * product.discountPercentage * 1 / 100)) * product.quantity}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        :
                        <>
                        <h1>Oops! looks like you jumped to Thank You!</h1>
                        <h2>Buy Some Products</h2>
                        </>
                        }           
                        <hr className="my-8 border-t border-t-gray-200" />
                        <div className="space-x-4">
                            <button
                            onClick={() => navigate('/')}
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Shop More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
