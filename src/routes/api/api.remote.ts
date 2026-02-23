import { query } from '$app/server';
import data from './code-preview.json' assert { type: 'json' };
import search from './search.json' assert { type: 'json' };

export const getSearch = query(async () => {
    return search;
});

export const getCodepreview = query(async () => {
    return data;
});
