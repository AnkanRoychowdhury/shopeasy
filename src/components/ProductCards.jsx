import React, { useState } from 'react'
import Error from './Error';
import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const ProductCards = ({ isLogged, setProduct }) => {

    // const navigate = useNavigate();
    const [search, setSearch] = useState({});
    const { products } = useContext(ProductContext);

    const handleChoose = async (productId) => {
        const pro = products.filter(product => product.id === productId);
        setProduct(pro[0]);
        const queryString = `productId=${encodeURIComponent(productId)}`;
        const newUrl = `/products?${queryString}`;
        window.location.href = newUrl;

    }
    let filteredProducts = products;
    const searchProducts = () => {
        filteredProducts = products.filter(product => product.title.toLowerCase().includes(search.search))
    }

    const handleSearchChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    }


    return (
        <>   
            {isLogged ?
                <div className="mx-auto max-w-7xl px-2">
                    <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
                        <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                        Explore the Gen-z Fashion
                        </p>
                        <p className="max-w-4xl text-base text-gray-600 md:text-xl">
                        FRESH FASHION FINDS NEW COLLECTION 
                        <br></br>All fashion fusion now in your fingertips just order your Gen-Z styles
                        </p>
                        <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                name='search'
                                onChange={handleSearchChange}
                                placeholder="Search Products"
                            ></input>
                            <button
                                onClick={searchProducts}
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="rounded-md border">
                                <img
                                    src={product.thumbnail}
                                    alt="Laptop"
                                    className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                                />
                                <div className="p-4">
                                    <h1 className="inline-flex items-center text-lg font-semibold">{product.title}</h1>
                                    <p className="mt-3 text-sm text-gray-600">
                                        <b>{product.description.slice(0,50)}...</b>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleChoose(product.id);
                                        }}
                                        className="mt-4 w-full rounded-sm bg-[#00897b] px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* End of Cards */}
                    <div className="w-full border-t border-indigo-500/100">
                        <div className="mt-2 flex items-center justify-between">
                            <div className="hidden md:block">
                                <p>
                                    showing <strong>1</strong> to <strong>10</strong> of <strong>20</strong> results
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    &larr; Previous
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Error />
            }
        </>
    )
}

export default ProductCards;
