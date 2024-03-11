import React from 'react';
import { Item } from '../types.ts';
import { Card } from 'antd';

const { Meta } = Card;

const ProductItem: React.FC<{ item: Item }> = ({ item }) => (
    <Card style={{ width: "30%", marginTop: 16 }} loading={false}>
        <Meta
            title={item.product}
            description={
                <>
                    <div>ID: {item.id}</div>
                    <div>Бренд: {item.brand || 'Неизвестно'}</div>
                    <div>Цена: {item.price}</div>
                </>
            }
        />
    </Card>
);

export default ProductItem;
