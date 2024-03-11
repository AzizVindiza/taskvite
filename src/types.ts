// types.ts
export interface GetIdsParams {
    offset?: number;
    limit?: number;
}

export interface GetIdsResponse {
    result: string[];
}

export interface GetItemsParams {
    ids: string[];
}

export interface Item {
    id: string;
    brand: string | null;
    price: number;
    product: string;
}

export interface GetItemsResponse {
    result: Item[];
}

export interface GetFieldsParams {
    field: string;
    offset?: number;
    limit?: number;
}

export interface GetFieldsResponse {
    result: (string | null)[];
}

export interface FilterParams {
    [key: string]: any;
}

export interface FilterResponse {
    result: string[];
}
