<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import ExampleHiddenScrollbar from './example-hidden-scrollbar.svelte';
    import ExampleHiddenScrollbarRaw from './example-hidden-scrollbar.svelte?raw';
    import ExampleHorizontal from './example-horizontal.svelte';
    import ExampleHorizontalRaw from './example-horizontal.svelte?raw';
    import ExampleWithNavigation from './example-with-navigation.svelte';
    import ExampleWithNavigationRaw from './example-with-navigation.svelte?raw';
    import PreviewScoller from './scoller-preview.svelte';
    import PreviewScollerRaw from './scoller-preview.svelte?raw';
    import ScrollerLayout from './scroller-layout.svelte?raw';

    const component = componentData['dice-ui']['scoller'];
</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview code={PreviewScollerRaw}>
            <PreviewScoller />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={ScrollerLayout} lang="svelte" />
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>Horizontal Scroll</h3>
        Set the orientation to horizontal to enable horizontal scrolling.
        <CodeAndPreview code={ExampleHorizontalRaw}>
            <ExampleHorizontal />
        </CodeAndPreview>

        <h3 {@attach autoId}>Hidden Scrollbar</h3>
        Set the hideScrollbar to true to hide the scrollbar while maintaining scroll
        functionality.
        <CodeAndPreview code={ExampleHiddenScrollbarRaw}>
            <ExampleHiddenScrollbar />
        </CodeAndPreview>

        <h3 {@attach autoId}>Navigation Buttons</h3>
        Set the withNavigation to true to enable navigation buttons.
        <CodeAndPreview code={ExampleWithNavigationRaw}>
            <ExampleWithNavigation />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
