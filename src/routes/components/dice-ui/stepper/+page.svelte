<script lang="ts">
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';
    const component = componentData['dice-ui']['stepper'];
</script>

<ComponentDoc componentName={component.title} shortDesc={component.desc}>
    {#snippet preview()}
        <CodeAndPreview code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
