<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { link } from '$lib/components/link.svelte';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
    import ExampleControlled from './example-controlled.svelte';
    import ExampleControlledRaw from './example-controlled.svelte?raw';
    import ExampleCustomization from './example-customization.svelte';
    import ExampleCustomizationRaw from './example-customization.svelte?raw';
    import ExampleVertical from './example-vertical.svelte';
    import ExampleVerticalRaw from './example-vertical.svelte?raw';
    import LayoutCompareSlider from './layout-compare-slider.svelte?raw';
    import PreviewCompareSlider from './preview-compare-slider.svelte';
    import PreviewCompareSliderRaw from './preview-compare-slider.svelte?raw';
    import UsageCustomContent from './usage-custom-content.svelte';
    import UsageVertical from './usage-vertical.svelte';

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

    {#snippet accessibility()}
        <h3 {@attach autoId}>Keyboard Interactions</h3>
        <KeyboardNavigation
            interactions={[
                {
                    keys: ['Tab'],
                    desc: 'Moves focus to the slider.'
                },
                {
                    keys: ['Shift + Tab'],
                    desc: 'Moves focus away from the slider to the previous focusable element.'
                },
                {
                    keys: ['ArrowLeft', 'ArrowUp'],
                    desc: 'Moves the slider position left (or up in vertical mode) by the step amount.'
                },
                {
                    keys: ['ArrowRight', 'ArrowDown'],
                    desc: 'Moves the slider position right (or down in vertical mode) by the step amount.'
                },
                {
                    keys: ['PageUp'],
                    desc: 'Moves the slider position left (or up in vertical mode) by ten steps.'
                },
                {
                    keys: ['PageDown'],
                    desc: 'Moves the slider position right (or down in vertical mode) by ten steps.'
                },
                {
                    keys: ['Shift + ArrowLeft', 'Shift + ArrowUp'],
                    desc: 'Moves the slider position left (or up in vertical mode) by ten steps.'
                },
                {
                    keys: ['Shift + ArrowRight', 'Shift + ArrowDown'],
                    desc: 'Moves the slider position right (or down in vertical mode) by ten steps.'
                },
                {
                    keys: ['Home'],
                    desc: 'Moves the slider to the minimum position (0%).'
                },
                {
                    keys: ['End'],
                    desc: 'Moves the slider to the maximum position (100%).'
                }
            ]}
        />

        <h3 {@attach autoId}>Mouse and Touch Interactions</h3>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                <strong>Drag</strong>: Click and drag the handle to adjust the
                comparison position
            </li>
            <li class="my-2">
                <strong>Click</strong>: Click anywhere on the slider container
                to jump to that position
            </li>
            <li class="my-2">
                <strong>Touch</strong>: Full touch support for mobile devices
            </li>
        </ul>
    {/snippet}

    {#snippet other()}
        <h2 {@attach autoId}>Advanced Usage</h2>
        <h3 {@attach autoId}>Custom Content Type</h3>
        <p>
            The compare slider works with any Svelte content, not just images:
        </p>
        <CodeBlock
            code={(await import('./usage-custom-content.svelte?raw')).default}
        />
        <h3 {@attach autoId}>Vertical Orientation Layout</h3>

        <p>
            Use vertical orientation for comparing content that works better in
            a vertical layout. The slider handle moves vertically, and the
            "before" content appears on top while "after" content appears on
            bottom.
        </p>
        <CodeBlock
            code={(await import('./usage-vertical.svelte?raw')).default}
        />

        <h3 {@attach autoId}>Custom Labels</h3>
        <p>
            Add custom labels to identify each side with the <code>label</code>
            prop, or use the <code>CompareSliderLabel</code> component for more control.
        </p>
        <CodeBlock
            code={(await import('./usage-custom-label.svelte?raw')).default}
        />
    {/snippet}
</ComponentDoc>
