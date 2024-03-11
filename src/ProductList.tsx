import React from 'react';
import ProductItem from './ProductItem';
import {Item} from './types';

interface ProductListProps {
    items: Item[];
}

const ProductList: React.FC<ProductListProps> = ({items}) => (
    <ul>
        {items.map((item: Item) => (
            <ProductItem key={item.id} item={item}/>
        ))}
    </ul>
);

export default ProductList;
