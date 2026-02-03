<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupContext } from './context.svelte';

    type CheckboxGroupDescriptionProps = HTMLAttributes<HTMLDivElement> & {
        /**
         * Whether the description should be announced by screen readers immediately upon rendering.
         * @default false
         */
        announce?: boolean;

        /**
         * Hide the description when the checkbox group is in an error state.
         * @default false
         */
        hideOnError?: boolean;

        ref?: HTMLDivElement | null;
    };

    let {
        announce = false,
        hideOnError = false,
        children,
        ref = $bindable(),
        ...descriptionProps
    }: CheckboxGroupDescriptionProps = $props();

    const context = $derived(CheckboxGroupContext.get());

    const empty = $derived(hideOnError && context.opts.isInvalid.current);
</script>

{#if !empty}
    <div
        id={context.opts.descriptionId.current}
        aria-live={announce ? 'polite' : 'off'}
        aria-describedby={context.opts.labelId.current}
        aria-invalid={context.opts.isInvalid.current}
        data-disabled={context.opts.disabled?.current ? '' : undefined}
        data-invalid={context.opts.isInvalid.current ? '' : undefined}
        {...descriptionProps}
        bind:this={ref}
    >
        {@render children?.()}
    </div>
{/if}
