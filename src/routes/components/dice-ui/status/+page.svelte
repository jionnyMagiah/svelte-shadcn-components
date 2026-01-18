<script lang="ts">
    import { resolve } from '$app/paths';
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import type { PropDesc } from '$lib/components/display-prop.svelte';
    import DisplayProp from '$lib/components/display-prop.svelte';
    import H3 from '$lib/components/h3.svelte';
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
            desc: 'Use render delegation to render your own element. See Child Snippet docs for more information.'
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

<ComponentDoc {component}>
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
        <H3 title="Variants" />
        <p>
            Status supports five color variants to represent different states.
        </p>
        <CodeAndPreview code={ExampleVariantsRaw}>
            <ExampleVariants />
        </CodeAndPreview>

        <H3 title="Text Only" />
        <p>Use status without the indicator for a simpler appearance.</p>
        <CodeAndPreview code={ExampleTextOnlyRaw}>
            <ExampleTextOnly />
        </CodeAndPreview>

        <H3 title="Service Status List" />
        <p>
            Display multiple status items in a list format, ideal for system
            health dashboards.
        </p>
        <CodeAndPreview code={ExampleServiceListRaw}>
            <ExampleServiceList />
        </CodeAndPreview>
    {/snippet}

    {#snippet apiReference()}
        <H3 title="Status Root" />
        <p>
            The main container component that provides the badge-style wrapper
            with color variants.
            <DisplayProp props={statusRootProps} />
        </p>
        <H3 title="Status Indicator" />
        <p>An animated pulse indicator for the status.</p>

        <H3 title="Status IndiLabelcator" />
        <p>The text label for the status.</p>
    {/snippet}

    {#snippet features()}{/snippet}
</ComponentDoc>
