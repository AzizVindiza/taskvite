import React from 'react';
import {Item} from './types';

const ProductItem: React.FC<{ item: Item }> = ({item}) => (
    <li>
        <div>ID: {item.id}</div>
        <div>Название: {item.product}</div>
        <div>Бренд: {item.brand || 'Неизвестно'}</div>
        <div>Цена: {item.price}</div>
    </li>
);

export default ProductItem;
