import { getDoc } from '$lib/doc-utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    console.log(params.slug);
    
    return await getDoc(params.slug);
};
