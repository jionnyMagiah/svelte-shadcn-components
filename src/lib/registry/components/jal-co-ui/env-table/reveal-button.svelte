<script lang="ts">
    import { Eye, EyeOff } from '@lucide/svelte';

    let {
        revealed,
        onToggle,
        label
    }: {
        revealed: boolean;
        onToggle: () => void;
        label: string;
    } = $props();
</script>

<button
    type="button"
    onclick={onToggle}
    aria-label={label}
    class="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
>
    {#if revealed}
        <EyeOff class="size-3.5" />
    {:else}
        <Eye class="size-3.5" />
    {/if}
</button>
