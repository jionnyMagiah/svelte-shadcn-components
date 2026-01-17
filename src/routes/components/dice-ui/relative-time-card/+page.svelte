<script lang="ts">
    import CodeAndPreview from '$lib/components/code-and-preview.svelte';
    import CodeBlock from '$lib/components/code-block.svelte';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import DisplayProp, {
        type PropDesc
    } from '$lib/components/display-prop.svelte';
    import { onMount } from 'svelte';
    import MultipleTimezones from './multiple-timezones.svelte';
    import MultipleTimezonesRaw from './multiple-timezones.svelte?raw';
    import Preview from './preview.svelte';
    import PreviewRaw from './preview.svelte?raw';
    import Variants from './variants.svelte';
    import VariantsRaw from './variants.svelte?raw';
    import { componentData } from '$lib';
    import H3 from '$lib/components/h3.svelte';
    const now = new Date();

    const component = componentData['dice-ui']['relative-time-card'];

    const relativeTimeCardProps: PropDesc[] = [];

    const layoutCode = `<RelativeTimeCard.Root {date} />`;

    onMount(async () => {
        console.log(
            await import.meta
                .glob('./multiple-timezones.svelte', { as: 'raw' })
                ['./multiple-timezones.svelte']()
        );
    });
</script>

<ComponentDoc {component}>
    {#snippet preview()}
        <CodeAndPreview lang="svelte" code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}

    {#snippet examples()}
        <H3 title="With Multiple Timezones" />
        <CodeAndPreview lang="svelte" code={MultipleTimezonesRaw}>
            <MultipleTimezones />
        </CodeAndPreview>
        <H3 title="With Variants" />
        <CodeAndPreview lang="svelte" code={VariantsRaw}>
            <Variants />
        </CodeAndPreview>
    {/snippet}

    {#snippet layout()}
        <CodeBlock lang="svelte" code={layoutCode}></CodeBlock>
    {/snippet}

    {#snippet apiReference()}
        <p>
            The component is inspired by the <a
                class="link"
                href="https://www.diceui.com/docs/components/relative-time-card#relativetimecard"
                >Dice UI Relative Time Card</a
            > component.
        </p>
        <H3 title="RelativeTimeCard" />
        <p>
            The main component that displays relative time with hover
            functionality.
            <DisplayProp props={relativeTimeCardProps} />
        </p>
    {/snippet}
</ComponentDoc>
