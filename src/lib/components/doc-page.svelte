<script lang="ts">
    import Toc from '$lib/components/toc/toc.svelte';
    import { onMount, type Component, type ComponentProps } from 'svelte';
    import type { Contributor, TOCEntry } from '$lib/types.js';
    import Metadata from '../metadata.svelte';
    // import ContributorSection from "../contributors-section.svelte";
    import PageHeader from './page-header.svelte';
    import { state } from '../state.svelte';
    import type { Groups, Sections } from '$lib/navigation';

    let {
        component,
        componentProps = {},
        title,
        description,
        toc,
        metadata = {},
        contributors = [],
        group,
        section
    }: {
        component: Component;
        componentProps?: Record<string, unknown>;
        title: string;
        description?: string;
        toc: TOCEntry[];
        metadata?: ComponentProps<typeof Metadata>;
        contributors?: Contributor[];
        group: Groups;
        section: Sections;
    } = $props();

    const PageComponent = $derived(component);
    const tocItems = $derived(
        contributors.length
            ? [...toc, { title: 'Contributors', url: '#contributors' }]
            : toc
    );

    $effect(() => {
        state.state.crumbs = { group, section, page: title };
    });
</script>

<Metadata {...metadata} {title} {description} />
<aside class="sticky">
    <div class="sticky top-24 hidden pl-16 xl:block">
        <Toc toc={{ items: tocItems }} />
    </div>
</aside>
<div class="mx-auto">
    <aside>
        <Toc toc={{ items: tocItems }} type="mobile" />
    </aside>
    <main
        class="mx-auto w-full max-w-[640px] min-w-0 pb-12 2xl:max-w-[760px]"
        id="main-content"
    >
        <PageHeader {title} {description} />
        <PageComponent {...componentProps} />
        <!-- 
		<ContributorSection {contributors} /> -->
    </main>
</div>
