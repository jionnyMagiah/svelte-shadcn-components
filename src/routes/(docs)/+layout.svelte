<script lang="ts">
    import { page } from '$app/state';
    import { navigation, type ComponentPage } from '$lib';
    import Toc from '$lib/components/toc.svelte';
    import { UseToc } from '$lib/hooks/toc.svelte';
    import { GROUP_LOCAL_STORAGE_KEY, state } from '$lib/state.svelte';
    import { cn } from '$lib/utils';
    import { ChevronLeft, ChevronRight } from '@lucide/svelte';
    import { watch } from 'runed';

    let { children } = $props();

    const toc = new UseToc();

    const url = $derived(page.url.pathname);
    const flatNavigation = $derived(
        Object.values(navigation)
            .flatMap((gro) => gro.groups)
            .flatMap((sec) => sec.pages)
    );
    const pageIdx = $derived(flatNavigation.findIndex((p) => p.url === url));
    const hasNext = $derived(pageIdx < flatNavigation.length - 1);
    const hasPrev = $derived(pageIdx > 0);

    function getPage(direction: 'prev' | 'next'): ComponentPage | null {
        if (direction === 'next' && hasNext) return flatNavigation[pageIdx + 1];
        else if (direction === 'prev' && hasPrev)
            return flatNavigation[pageIdx - 1];
        return null;
    }

    function getGroup() {
        let urlGroup: keyof typeof navigation | null = null;

        for (const [groupKey, groupValue] of iterateObjectTyped(navigation)) {
            for (let index = 0; index < groupValue.groups.length; index++) {
                const group = groupValue.groups[index];
                for (let j = 0; j < group.pages.length; j++) {
                    const page = group.pages[j];
                    if (page.url === url) urlGroup = groupKey;
                }
            }
        }

        if (urlGroup !== state.state.group && urlGroup) {
            state.state.group = urlGroup;
            localStorage.setItem(GROUP_LOCAL_STORAGE_KEY, urlGroup);
        }
    }

    watch([() => url], getGroup);

    function* iterateObjectTyped<T extends object>(
        obj: T
    ): Generator<{ [K in keyof T]-?: [K, T[K]] }[keyof T]> {
        for (const key in obj) {
            const value = obj[key];
            yield [key, value];
        }
    }
</script>

<div>
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
