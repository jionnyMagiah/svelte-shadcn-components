<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import BannerAction from '$lib/registry/components/kibo-ui/banner/banner-action.svelte';
    import BannerClose from '$lib/registry/components/kibo-ui/banner/banner-close.svelte';
    import BannerIcon from '$lib/registry/components/kibo-ui/banner/banner-icon.svelte';
    import BannerTitle from '$lib/registry/components/kibo-ui/banner/banner-title.svelte';
    import Banner from '$lib/registry/components/kibo-ui/banner/banner.svelte';
    import { CircleAlert } from '@lucide/svelte';

    const component = componentData['kibo-ui']['banner'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Kibo UI', url: resolve('/(docs)/components/kibo-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <Banner inset>
            <BannerIcon icon={CircleAlert} />
            <BannerTitle>Important message</BannerTitle>
            <BannerAction>Learn more</BannerAction>
            <BannerClose />
        </Banner>
    {/snippet}
</ComponentDoc>
