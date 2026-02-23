import { getDoc } from '$lib/doc-utils';

export async function load() {
    return await getDoc();
}
