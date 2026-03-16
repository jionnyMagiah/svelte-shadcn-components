<script lang="ts">
    import { cn } from '$lib/utils';
    import { Check, Copy } from '@lucide/svelte';

    let {
        value,
        label,
        class: className
    }: {
        value: string;
        label: string;
        class?: string;
    } = $props();

    let copied = $state(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value).then(() => {
            copied = true;
            setTimeout(() => (copied = false), 1500);
        });
    };
</script>

<button
    type="button"
    onclick={handleCopy}
    aria-label={label}
    class={cn(
        'inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className
    )}
>
    {#if copied}
        <Check class="size-3.5 text-emerald-500" />
    {:else}
        <Copy class="size-3.5" />
    {/if}
</button>
