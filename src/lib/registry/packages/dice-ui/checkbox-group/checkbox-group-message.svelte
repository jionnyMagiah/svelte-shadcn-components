<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupContext } from './context.svelte';

    type CheckboxGroupMessageProps = HTMLAttributes<HTMLDivElement> & {
        /**
         * Whether the description should be announced by screen readers immediately upon rendering.
         * @default false
         */
        announce?: boolean;
        ref?: HTMLDivElement | null;
    };
    let {
        announce = false,
        children,
        ref = $bindable(),
        ...messageProps
    }: CheckboxGroupMessageProps = $props();

    const context = $derived(CheckboxGroupContext.get());

    const message = $derived(
        context.opts.validationMessage?.current || children
    );
    const messageContent = $derived(
        Array.isArray(message) ? message.join(' ') : message
    );
</script>

{#if messageContent}
    <div
        id={context.opts.messageId.current}
        aria-live={announce ? 'polite' : 'off'}
        data-disabled={context.opts.disabled?.current ? '' : undefined}
        data-invalid={context.opts.isInvalid?.current ? '' : undefined}
        {...messageProps}
        bind:this={ref}
    >
        {#if typeof messageContent === 'string'}
            {messageContent}
        {:else}
            {@render messageContent()}
        {/if}
    </div>
{/if}
