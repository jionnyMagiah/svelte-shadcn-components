<script lang="ts">
    import { componentData } from '$lib';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import PreviewScoller from './scoller-preview.svelte';
    import PreviewScollerRaw from './scoller-preview.svelte?raw';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ScrollerLayout from './scroller-layout.svelte?raw';
    import H3 from '$lib/components/h3.svelte';
    import ExampleHorizontal from './example-horizontal.svelte';
    import ExampleHorizontalRaw from './example-horizontal.svelte?raw';
    import ExampleHiddenScrollbar from './example-hidden-scrollbar.svelte';
    import ExampleHiddenScrollbarRaw from './example-hidden-scrollbar.svelte?raw';
    import ExampleWithNavigation from './example-with-navigation.svelte';
    import ExampleWithNavigationRaw from './example-with-navigation.svelte?raw';

    const component = componentData['dice-ui']['scoller'];
</script>

<ComponentDoc {component}>
    {#snippet preview()}
        <CodeAndPreview code={PreviewScollerRaw}>
            <PreviewScoller />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock code={ScrollerLayout} lang="svelte" />
    {/snippet}

    {#snippet examples()}
        <H3 title="Horizontal Scroll" />
        Set the orientation to horizontal to enable horizontal scrolling.
        <CodeAndPreview code={ExampleHorizontalRaw}>
            <ExampleHorizontal />
        </CodeAndPreview>

        <H3 title="Hidden Scrollbar" />
        Set the hideScrollbar to true to hide the scrollbar while maintaining scroll
        functionality.
        <CodeAndPreview code={ExampleHiddenScrollbarRaw}>
            <ExampleHiddenScrollbar />
        </CodeAndPreview>

        <H3 title="Navigation Buttons" />
        Set the withNavigation to true to enable navigation buttons.
        <CodeAndPreview code={ExampleWithNavigationRaw}>
            <ExampleWithNavigation />
        </CodeAndPreview>
    {/snippet}
</ComponentDoc>
