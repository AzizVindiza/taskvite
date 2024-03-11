// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import md5 from 'md5';
import { GetIdsParams, GetIdsResponse, GetItemsParams, GetItemsResponse, GetFieldsParams, GetFieldsResponse, FilterParams, FilterResponse } from '../types.ts';

const baseURL = 'https://api.valantis.store:41000/';
const password = 'Valantis';

const generateXAuth = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
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
        getIds: builder.query<GetIdsResponse, GetIdsParams>({
            query: ({ offset = 0, limit = 50 }) => ({
                url: '',
                method: 'POST',
                body: {
                    action: 'get_ids',
                    params: { offset, limit },
                },
            }),
        }),
        getItems: builder.query<GetItemsResponse, GetItemsParams>({
            query: ({ ids }) => ({
                url: '',
                method: 'POST',
                body: {
                    action: 'get_items',
                    params: { ids },
                },
            }),
        }),
        getFields: builder.query<GetFieldsResponse, GetFieldsParams>({
            query: ({ field, offset = 0, limit = 50 }) => ({
                url: '',
                method: 'POST',
                body: {
                    action: 'get_fields',
                    params: { field, offset, limit },
                },
            }),
        }),
        filter: builder.query<FilterResponse, FilterParams>({
            query: (params) => ({
                url: '',
                method: 'POST',
                body: {
                    action: 'filter',
                    params,
                },
            }),
        }),
    }),
});

export const { useGetIdsQuery, useGetItemsQuery, useGetFieldsQuery, useFilterQuery } = api;
