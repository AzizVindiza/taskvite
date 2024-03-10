// types.ts

export type GetIdsParams = {
    offset?: number;
    limit?: number;
};

export type GetItemsParams = {
    ids: string[];
    offset?: number;
    limit?: number;
};


export type GetFieldsParams = {
    field: string;
    offset?: number;
    limit?: number;
};

export type FilterParams = {
    [key: string]: any;
};

export interface Item {
    id: string;
    brand: string | null;
    price: number;
    product: string;
}