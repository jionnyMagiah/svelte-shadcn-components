<script lang="ts">
    import ScrollerRoot from '$lib/registry/components/dice-ui/scroller/scroller-root.svelte';
</script>

<ScrollerRoot orientation="horizontal" class="w-full p-4">
    <div class="flex items-center gap-2.5">
        {#each { length: 10 } as _, index(index)}
            <div
                class="flex h-32 w-45 shrink-0 flex-col items-center justify-center rounded-md bg-accent p-4"
            >
                <div class="text-lg font-medium">Card {index + 1}</div>
                <span class="text-sm text-muted-foreground">
                    Scroll horizontally
                </span>
            </div>
        {/each}
    </div>
</ScrollerRoot>
