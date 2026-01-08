<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import AppSidebar from '$lib/components/app-sidebar.svelte';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import { Separator } from '$lib/components/ui/separator/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { ModeWatcher } from 'mode-watcher';
    import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Sidebar.Provider>
    <AppSidebar variant="floating" />
    <Sidebar.Inset>
        <div class="h-screen grid grid-rows-[auto_1fr]">
            <header
                class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4"
            >
                <Sidebar.Trigger class="-ms-1" />
                <Separator orientation="vertical" class="me-2 h-4" />
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item class="hidden md:block">
                            <Breadcrumb.Link href="##"
                                >Building Your Application</Breadcrumb.Link
                            >
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator class="hidden md:block" />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
                <DarkModeToggle />
            </header>
            <div class="w-full min-h-0 h-full">
                {@render children()}
            </div>
        </div>
    </Sidebar.Inset>
</Sidebar.Provider>
