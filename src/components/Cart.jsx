import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, totalCartPrice, amountOfItemsInCart, totalCartDiscountedPrice } = useContext(CartContext);
    const userEmail = localStorage.getItem('username');
    const navigate = useNavigate();
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        const response = await fetch('https://offerservice-gpcf.onrender.com/api/orders/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderTotal: totalCartDiscountedPrice() })
        });

        const responseJson = await response.json();
        const { id, amount } = await responseJson.data;

        const razorPayOptions = {
            key: 'rzp_test_Hadv9q51oXHct1',
            currency: 'INR',
            amount: amount,
            name: `Razorpay Checkout`,
            description: `Paying for testing`,
            order_id: id,
            handler: async function (response) { // handler function when payment is successfull
                const razorpayOrderId = response['razorpay_order_id'];
                let cartProducts = [];
                cart.map(c => cartProducts.push(c.id));
                await fetch('https://offerservice-gpcf.onrender.com/api/orders/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        orderTotal: (amount / 100),
                        orderId: razorpayOrderId,
                        orderedBy: userEmail,
                        products: cartProducts
                    })
                });
                localStorage.removeItem('cart');
                navigate('/thankyou');
            },
        };

        const razorpayInstance = new window.Razorpay(razorPayOptions);
        razorpayInstance.open();
    }

    const handleCheckout = async () => {
        await displayRazorpay();
        localStorage.removeItem('cart');
    };


    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                { amountOfItemsInCart() > 0 ?
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul className="divide-y divide-gray-200">
                            {cart.map((product, productIdx) => (
                                <div key={product.id} className="">
                                    <li className="flex py-6 sm:py-6 ">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <span className="font-semibold text-black">
                                                                {product.title}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-xs font-medium text-gray-500 line-through">
                                                            ＄{product.price}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            &nbsp;&nbsp;＄{Math.round(product.price - (product.price * product.discountPercentage * 1 / 100))}
                                                        </p>
                                                        &nbsp;&nbsp;
                                                        <p className="text-sm font-medium text-green-500">{Math.round(product.discountPercentage)}% Off</p>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-sm font-semibold text-black">Total: </p>
                                                        {product.quantity ? (
                                                            <p className="ml-2 font-semibold text-black">
                                                                ＄{Math.round(product.price - (product.price * product.discountPercentage * 1 / 100)) * product.quantity}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {/* <div className="mb-2 flex">
                                        <div className="ml-6 flex text-sm">
                                            <button
                                                className="flex items-center space-x-1 px-2 py-1 pl-0"
                                                onClick={handleRemoveItem}
                                            >
                                                <Trash size={12} className="text-red-500" />
                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                            ))}
                        </ul>
                    </section>
                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                    >
                        <h2
                            id="summary-heading"
                            className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                        >
                            Price Details
                        </h2>
                        <div>
                            <dl className=" space-y-1 px-2 py-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-800">Price ({amountOfItemsInCart()} item)</dt>
                                    <dd className="text-sm font-medium text-gray-900">＄ {totalCartPrice()}</dd>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-gray-800">
                                        <span>Discount</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">- ＄ {totalCartPrice() - totalCartDiscountedPrice()}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">＄ {totalCartDiscountedPrice()}</dd>
                                </div>
                            </dl>
                            <div className="px-2 pb-4 font-medium text-green-700">
                                You will save ＄ {totalCartPrice() - totalCartDiscountedPrice()} on this order
                            </div>
                        </div>
                    </section>
                    </form>
                    :
                    <div className="mt-12">
                        <h1>Hey! Your Cart is Empty! Let's go for shopping...</h1>
                    </div>
                }
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Back to shop
                    </button>
                    {amountOfItemsInCart() > 0 &&
                        <button
                            onClick={handleCheckout}
                            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Checkout
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;