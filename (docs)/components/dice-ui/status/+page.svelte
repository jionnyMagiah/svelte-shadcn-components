<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import type { PropDesc } from '$lib/components/display-prop.svelte';
    import DisplayProp from '$lib/components/display-prop.svelte';
    import ExampleServiceList from './example-service-list.svelte';
    import ExampleServiceListRaw from './example-service-list.svelte?raw';
    import ExampleTextOnly from './example-text-only.svelte';
    import ExampleTextOnlyRaw from './example-text-only.svelte?raw';
    import ExampleVariants from './example-variants.svelte';
    import ExampleVariantsRaw from './example-variants.svelte?raw';
    import LayoutStatus from './layout-status.svelte?raw';
    import PreviewStatus from './preview-status.svelte';
    import PreviewStatusRaw from './preview-status.svelte?raw';

    const component = componentData['dice-ui']['status'];
    const statusRootProps: PropDesc[] = [
        {
            name: 'child',
            type: 'Snippet | undefined',
            default: 'undefined',
            bindable: true,
            desc: 'Use render delegation to render your own element. See Bits UI Child Snippet docs for more information.'
        },
        {
            name: 'children',
            desc: 'The children content to render.',
            type: 'Snippet'
        },
        {
            name: 'variant',
            desc: 'The visual style and color theme of the status badge.',
            type: '"default" | "success" | "error" | "warning" | "info" | undefined',
            default: '"default"'
        }
    ];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewStatusRaw}>
            <PreviewStatus />
        </CodeAndPreview>
    {/snippet}

    {#snippet installation()}{/snippet}

    {#snippet layout()}
        <p>Import the parts, and compose them together.</p>
        <CodeBlock code={LayoutStatus} />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Variants</h3>
        <p>
            Status supports five color variants to represent different states.
        </p>
        <CodeAndPreview code={ExampleVariantsRaw}>
            <ExampleVariants />
        </CodeAndPreview>

        <h3 {@attach autoId}>Text Only</h3>
        <p>Use status without the indicator for a simpler appearance.</p>
        <CodeAndPreview code={ExampleTextOnlyRaw}>
            <ExampleTextOnly />
        </CodeAndPreview>

        <h3 {@attach autoId}>Service Status List</h3>
        <p>
            Display multiple status items in a list format, ideal for system
            health dashboards.
        </p>
        <CodeAndPreview code={ExampleServiceListRaw}>
            <ExampleServiceList />
        </CodeAndPreview>
    {/snippet}

    {#snippet apiReference()}
        <h3 {@attach autoId}>Status Root</h3>
        <p>
            The main container component that provides the badge-style wrapper
            with color variants.
            <DisplayProp props={statusRootProps} />
        </p>
        <h3 {@attach autoId}>Status Indicator</h3>
        <p>An animated pulse indicator for the status.</p>
        <DisplayProp props={[]} />

        <h3 {@attach autoId}>Status Label</h3>
        <p>The text label for the status.</p>
        <DisplayProp props={[]} />
    {/snippet}

    {#snippet accessibility()}
        <p>
            The Status component uses semantic HTML and follows best practices
            for accessibility:
        </p>
        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                Uses <code>div</code> elements with proper ARIA attributes when needed
            </li>
            <li class="my-2">
                Color is not the only means of conveying information—always
                include text labels
            </li>
            <li class="my-2">
                Supports keyboard navigation when used with interactive elements
                via <code>child</code> snippet
            </li>
        </ul>
    {/snippet}

    {#snippet notes()}
        <h2 {@attach autoId}>Notes</h2>

        <ul class="mx-4 list-inside list-disc">
            <li class="my-2">
                The animated ping effect uses Tailwind's built-in <code
                    >animate-ping</code
                >
                utility for smooth performance
            </li>
            <li class="my-2">Colors automatically adapt to dark mode</li>
            <li class="my-2">
                The indicator animation runs continuously to draw attention to
                live status changes
            </li>
            <li class="my-2">
                Use the <code>child</code> snippet to render Status as a link or button
                for interactive use cases
            </li>
        </ul>
    {/snippet}
</ComponentDoc>
