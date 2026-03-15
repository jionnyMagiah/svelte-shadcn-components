<script lang="ts" module>
    export { default as a } from './a.svelte';
    export { default as code } from './code.svelte';
    export { default as h1 } from './h1.svelte';
    export { default as h2 } from './h2.svelte';
    export { default as h3 } from './h3.svelte';
    export { default as h4 } from './h4.svelte';
    export { default as li } from './li.svelte';
    export { default as p } from './p.svelte';
    export { default as pre } from './pre.svelte';
    export { default as table } from './table.svelte';
    export { default as td } from './td.svelte';
    export { default as th } from './th.svelte';
    export { default as tr } from './tr.svelte';
    export { default as thead } from './thead.svelte';
</script>

<script lang="ts">
    let {
        metadata,
        children
    }: {
        metadata: Record<string, unknown>;
        children: any;
    } = $props();
</script>

<article class="prose">
    {@render children?.()}
</article>
