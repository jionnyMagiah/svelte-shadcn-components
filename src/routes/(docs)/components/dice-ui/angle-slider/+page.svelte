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
    import ExampleForm from './example-form.svelte';
    import ExampleFormRaw from './example-form.svelte?raw';
    import ExampleRange from './example-range.svelte';
    import ExampleRangeRaw from './example-range.svelte?raw';
    import ExampleThemes from './example-themes.svelte';
    import ExampleThemesRaw from './example-themes.svelte?raw';
    import LayoutSlider from './layout-slider.svelte?raw';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';

    const component = componentData['dice-ui']['angle-slider'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Components', url: resolve('/components/') },
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <p>Import the parts and compose them together.</p>
        <CodeBlock code={LayoutSlider} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Controlled State</h3>
        <p>A slider with controlled state management and custom actions.</p>
        <CodeAndPreview code={ExampleControlledRaw}>
            <ExampleControlled />
        </CodeAndPreview>

        <h3 {@attach autoId}>Range Selection</h3>
        <p>
            Use multiple thumbs to create angle ranges with minimum step
            constraints.
        </p>
        <CodeAndPreview code={ExampleRangeRaw}>
            <ExampleRange />
        </CodeAndPreview>

        <h3 {@attach autoId}>Themes</h3>
        <p>Slider variants with different themes.</p>
        <CodeAndPreview code={ExampleThemesRaw}>
            <ExampleThemes />
        </CodeAndPreview>

        <h3 {@attach autoId}>With Form</h3>
        <p>Integrate the angle slider with form validation and submission.</p>
        <CodeAndPreview code={ExampleFormRaw}>
            <ExampleForm />
        </CodeAndPreview>
    {/snippet}

    {#snippet other()}
        <h2 id="theming">Theming</h2>
        <p>
            You can customize the appearance by targeting specific components:
        </p>
        <h3 {@attach autoId}>Track Theming</h3>
        <p>
            Use <code>[&>[data-slot='angle-slider-track-rail']]</code> to style the
            background track:
        </p>
        <CodeBlock
            code="<AngleSliderTrack className=&quot;*:data-[slot='angle-slider-track-rail']:stroke-green-100&quot; />"
        />
        <h3 {@attach autoId}>Range Theming</h3>
        <CodeBlock
            code="<AngleSliderRange className=&quot;stroke-green-500&quot; />"
        />
        <h3 {@attach autoId}>Thumb Theming</h3>
        <CodeBlock
            code="<AngleSliderThumb className=&quot;border-green-500 bg-green-50 ring-green-500/50&quot; />"
        />
        <h3 {@attach autoId}>Value Theming</h3>
        You can also use Tailwind's stroke utilities directly:
        <CodeBlock
            code="<AngleSliderValue className=&quot;text-green-600 dark:text-green-400&quot; />"
        />
    {/snippet}
</ComponentDoc>
