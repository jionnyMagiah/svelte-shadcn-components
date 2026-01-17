<script lang="ts">
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import StatPreview from './stat-preview.svelte';
    import StatPreviewRaw from './stat-preview.svelte?raw';
    import LayoutRaw from './stat-layout.svelte?raw';
    import ExampleVariants from './example-variants.svelte';
    import ExampleVariantsRaw from './example-variants.svelte?raw';
    import ExampleLayoutOptions from './example-layout-options.svelte';
    import ExampleLayoutOptionsRaw from './example-layout-options.svelte?raw';

    const component = componentData['dice-ui']['stat'];
</script>

<ComponentDoc componentName={component.title} shortDesc={component.desc}>
    {#snippet preview()}
        <CodeAndPreview code={StatPreviewRaw}>
            <StatPreview />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        Import the parts, and compose them together.
        <CodeBlock code={LayoutRaw} lang="svelte" />
    {/snippet}

    {#snippet examples()}
        <h3>Variants</h3>
        Explore different indicator variants and color themes.
        <CodeAndPreview code={ExampleVariantsRaw}>
            <ExampleVariants />
        </CodeAndPreview>

        <h3>Layout Options</h3>
        Combine different stat components to create rich statistical displays.
        <CodeAndPreview code={ExampleLayoutOptionsRaw}>
            <ExampleLayoutOptions />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
