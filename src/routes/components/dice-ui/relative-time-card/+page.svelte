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

<ComponentDoc componentName={component.title} shortDesc={component.desc}>
    {#snippet preview()}
        <CodeAndPreview lang="svelte" code={PreviewRaw}>
            <Preview />
        </CodeAndPreview>
    {/snippet}

    {#snippet examples()}
        <h3 id="multiple-timezones">With Multiple Timezones</h3>
        <CodeAndPreview lang="svelte" code={MultipleTimezonesRaw}>
            <MultipleTimezones />
        </CodeAndPreview>
        <h3 id="variants">With Variants</h3>
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
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            RelativeTimeCard
        </h3>
        <p>
            The main component that displays relative time with hover
            functionality.
            <DisplayProp props={relativeTimeCardProps} />
        </p>
    {/snippet}
</ComponentDoc>
