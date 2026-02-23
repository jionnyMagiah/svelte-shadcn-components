<script lang="ts">
    import { page } from '$app/stores';
    import { siteConfig } from './site-config';

    let {
        title = siteConfig.name,
        ogImage = siteConfig.ogImage,
        description = siteConfig.description,
        keywords = siteConfig.keywords
    }: {
        title?: string;
        ogImage?: (typeof siteConfig)['ogImage'];
        description?: string;
        keywords?: string[];
    } = $props();

    const trueTitle = $derived(
        title === siteConfig.name
            ? siteConfig.name
            : `${title} - ${siteConfig.name}`
    );
</script>

<svelte:head>
    <title>{trueTitle}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords?.join(',')} />
    <meta name="author" content="jionnyMagiah" />
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta
        property="og:url"
        content={siteConfig.url + $page.url.pathname}
    />
    <meta property="og:image" content={ogImage?.url} />
    <meta property="og:image:alt" content={title} />
    <meta property="og:image:width" content={ogImage?.width} />
    <meta property="og:image:height" content={ogImage?.height} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={siteConfig.name} />
    <meta property="og:locale" content="EN_US" />
</svelte:head>
