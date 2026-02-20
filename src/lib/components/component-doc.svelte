<script lang="ts">
    import type { ResolvedPathname } from '$app/types';
    import { type ComponentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import { state } from '../state.svelte';
    import { onMount, type Snippet } from 'svelte';
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
        accessibility?: Snippet;
        notes?: Snippet;
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
        accessibility,
        notes,
        setTitle = true,
        crumbs
    }: Prop = $props();

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

<div class="overflow-auto pb-8">
    <h1 class="mb-4!">{component.title}</h1>
    <p class="text-lg text-muted-foreground">{component.desc}</p>

    {@render preview?.()}

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

    <h2 {@attach autoId}>Installation</h2>
    {@render installation?.()}

    {#if layout}
        <h2 {@attach autoId}>Layout</h2>
        {@render layout?.()}
    {/if}

    {#if usage}
        <h2 {@attach autoId}>Usage</h2>
        {@render usage?.()}
    {/if}

    <h2 {@attach autoId}>Examples</h2>
    {@render examples?.()}

    {@render other?.()}

    <h2 {@attach autoId}>API Reference</h2>
    {@render apiReference?.()}

    {#if features}
        <h2 {@attach autoId}>Features</h2>
        {@render features?.()}
    {/if}

    {#if accessibility}
        <h2 {@attach autoId}>Accessibility</h2>
        {@render accessibility?.()}
    {/if}

    {#if notes}
        {@render notes?.()}
    {/if}
</div>
