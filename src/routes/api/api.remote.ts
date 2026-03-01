import { query } from '$app/server';
import data from './code-preview.json' assert { type: 'json' };
import search from './search.json' assert { type: 'json' };
import props from './props.json' assert { type: 'json' };

export const getSearch = query(async () => {
    return search.filter((s) => s.group !== 'index');
});

export const getCodepreview = query(async () => {
    return data;
});

export const getProps = query(async () => {
    return props;
});
