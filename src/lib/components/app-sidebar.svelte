<script lang="ts">
    import { navigation } from '$lib';
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { state } from '$lib/state.svelte';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import type { ComponentProps } from 'svelte';
    import SearchDoc from './search-doc.svelte';
    import SectionSwitcher from './section-switcher.svelte';

    let {
        ref = $bindable(null),
        ...restProps
    }: ComponentProps<typeof Sidebar.Root> = $props();

    const currentGroup = $derived(state.state.group);
</script>

<Sidebar.Root bind:ref {...restProps}>
    <Sidebar.Header>
        <SectionSwitcher />
        <SearchDoc />
    </Sidebar.Header>
    <Sidebar.Content class="gap-0">
        {#each navigation[currentGroup].groups as section (section.title)}
            <Collapsible.Root
                title={section.title}
                open
                class="group/collapsible"
            >
                <Sidebar.Group>
                    <Sidebar.GroupLabel
                        class="group/label text-sm text-muted-foreground hover:bg-sidebar-accent"
                    >
                        {#snippet child({ props })}
                            <Collapsible.Trigger {...props}>
                                {section.title}
                                <ChevronRightIcon
                                    class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                />
                            </Collapsible.Trigger>
                        {/snippet}
                    </Sidebar.GroupLabel>
                    <Collapsible.Content>
                        <Sidebar.GroupContent>
                            <Sidebar.Menu>
                                {#each section.pages as page (page.title)}
                                    <Sidebar.MenuItem>
                                        <Sidebar.MenuButton>
                                            {#snippet child({ props })}
                                                <a href={page.url} {...props}>
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
