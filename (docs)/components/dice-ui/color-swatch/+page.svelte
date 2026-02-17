<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import ExampleSize from './example-size.svelte';
    import ExampleSizeRaw from './example-size.svelte?raw';
    import ExampleTransparency from './example-transparency.svelte';
    import ExampleTransparencyRaw from './example-transparency.svelte?raw';
    import PreviewColorSwatch from './preview-color-swatch.svelte';
    import PreviewColorSwatchRaw from './preview-color-swatch.svelte?raw';
    import UsageColorSwatchRaw from './usage-color-swatch.svelte?raw';

    const component = componentData['dice-ui']['color-swatch'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewColorSwatchRaw}>
            <PreviewColorSwatch />
        </CodeAndPreview>
    {/snippet}

    {#snippet usage()}
        <p>Import the component and use it to display color values.</p>
        <CodeBlock code={UsageColorSwatchRaw} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Different Sizes</h3>
        <p>
            The color swatch component supports three different sizes: <code
                >sm</code
            >, <code>default</code>, and <code>lg</code>.
        </p>

        <CodeAndPreview code={ExampleSizeRaw}>
            <ExampleSize />
        </CodeAndPreview>

        <h3 {@attach autoId}>Transparency Support</h3>
        <p>
            The color swatch automatically detects transparent colors and
            displays them with a checkerboard background pattern.
        </p>

        <CodeAndPreview code={ExampleTransparencyRaw}>
            <ExampleTransparency />
        </CodeAndPreview>
    {/snippet}

    {#snippet accessibility()}
        <p>
            The color swatch component includes proper accessibility features:
        </p>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                ARIA Label: Automatically generates descriptive <code
                    >aria-label</code
                > text based on the color value
            </li>
            <li class="my-2">
                Role: Uses <code>role="img"</code> to indicate it's an image representation
                of a color
            </li>
            <li class="my-2">
                Disabled State: Properly handles disabled state with appropriate
                visual and interaction changes
            </li>
        </ul>

        <h3 {@attach autoId}>Screen Reader Support</h3>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                When a color value is provided, the <code>aria-label</code> reads
                "Color swatch: [color-value]"
            </li>
            <li class="my-2">
                When no color is selected, the <code>aria-label</code> reads "No color
                selected"
            </li>
        </ul>
    {/snippet}

    {#snippet notes()}
        <h2 {@attach autoId}>Color Format Support</h2>
        <p>The color swatch component supports various color formats:</p>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">HEX: <code>#3b82f6</code></li>
            <li class="my-2">RGB: <code>rgb(59, 130, 246)</code></li>
            <li class="my-2">RGBA: <code>rgba(59, 130, 246, 0.5)</code></li>
            <li class="my-2">HSL: <code>hsl(217, 91%, 60%)</code></li>
            <li class="my-2">HSLA: <code>hsla(217, 91%, 60%, 0.5)</code></li>
            <li class="my-2">Named Colors: <code>blue, red, etc.</code></li>
        </ul>

        <h2 {@attach autoId}>Transparency Detection</h2>
        <p>
            The component automatically detects transparent colors by checking
            for:
        </p>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                <code>rgba()</code> or <code>hsla()</code> function notation
            </li>
            <li class="my-2">RGB/HSL with 4 values (including alpha)</li>
            <li class="my-2">
                Any color format that includes transparency information
            </li>
        </ul>
        <p>
            When transparency is detected, a checkerboard pattern is displayed
            behind the color to show the transparency effect. Use the <code
                >withoutTransparency</code
            > prop to disable this behavior.
        </p>
    {/snippet}
</ComponentDoc>
