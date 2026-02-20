<script lang="ts">
    import type { Snippet } from 'svelte';

    import { resolve } from '$app/paths';
    import { git } from '$lib';
    import AppSidebar from '$lib/components/app-sidebar.svelte';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Separator } from '$lib/components/ui/separator/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import type { Navigation } from '$lib/navigation';
    import { Github, House } from '@lucide/svelte';
    import { state } from '../state.svelte';

    let {
        navigation,
        children
    }: { navigation: Navigation; children?: Snippet } = $props();
</script>

<Sidebar.Provider>
    <AppSidebar variant="floating" {navigation} />
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
                                    <House class="size-4" />
                                </Breadcrumb.Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item class="hidden md:block">
                                <!-- {#if crumb.url}
                                        <Breadcrumb.Link href={crumb.url}
                                            >{crumb.text}</Breadcrumb.Link
                                        >
                                    {:else} -->
                                <Breadcrumb.Item>{crumbs.group}</Breadcrumb.Item
                                >
                                <!-- {/if} -->
                            </Breadcrumb.Item>

                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item class="hidden md:block">
                                <!-- {#if crumb.url}
                                        <Breadcrumb.Link href={crumb.url}
                                            >{crumb.text}</Breadcrumb.Link
                                        >
                                    {:else} -->
                                <Breadcrumb.Item
                                    >{crumbs.section}</Breadcrumb.Item
                                >
                                <!-- {/if} -->
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator class="hidden md:block" />
                            <Breadcrumb.Item class="hidden md:block">
                                <!-- {#if crumb.url}
                                        <Breadcrumb.Link href={crumb.url}
                                            >{crumb.text}</Breadcrumb.Link
                                        >
                                    {:else} -->
                                <Breadcrumb.Item>{crumbs.page}</Breadcrumb.Item
                                >
                                <!-- {/if} -->
                            </Breadcrumb.Item>
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
            <div
                class="flex w-full flex-1 flex-row-reverse bg-background px-4 py-8 lg:pr-8 lg:pl-0 xl:gap-4"
                id="content"
            >
                {@render children?.()}
            </div>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
