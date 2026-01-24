<script lang="ts">
    import { page } from '$app/state';
    import { navigation, type Page } from '$lib';
    import Toc from '$lib/components/toc.svelte';
    import { UseToc } from '$lib/hooks/toc.svelte';
    import { cn } from '$lib/utils';
    import { ChevronLeft, ChevronRight } from '@lucide/svelte';

    let { children } = $props();

    const toc = new UseToc();

    const url = $derived(page.url.pathname);
    const flatNavigation = $derived(navigation.flatMap((g) => g.pages));
    const pageIdx = $derived(flatNavigation.findIndex((p) => p.url === url));
    const hasNext = $derived(pageIdx < flatNavigation.length - 1);
    const hasPrev = $derived(pageIdx > 0);

    function getPage(direction: 'prev' | 'next'): Page | null {
        if (direction === 'next' && hasNext) return flatNavigation[pageIdx + 1];
        else if (direction === 'prev' && hasPrev)
            return flatNavigation[pageIdx - 1];
        return null;
    }

</script>

<div >
    <div class="flex w-full flex-col xl:ml-[10%] xl:w-[55%]">
        <div bind:this={toc.ref} class="overflow-auto">
            {@render children()}
        </div>
        <div class="grid w-full grid-cols-2 gap-2">
            <div>{@render pageBottomNavigation('prev')}</div>
            <div>{@render pageBottomNavigation('next')}</div>
        </div>
    </div>
    <div class="fixed top-24 right-[10%] hidden h-full overflow-auto xl:block">
        <Toc toc={toc.current} />
    </div>
</div>

{#snippet pageBottomNavigation(direction: 'prev' | 'next')}
    {@const p = getPage(direction)}
    {#if p}
        <a
            href={p.url}
            class="flex h-20 w-full flex-row items-start gap-2 rounded-md border p-2 hover:bg-secondary"
        >
            {#if direction === 'prev'}
                <ChevronLeft class="size-5 h-6" />
            {/if}
            <div
                class={cn('flex w-full flex-col gap-2', {
                    'text-right': direction === 'next'
                })}
            >
                <span class="font-semibold">{p.title}</span>
                <span class="line-clamp-1 text-sm text-muted-foreground"
                    >{p.desc}</span
                >
            </div>
            {#if direction === 'next'}
                <ChevronRight class="size-5 h-6" />
            {/if}
        </a>
    {/if}
{/snippet}
