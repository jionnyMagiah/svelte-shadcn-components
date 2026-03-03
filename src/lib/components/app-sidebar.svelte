<script lang="ts">
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { useSidebar } from '$lib/components/ui/sidebar/index.js';
    import type { Navigation } from '$lib/navigation';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import SearchIcon from '@lucide/svelte/icons/search';
    import type { ComponentProps } from 'svelte';
    import { state } from '../state.svelte';
    import { openSearch } from './search-doc.svelte';
    import SectionSwitcher from './section-switcher.svelte';
    import Button from './ui/button/button.svelte';
    
    let {
        navigation,
        ref = $bindable(null),
        ...restProps
    }: { navigation: Navigation } & ComponentProps<
        typeof Sidebar.Root
    > = $props();

    const currentGroup = $derived(state.state.group);

    const group = $derived(navigation[currentGroup].sections);

    let sidebar = useSidebar();
</script>

<Sidebar.Root bind:ref {...restProps}>
    <Sidebar.Header>
        <SectionSwitcher />
        {@render searchDoc()}
    </Sidebar.Header>
    <Sidebar.Content class="gap-0">
        {#each Object.entries(group) as [key, section] (key)}
            <Collapsible.Root title={key} open class="group/collapsible">
                <Sidebar.Group>
                    <Sidebar.GroupLabel
                        class="group/label text-sm text-muted-foreground hover:bg-sidebar-accent"
                    >
                        {#snippet child({ props })}
                            <Collapsible.Trigger {...props}>
                                {key}
                                <ChevronRightIcon
                                    class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                />
                            </Collapsible.Trigger>
                        {/snippet}
                    </Sidebar.GroupLabel>
                    <Collapsible.Content>
                        <Sidebar.GroupContent>
                            <Sidebar.Menu>
                                {#each section as page (page.title)}
                                    <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                            {#snippet child({ props })}
                                                <a
                                                    href={`/docs/${page.slug}`}
                                                    class="flex flex-row justify-between"
                                                    {...props}
                                                >
                                                    <span>{page.title}</span>
                                                    {#if page.tag === 'new'}
                                                        <div
                                                            class="mr-0.5 ml-auto h-2 w-2 rounded-full bg-[#f96743]"
                                                        ></div>
                                                    {/if}
                                                </a>
                                            {/snippet}
                                        </Sidebar.MenuButton>
                                    </Sidebar.MenuItem>
                                {/each}
                            </Sidebar.Menu>
                        </Sidebar.GroupContent>
                    </Collapsible.Content>
                </Sidebar.Group>
            </Collapsible.Root>
        {/each}
    </Sidebar.Content>

    <Sidebar.Rail />
</Sidebar.Root>

{#snippet searchDoc()}
    <Sidebar.Group class="p-0">
        <Sidebar.GroupContent>
            <Button
                variant="ghost"
                size="sm"
                class="ml-0 w-full justify-between border"
                onclick={() => {
                    sidebar.setOpenMobile(false);
                    openSearch();
                }}
            >
                <div
                    class="flex flex-row items-center gap-1 text-muted-foreground"
                >
                    <SearchIcon />
                    Search...
                </div>
                <Kbd.Group>
                    <Kbd.Root>Ctrl</Kbd.Root>
                    <span>+</span>
                    <Kbd.Root>P</Kbd.Root>
                </Kbd.Group>
            </Button>
        </Sidebar.GroupContent>
    </Sidebar.Group>
{/snippet}
