<script lang="ts">
    import Toc from '$lib/components/toc/toc.svelte';
    import type { TOCEntry } from '$lib/types.js';
    import { type Component, type ComponentProps } from 'svelte';
    import Metadata from '../metadata.svelte';
// import ContributorSection from "../contributors-section.svelte";
    import type { Groups, Sections } from '$lib/navigation';
    import { state } from '../state.svelte';
    import PageHeader from './page-header.svelte';

    let {
        component,
        componentProps = {},
        title,
        description,
        toc,
        metadata = {},
        group,
        section
    }: {
        component: Component;
        componentProps?: Record<string, unknown>;
        title: string;
        description?: string;
        toc: TOCEntry[];
        metadata?: ComponentProps<typeof Metadata>;
        group: Groups;
        section: Sections;
    } = $props();

    const PageComponent = $derived(component);

    $effect(() => {
        state.state.crumbs = { group, section, page: title };
    });
</script>

<Metadata {...metadata} {title} {description} />
<aside class="sticky">
    <div class="sticky top-24 hidden pl-16 xl:block">
        <Toc toc={{ items: toc }} />
    </div>
</aside>
<div class="mx-auto">
    <aside>
        <Toc toc={{ items: toc }} type="mobile" />
    </aside>
    <main
        class="mx-auto w-full max-w-160 min-w-0 pb-12 2xl:max-w-190"
        id="main-content"
    >
        <PageHeader {title} {description} />
        <PageComponent {...componentProps} />
    </main>
</div>
