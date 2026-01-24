<script lang="ts">
    import { page } from '$app/state';
    import { git, navigation, type Page } from '$lib';
    import favicon from '$lib/assets/favicon.svg';
    import AppSidebar from '$lib/components/app-sidebar.svelte';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Separator } from '$lib/components/ui/separator/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { state } from '$lib/state.svelte';
    import { cn } from '$lib/utils';
    import { ChevronLeft, ChevronRight, Github } from '@lucide/svelte';
    import { ModeWatcher } from 'mode-watcher';
    import './layout.css';
    let { children } = $props();

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Sidebar.Provider>
    <AppSidebar variant="floating" />
    <Sidebar.Inset>
        <div class="grid h-screen grid-rows-[auto_auto_1fr_auto] pb-2">
            <div
                class="h-min w-full bg-destructive text-center font-semibold uppercase"
            >
                the components are not production ready
            </div>
            <header
                class="flex h-12 items-center gap-2 border-b bg-background px-2"
            >
                <Sidebar.Trigger class="-ms-1" />
                <Separator orientation="vertical" class="me-2 h-4" />
                {#if state.state.crumbs}
                    {@const crumbs = state.state.crumbs}
                    <Breadcrumb.Root>
                        <Breadcrumb.List>
                            {#each crumbs as crumb, index}
                                <Breadcrumb.Item class="hidden md:block">
                                    {#if crumb.url}
                                        <Breadcrumb.Link href={crumb.url}
                                            >{crumb.text}</Breadcrumb.Link
                                        >
                                    {:else}
                                        <Breadcrumb.Item
                                            >{crumb.text}</Breadcrumb.Item
                                        >
                                    {/if}
                                </Breadcrumb.Item>
                                {#if index < crumbs.length - 1}
                                    <Breadcrumb.Separator
                                        class="hidden md:block"
                                    />
                                {/if}
                            {/each}
                        </Breadcrumb.List>
                    </Breadcrumb.Root>
                {/if}
                <div class="ml-auto">
                    <Button variant="link" href={git} target="_blank">
                        <Github />
                    </Button>
                    <DarkModeToggle />
                </div>
            </header>
            <div class="h-full min-h-0 w-full">
                {@render children()}
            </div>
            <div class="grid w-full grid-cols-2 gap-2">
                <div>{@render pageBottomNavigation('prev')}</div>
                <div>{@render pageBottomNavigation('next')}</div>
            </div>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>

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
                <span>{p.title}</span>
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
