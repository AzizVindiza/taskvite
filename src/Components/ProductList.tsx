import React from 'react';
import ProductItem from './ProductItem.tsx';
import {Item} from '../types.ts';

interface ProductListProps {
    items: Item[];
}

const ProductList: React.FC<ProductListProps> = ({items}) => (
    <ul style={{display:"flex",justifyContent: "space-between",alignItems:"center",flexWrap: "wrap",padding: 20}}>
        {items.map((item: Item) => (
            <ProductItem key={item.id} item={item}/>
        ))}
    </ul>
);

export default ProductList;
