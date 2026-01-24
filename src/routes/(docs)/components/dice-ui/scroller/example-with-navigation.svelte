<script lang="ts">
    import ScrollerRoot from '$lib/registry/components/dice-ui/scroller/scroller-root.svelte';
</script>

<ScrollerRoot
    hideScrollbar
    withNavigation
    scrollTriggerMode="hover"
    class="flex h-80 w-full flex-col gap-2.5 p-4"
>
    {#each { length: 10 } as _, index (index)}
        <div class="flex flex-col rounded-md bg-accent p-4">
            <div class="text-lg font-medium">Card {index + 1}</div>
            <span class="text-sm text-muted-foreground">
                Use the navigation arrows to scroll
            </span>
        </div>
    {/each}
</ScrollerRoot>
