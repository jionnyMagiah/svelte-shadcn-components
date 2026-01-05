<script lang="ts">
    import type { PropDesc } from '$lib/components/display-prop.svelte';
    import DisplayProp from '$lib/components/display-prop.svelte';
    import * as Status from '$lib/registry/components/status';

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

<div>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Status
    </h1>

    <p>
        A flexible status indicator component with animated ping effect and
        color variants for displaying system states, user presence, and service
        health.
    </p>
    <h2
        class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Example
    </h2>
    <div class="flex flex-wrap items-center gap-2.5">
        <Status.Root variant="success">
            {#snippet child({ props })}
                <a href="/" {...props}>
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
    </div>

    <h2
        class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        Reference
    </h2>
    <div>
        <p>
            The component is inspired by <a
                class="link"
                href="https://www.diceui.com/docs/components/status"
                >Dice UI Status Component</a
            >
        </p>
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            Status Root
        </h3>
        <p>
            The main container component that provides the badge-style wrapper
            with color variants.
            <DisplayProp props={statusRootProps} />
        </p>
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            Status Indicator
        </h3>
        <p>An animated pulse indicator for the status.</p>
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            Status Label
        </h3>
        <p>The text label for the status.</p>
    </div>
</div>
