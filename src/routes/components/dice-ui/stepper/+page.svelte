<script lang="ts">
    import { dev } from '$app/environment';
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';
    const component = componentData['dice-ui']['stepper'];
</script>

{#if dev}
    <ComponentDoc {component}>
        {#snippet preview()}
            <CodeAndPreview code={PreviewRaw}>
                <Preview />
            </CodeAndPreview>
        {/snippet}
    </ComponentDoc>
{:else}
    Currently not working and under development
{/if}
