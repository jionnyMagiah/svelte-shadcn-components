<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import ExampleControlled from './example-controlled.svelte';
    import ExampleControlledRaw from './example-controlled.svelte?raw';
    import ExampleCustomization from './example-customization.svelte';
    import ExampleCustomizationRaw from './example-customization.svelte?raw';
    import ExampleVertical from './example-vertical.svelte';
    import ExampleVerticalRaw from './example-vertical.svelte?raw';
    import LayoutCompareSlider from './layout-compare-slider.svelte?raw';
    import PreviewCompareSlider from './preview-compare-slider.svelte';
    import PreviewCompareSliderRaw from './preview-compare-slider.svelte?raw';

    const component = componentData['dice-ui']['compare-slider'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewCompareSliderRaw}>
            <PreviewCompareSlider />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={LayoutCompareSlider} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Controlled State</h3>
        <p>A compare slider with external controls for the slider position.</p>
        <CodeAndPreview code={ExampleControlledRaw}>
            <ExampleControlled />
        </CodeAndPreview>

        <h3 {@attach autoId}>Vertical Orientation</h3>
        <p>
            A compare slider with vertical orientation, perfect for comparing
            tall images or content.
        </p>
        <CodeAndPreview code={ExampleVerticalRaw}>
            <ExampleVertical />
        </CodeAndPreview>

        <h3 {@attach autoId}>Customization</h3>
        <p>
            Compare slider with custom handle, labels, and vertical orientation.
        </p>
        <CodeAndPreview code={ExampleCustomizationRaw}>
            <ExampleCustomization />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
