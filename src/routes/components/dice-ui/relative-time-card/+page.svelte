<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { componentData } from '$lib';
    import { autoId } from '$lib/attachments';
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import DisplayProp, {
        type PropDesc
    } from '$lib/components/display-prop.svelte';
    import LayoutRtc from './layout-rtc.svelte?raw';
    import MultipleTimezones from './multiple-timezones.svelte';
    import MultipleTimezonesRaw from './multiple-timezones.svelte?raw';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';
    import Variants from './variants.svelte';
    import VariantsRaw from './variants.svelte?raw';

    const component = componentData['dice-ui']['relative-time-card'];

    const relativeTimeCardProps: PropDesc[] = [];


</script>

<ComponentDoc
    {component}
    crumbs={[
        { text: 'Dice UI', url: resolve('/components/dice-ui') },
        { text: component.title, url: page.url.pathname }
    ]}
>
    {#snippet preview()}
        <CodeAndPreview lang="svelte" code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}

    {#snippet examples()}
        <h3 {@attach autoId}>With Multiple Timezones</h3>
        <CodeAndPreview lang="svelte" code={MultipleTimezonesRaw}>
            <MultipleTimezones />
        </CodeAndPreview>
        <h3 {@attach autoId}>With Variants</h3>
        <CodeAndPreview lang="svelte" code={VariantsRaw}>
            <Variants />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock lang="svelte" code={LayoutRtc}></CodeBlock>
    {/snippet}

    {#snippet apiReference()}
        <p>
            The component is inspired by the <a
                class="link"
                href="https://www.diceui.com/docs/components/relative-time-card#relativetimecard"
                >Dice UI Relative Time Card</a
            > component.
        </p>
        <h3 {@attach autoId}>RelativeTimeCard</h3>
        <p>
            The main component that displays relative time with hover
            functionality.
            <DisplayProp props={relativeTimeCardProps} />
        </p>
    {/snippet}
</ComponentDoc>
