<script lang="ts">
    import { resolve } from '$app/paths';
    import { componentData } from '$lib';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import type { PropDesc } from '$lib/components/display-prop.svelte';
    import DisplayProp from '$lib/components/display-prop.svelte';
    import H3 from '$lib/components/h3.svelte';
    import * as Status from '$lib/registry/components/dice-ui/status';

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
    {#snippet preview()}{/snippet}

    {#snippet installation()}{/snippet}

    {#snippet layout()}{/snippet}

    {#snippet examples()}
        <Status.Root variant="success">
            {#snippet child({ props })}
                <a href={resolve('/')} {...props}>
                    <Status.Indicator />
                    Online
                </a>
            {/snippet}
            <!-- <Status.Label>Online</Status.Label> -->
        </Status.Root>

        <Status.Root variant="error">
            <Status.Indicator />
            <Status.Label>Offline</Status.Label>
        </Status.Root>

        <Status.Root variant="warning">
            <Status.Indicator />
            <Status.Label>Away</Status.Label>
        </Status.Root>

        <Status.Root variant="info">
            <Status.Indicator />
            <Status.Label>Idle</Status.Label>
        </Status.Root>

        <Status.Root variant="default">
            <Status.Indicator />
            <Status.Label>Unknown</Status.Label>
        </Status.Root>
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
