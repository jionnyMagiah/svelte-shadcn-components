<script lang="ts">
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { state } from '../state.svelte';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import type { ComponentProps } from 'svelte';
    import SearchDoc, {
        openSearch
    } from '../blueprints/default/search-doc.svelte';
    import SectionSwitcher from './section-switcher.svelte';
    import * as Command from '$lib/components/ui/command/index.js';
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import { cn } from '$lib/utils';
    import SearchIcon from '@lucide/svelte/icons/search';
    import { getSearch } from 'routes/api/api.remote';

    import type { Navigation } from '$lib/navigation';
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
                                                    {...props}
                                                >
                                                    {page.title}
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
