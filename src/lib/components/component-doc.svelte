<script lang="ts">
    import { UseToc } from '$lib/hooks/toc.svelte';
    import type { Snippet } from 'svelte';
    import Toc from './toc.svelte';
    type Prop = {
        componentName: string;
        shortDesc: string;
        installation?: Snippet;
        layout?: Snippet;
        usage?: Snippet;
        apiReference?: Snippet;
        examples?: Snippet;
        features?: Snippet;
        preview?: Snippet;
    };
    let {
        componentName,
        shortDesc,
        installation,
        layout,
        usage,
        apiReference,
        examples,
        features,
        preview
    }: Prop = $props();

    const toc = new UseToc();
</script>

<div class="grid h-full overflow-hidden p-2 lg:grid-cols-[1fr_14rem] lg:gap-2">
    <div class="overflow-auto lg:mx-auto lg:w-[75%]" bind:this={toc.ref}>
        <h1 class="mb-4!">{componentName}</h1>
        <p class="text-lg text-muted-foreground">{shortDesc}</p>

        {@render preview?.()}

        <h2 id="installation">Installation</h2>
        {@render installation?.()}

        <h2 id="layout">Layout</h2>
        {@render layout?.()}

        <h2 id="usage">Usage</h2>
        {@render usage?.()}

        <h2 id="examples">Examples</h2>
        {@render examples?.()}

        <h2 id="features">Features</h2>
        {@render features?.()}

        <h2 id="api-reference">API Reference</h2>
        {@render apiReference?.()}
    </div>
    <div class="hidden h-full overflow-auto lg:block">
        <Toc toc={toc.current} />
    </div>
</div>
