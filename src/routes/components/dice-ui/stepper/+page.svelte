<script lang="ts">
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';
</script>

<ComponentDoc
    componentName="Stepper"
    shortDesc="A component that guides users through a multi-step process with clear visual progress indicators."
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
