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
    import H3 from '$lib/components/h3.svelte';

    const component = componentData['dice-ui']['stat'];
</script>

<ComponentDoc {component}>
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
        <H3 title="Variants" />
        Explore different indicator variants and color themes.
        <CodeAndPreview code={ExampleVariantsRaw}>
            <ExampleVariants />
        </CodeAndPreview>
        <H3 title="Layout Options" />
        Combine different stat components to create rich statistical displays.
        <CodeAndPreview code={ExampleLayoutOptionsRaw}>
            <ExampleLayoutOptions />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
