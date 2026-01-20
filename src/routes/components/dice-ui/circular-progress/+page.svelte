<script lang="ts">
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import H3 from '$lib/components/h3.svelte';
    import CircularProgressLayout from './circular-progress-layout.svelte?raw';
    import CircularProgressPreview from './circular-progress-preview.svelte';
    import CircularProgressPreviewRaw from './circular-progress-preview.svelte?raw';
    import ExampleInteractive from './example-interactive.svelte';
    import ExampleInteractiveRaw from './example-interactive.svelte?raw';
    import LayoutCombined from './layout-combined.svelte?raw';
    import animations from './animations.css?raw';
    import ExampleColors from './example-colors.svelte';
    import { autoId } from '$lib/attachments';
    import ExampleColorsRaw from './example-colors.svelte?raw';
    import { resolve } from '$app/paths';
    import { page } from '$app/state';

    const component = componentData['dice-ui']['circular-progress'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={CircularProgressPreviewRaw}>
            <CircularProgressPreview />
        </CodeAndPreview>
    {/snippet}

    {#snippet installation()}
        <h3 {@attach autoId}>Animations</h3>

        <p>
            Add the animations to your base css file (es <code>layout.css</code
            >)
        </p>
        <CodeBlock lang="css" code={animations} />
    {/snippet}

    {#snippet layout()}
        Import the parts and compose them together.
        <CodeBlock lang="svelte" code={CircularProgressLayout} />
        Or use the Combined component to get all the parts in one.
        <CodeBlock lang="svelte" code={LayoutCombined} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Interactive Demo</h3>
        A circular progress with interactive controls and simulated upload progress.
        <CodeAndPreview code={ExampleInteractiveRaw}>
            <ExampleInteractive />
        </CodeAndPreview>
        <h3 {@attach autoId}>Colors</h3>
        <p>
            Different color themes using Tailwind CSS stroke and text utilities
            to customize the track, range, and value text colors.
        </p>
        <!-- todo: add animations like in original example from dice ui -->
        <CodeAndPreview code={ExampleColorsRaw}>
            <ExampleColors />
        </CodeAndPreview>
    {/snippet}

    {#snippet other()}
        <h2 id="theming">Theming</h2>
        <p>
            The circular progress component uses CSS <code>currentColor</code> for
            stroke colors, making it easy to theme using Tailwind's text or stroke
            utilities:
        </p>
        <h3 {@attach autoId}>Track Theming</h3>
        <CodeBlock
            code={'<CircularProgressTrack className="text-green-200 dark:text-green-900" />'}
        />
        <h3 {@attach autoId}>Range Theming</h3>
        <CodeBlock
            code={'<CircularProgressRange className="text-green-500" />'}
        />
        <h3 {@attach autoId}>Value Text Theming</h3>
        <CodeBlock
            code={'<CircularProgressValueText className="text-green-700 dark:text-green-300" />'}
        />
        <h3 {@attach autoId}>Custom Stroke Styles</h3>
        You can also use Tailwind's stroke utilities directly:
        <CodeBlock
            code={`<CircularProgressTrack className="stroke-blue-200" />
<CircularProgressRange className="stroke-blue-500" />`}
        />
    {/snippet}
</ComponentDoc>
