<script lang="ts">
    import { git } from '$lib';
    import favicon from '$lib/assets/favicon.svg';
    import AppSidebar from '$lib/components/app-sidebar.svelte';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Separator } from '$lib/components/ui/separator/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { state } from '$lib/state.svelte';
    import { Github, House, TriangleAlert } from '@lucide/svelte';
    import { ModeWatcher } from 'mode-watcher';
    import './layout.css';
    import { resolve } from '$app/paths';
    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Sidebar.Provider>
    <AppSidebar variant="floating" />
    <Sidebar.Inset>
        <div class="grid h-screen grid-rows-[auto_1fr] pb-2">
            <!-- <div
                class="flex h-min w-full flex-row items-center gap-2 bg-orange-400 text-center font-semibold"
            >
                <TriangleAlert class="size-5" />
                <span>The components are not production ready</span>
            </div> -->
            <header
                class="flex h-12 items-center gap-2 border-b bg-background px-2"
            >
                <Sidebar.Trigger class="-ms-1" />
                <Separator orientation="vertical" class="me-2 h-4" />
                {#if state.state.crumbs}
                    {@const crumbs = state.state.crumbs}
                    <Breadcrumb.Root>
                        <Breadcrumb.List>
                            <Breadcrumb.Item class="hidden md:block">
                                <Breadcrumb.Link href={resolve('/')}>
                                    <House class='size-4'/>
                                </Breadcrumb.Link>
                            </Breadcrumb.Item>
                            {#each crumbs as crumb, index (index)}
                            <Breadcrumb.Separator class="hidden md:block" />
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
                                <!-- {#if index < crumbs.length - 1}
                                    <Breadcrumb.Separator
                                        class="hidden md:block"
                                    />
                                {/if} -->
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
            <div class="h-full min-h-0 w-full overflow-auto">
                {@render children()}
            </div>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
