<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import { useCopyToClipboard } from '$lib/hooks/use-copy-to-clipboard.svelte';
    import { cn } from '$lib/utils';
    import { Check, ClipboardList } from '@lucide/svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLPreElement> = $props();

    const copier = useCopyToClipboard();
</script>

<pre
    class={cn(className, 'peer')}
    {...restProps}
    use:copier.setCodeStringAction>{@render children?.()}</pre>
<Button
    size="icon-sm"
    variant="default"
    class={'size-7 px-0 py-0 opacity-0 peer-hover:opacity-100 hover:opacity-100'}
    onclick={() => copier.copyToClipboard()}
    data-pre-copy-btn=""
    aria-label="Copy code"
>
    {#if copier.isCopied}
        <Check />
    {:else}
        <ClipboardList />
    {/if}
</Button>
