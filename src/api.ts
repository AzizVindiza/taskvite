// api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';
import { GetIdsParams, GetItemsParams, GetFieldsParams, FilterParams } from './types';

const baseURL = 'https://api.valantis.store:41000/';
const password = 'Valantis'; // Пароль для доступа к API

const generateXAuth = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Текущая дата UTC без разделителей
    return md5(`${password}_${timestamp}`);
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const xAuth = generateXAuth();
            headers.set('X-Auth', xAuth);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getIds: builder.query<string[], GetIdsParams>({
            query: ({ offset = 0, limit = 50 }) => `get_ids?offset=${offset}&limit=${limit}`,
        }),
        getItems: builder.query<any[], GetItemsParams>({
            query: ({ ids, offset = 0, limit = 50 }) => ({
                url: 'get_items',
                method: 'POST',
                body: { ids, offset, limit },
            }),
        }),
        getFields: builder.query<any[], GetFieldsParams>({
            query: ({ field, offset = 0, limit = 50 }) =>
                `get_fields?field=${field}&offset=${offset}&limit=${limit}`,
        }),
        filter: builder.query<string[], FilterParams>({
            query: (params) => ({
                url: 'filter',
                method: 'POST',
                body: { action: 'filter', params },
            }),
        }),
    }),
});
export const { useGetItemsQuery } = api;