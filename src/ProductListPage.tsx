import React, {useState, useEffect} from 'react';
import {useGetIdsQuery, useGetItemsQuery} from './services/api';
import ProductList from './ProductList';
import LoadingIndicator from './LoadingIndicator';
import PaginationControls from './PaginationControls';
import {Item} from "./types.ts";

const ITEMS_PER_PAGE = 50;

const ProductListPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [uniqueItems, setUniqueItems] = useState<Item[]>([]);

    const {data: idsData, error: idsError, refetch: refetchIds} = useGetIdsQuery({
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
    });

    const {data: itemsData, error: itemsError, refetch: refetchItems} = useGetItemsQuery({
        ids: idsData?.result || [],
    });

    useEffect(() => {
        if (idsError || itemsError) {
            console.error('Ошибка в API:', idsError || itemsError);
            refetchIds();
            refetchItems();
        }
    }, [idsError, itemsError, refetchIds, refetchItems]);

    useEffect(() => {
        setIsLoading(true);
    }, [currentPage]);

    useEffect(() => {
        if (itemsData && !itemsError) {
            const items = itemsData.result || [];
            const uniqueItems = Array.from(new Set(items.map(item => item.id))).map(id => items.find(item => item.id === id)!);
            setUniqueItems(uniqueItems);
            setIsLoading(false);
        }
    }, [itemsData, itemsError]);

    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div>
            {isLoading ? (
                <LoadingIndicator/>
            ) : (
                <>
                    <ProductList items={uniqueItems}/>
                    <PaginationControls
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                        currentPage={currentPage}
                    />
                </>
            )}
        </div>
    );
};


export default ProductListPage;
