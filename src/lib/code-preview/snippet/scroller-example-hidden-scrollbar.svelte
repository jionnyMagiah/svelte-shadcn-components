<script lang="ts">
    import ScrollerRoot from '$lib/registry/components/dice-ui/scroller/scroller-root.svelte';
</script>

<ScrollerRoot class="flex h-80 w-full flex-col gap-2.5 p-4" hideScrollbar>
    {#each { length: 20 }, index}
        <div class="flex h-40 flex-col rounded-md bg-accent p-4">
            <div class="text-lg font-medium">Card {index + 1}</div>
            <span class="text-sm text-muted-foreground">
                Scroll smoothly without visible scrollbars
            </span>
        </div>
    {/each}
</ScrollerRoot>
