// ProductPage.tsx

import React, { useState } from 'react';
import { useGetItemsQuery } from './api.ts';
import {Item} from "./types.ts"; // Импортируем запросы из нашего API

const ProductPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = useGetItemsQuery({ ids: [], offset: (currentPage - 1) * 50, limit: 50 });

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    if (error) {
        console.error('Error occurred:', error);
    }

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name, price, or brand" />
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error occurred while fetching data.</div>
            ) : (
                <>
                    <ul>
                        {data?.map((product: Item, index: number) => (
                            <li key={index}>
                                <div>ID: {product.id}</div>
                                <div>Name: {product.product}</div>
                                <div>Price: {product.price}</div>
                                <div>Brand: {product.brand || 'N/A'}</div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Prev Page
                    </button>
                    <button onClick={handleNextPage}>Next Page</button>
                </>
            )}
        </div>
    );
};

export default ProductPage;
