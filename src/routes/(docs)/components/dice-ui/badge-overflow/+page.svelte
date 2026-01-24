<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import H3 from '$lib/components/h3.svelte';
    import ExampleInteractive from './example-interactive.svelte';
    import ExampleInteractiveRaw from './example-interactive.svelte?raw';
    import ExampleMultiline from './example-multiline.svelte';
    import ExampleMultilineRaw from './example-multiline.svelte?raw';
    import LayoutBadge from './layout-badge.svelte?raw';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';

    const component = componentData['dice-ui']['badge-overflow'];
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

    {#snippet layout()}
        <CodeBlock code={LayoutBadge} />
    {/snippet}

    {#snippet usage()}
        <h3 {@attach autoId}>With Primitive Arrays</h3>
        <p>
            When using primitive arrays (strings, numbers), the <code
                >getBadgeLabel</code
            > prop is optional. The component will automatically use the item itself
            as the label.
        </p>
        <CodeBlock
            code={`<BadgeOverflow items={['React', 'TypeScript', 'Next.js']}>
    {#snippet renderBadge(item: string, label: string)}
        <Badge variant="default">{label}</Badge>
    {/snippet}
</BadgeOverflow>
`}
        ></CodeBlock>

        <H3 title={'With Object Arrays'} />
        <p>
            When using object arrays, the <code>getBadgeLabel</code> prop is required
            to extract the label from each item.
        </p>
        <CodeBlock
            code={`<BadgeOverflow
    items={[
        { id: 1, name: 'React' },
        { id: 2, name: 'TypeScript' }
    ]}
    getBadgeLabel={(item) => item.name}
>
    {#snippet renderBadge(item, label)}
        <Badge variant="default">{label}</Badge>
    {/snippet}
</BadgeOverflow>`}
        />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Multi-line Overflow</h3>
        <p>Display badges across multiple lines using the lineCount prop.</p>

        <CodeAndPreview code={ExampleMultilineRaw}>
            <ExampleMultiline />
        </CodeAndPreview>

        <h3 {@attach autoId}>Interactive Tags</h3>
        <p>
            Tags Interactive demo showing how to add and remove tags with
            overflow handling.
        </p>
        <CodeAndPreview code={ExampleInteractiveRaw}>
            <ExampleInteractive />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
