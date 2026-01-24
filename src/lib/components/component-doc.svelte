<script lang="ts">
    import type { ResolvedPathname } from '$app/types';
    import { type ComponentData } from '$lib';
    import { UseToc } from '$lib/hooks/toc.svelte';
    import { state } from '$lib/state.svelte';
    import { ArrowUpRight } from '@lucide/svelte';
    import { onMount, type Snippet } from 'svelte';
    import Toc from './toc.svelte';
    import { badgeVariants } from './ui/badge/badge.svelte';
    import { autoId } from '$lib/attachments';
    type Prop = {
        component: ComponentData;
        installation?: Snippet;
        layout?: Snippet;
        usage?: Snippet;
        apiReference?: Snippet;
        examples?: Snippet;
        features?: Snippet;
        preview?: Snippet;
        other?: Snippet;
        setTitle?: boolean;
        crumbs?: { text: string; url?: ResolvedPathname }[];
    };
    let {
        component,
        installation,
        layout,
        usage,
        apiReference,
        examples,
        features,
        preview,
        other,
        setTitle = true,
        crumbs
    }: Prop = $props();

    const toc = new UseToc();

    onMount(() => {
        if (crumbs) {
            state.state.crumbs = crumbs;
        }
    });
</script>

<svelte:head>
    {#if setTitle}
        <title>{component.title}</title>
    {/if}
</svelte:head>

<div class="grid h-full overflow-hidden p-2 lg:grid-cols-[1fr_12rem] lg:gap-2">
    <div class="overflow-auto lg:mx-auto lg:w-[75%]" bind:this={toc.ref}>
        <h1 class="mb-4!">{component.title}</h1>
        <p class="text-lg text-muted-foreground">{component.desc}</p>

        {@render preview?.()}

        <h2 {@attach autoId}>Installation</h2>
        {@render installation?.()}

        <h2 {@attach autoId}>Layout</h2>
        {@render layout?.()}

        {#if usage}
            <h2 {@attach autoId}>Usage</h2>
            {@render usage?.()}
        {/if}

        <h2 {@attach autoId}>Examples</h2>
        {@render examples?.()}

        {@render other?.()}

        {#if component.credits}
            <h2 {@attach autoId}>Acknowledgements</h2>
            <p>
                This component takes inspiration from <a
                    href={component.credits.url}
                    target="_blank"
                    class="link"
                    >{component.credits.title}
                </a>.
            </p>
        {/if}

        <h2 {@attach autoId}>API Reference</h2>
        {@render apiReference?.()}

        <!-- todo: credit from component data -->

        {#if features}
            <h2 {@attach autoId}>Features</h2>
            {@render features?.()}
        {/if}
    </div>
    <div class="hidden h-full overflow-auto lg:block">
        <Toc toc={toc.current} />
    </div>
</div>
