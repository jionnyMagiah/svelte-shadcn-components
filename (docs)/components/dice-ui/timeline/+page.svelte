<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import layoutRaw from './component-layout.svelte?raw';
    import ExampleAlternate from './example-alternate.svelte';
    import ExampleAlternateRaw from './example-alternate.svelte?raw';
    import ExampleCustomDots from './example-custom-dots.svelte';
    import ExampleCustomDotsRaw from './example-custom-dots.svelte?raw';
    import ExampleHorizontalAlternate from './example-horizontal-alternate.svelte';
    import ExampleHorizontalAlternateRaw from './example-horizontal-alternate.svelte?raw';
    import ExampleHorizontal from './example-horizontal.svelte';
    import ExampleHorizontalRaw from './example-horizontal.svelte?raw';
    import ExampleRtl from './example-rtl.svelte';
    import ExampleRtlRaw from './example-rtl.svelte?raw';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';

    const component = componentData['dice-ui']['timeline'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Horizontal Timeline</h3>
        Display timeline events horizontally across the screen.
        <CodeAndPreview code={ExampleHorizontalRaw}>
            <ExampleHorizontal />
        </CodeAndPreview>

        <h3 {@attach autoId}>RTL Timeline</h3>
        Display timeline with right-to-left layout for RTL languages.
        <CodeAndPreview code={ExampleRtlRaw}>
            <ExampleRtl />
        </CodeAndPreview>

        <h3 {@attach autoId}>Alternate Timeline</h3>
        Display timeline events in an alternating pattern with content on both sides.
        <CodeAndPreview code={ExampleAlternateRaw}>
            <ExampleAlternate />
        </CodeAndPreview>

        <h3 {@attach autoId}>Horizontal Alternate Timeline</h3>
        Display timeline with right-to-left layout for RTL languages.
        <CodeAndPreview code={ExampleHorizontalAlternateRaw}>
            <ExampleHorizontalAlternate />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Custom Dots</h3>
        Add custom icons or content to the timeline dots using CSS variables.
        <CodeAndPreview code={ExampleCustomDotsRaw}>
            <ExampleCustomDots />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock lang="svelte" code={layoutRaw} />
    {/snippet}
</ComponentDoc>
