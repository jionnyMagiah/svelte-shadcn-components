<script lang="ts">
    import { resolve } from '$app/paths';
    import { git } from '$lib';
    import AppSidebar from '$lib/components/app-sidebar.svelte';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Separator } from '$lib/components/ui/separator/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import type { Navigation } from '$lib/navigation';
    import { Ellipsis, Github, House } from '@lucide/svelte';
    import type { Snippet } from 'svelte';
    import { state } from '../state.svelte';

    let {
        navigation,
        children
    }: { navigation: Navigation; children?: Snippet } = $props();
</script>

<Sidebar.Provider>
    <AppSidebar variant="floating" {navigation} />
    <Sidebar.Inset>
        <div class="grid h-screen w-full grid-rows-[auto_1fr] pb-2">
            <header
                class="fixed z-20 flex h-12 w-full items-center gap-2 border-b bg-background px-2"
            >
                <Sidebar.Trigger class="-ms-1" />
                <Button variant="link" href={git} target="_blank">
                    <Github />
                </Button>
                <DarkModeToggle />
                <Separator orientation="vertical" class="me-2 h-4" />
                {#if state.state.crumbs}
                    {@const crumbs = state.state.crumbs}
                    <Breadcrumb.Root>
                        <Breadcrumb.List>
                            <Breadcrumb.Item>
                                <Breadcrumb.Link href={resolve('/')}>
                                    <House class="size-4" />
                                </Breadcrumb.Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator />
                            <Breadcrumb.Item class="hidden md:block">
                                <Breadcrumb.Page>{crumbs.group}</Breadcrumb.Page
                                >
                            </Breadcrumb.Item>

                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item class="hidden md:block">
                                <Breadcrumb.Page
                                    >{crumbs.section}</Breadcrumb.Page
                                >
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item class="block md:hidden">
                                <Breadcrumb.Page><Ellipsis /></Breadcrumb.Page>
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator class="block md:hidden" />
                            <Breadcrumb.Item>
                                <Breadcrumb.Page>{crumbs.page}</Breadcrumb.Page>
                            </Breadcrumb.Item>
                        </Breadcrumb.List>
                    </Breadcrumb.Root>
                {/if}
            </header>
            <div
                class="mt-12 flex w-full flex-1 flex-row-reverse bg-background px-4 py-8 lg:pr-8 lg:pl-0 xl:gap-4"
                id="content"
            >
                {@render children?.()}
            </div>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
