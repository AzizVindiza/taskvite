import React, { useState, useEffect } from 'react';
import { useFilterQuery, useGetItemsQuery } from '../services/api.ts';
import ProductList from '../Components/ProductList.tsx';
import LoadingIndicator from '../Components/LoadingIndicator.tsx';
import { Item } from "../types.ts";

interface ProductSearchProps {
    object: { [key: string]: any };
}

const ProductSearch: React.FC<ProductSearchProps> = ({ object }) => {
    const [uniqueItems, setUniqueItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);

    const { data: idsData, error: idsError,isLoading: idsLoad, refetch: refetchIds } = useFilterQuery(object);

    const { data: itemsData, error: itemsError, isLoading: itemsLoad, refetch: refetchItems } = useGetItemsQuery({
        ids: idsData?.result || [],
    });

    useEffect(() => {
        if (idsError || itemsError) {
            console.error('Ошибка в API:', idsError || itemsError);
            setError('Ошибка в API');
            refetchIds();
            refetchItems();
        }
    }, [idsError, itemsError, refetchIds, refetchItems]);



    useEffect(() => {
        if (itemsData && !itemsError) {
            const items = itemsData.result || [];
            const uniqueItems = Array.from(new Set(items.map(item => item.id))).map(id => items.find(item => item.id === id)!);
            setUniqueItems(uniqueItems);
        }
    }, [itemsData, itemsError]);

    return (
        <div>
            {error && <p>Ошибка: {error}</p>}
            {(idsLoad || itemsLoad) ? <LoadingIndicator /> : <ProductList items={uniqueItems} />}
        </div>
    );
};

export default ProductSearch;
