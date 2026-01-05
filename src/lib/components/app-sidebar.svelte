<script lang="ts" module>
    const navigation: {
        title: string;
        pages: { title: string; url: ResolvedPathname }[];
    }[] = [
        {
            title: 'Getting Started',
            pages: [
                { title: 'Introduction', url: resolve('/introduction') },
                { title: 'Setup', url: resolve('/setup') }
            ]
        },
        {
            title: 'Components',
            pages: [
                { title: 'Action Bar', url: resolve('/components/action-bar') },{
                    title:'Status', url:resolve('/components/status')
                }
            ]
        },
    ];
</script>

<script lang="ts">
    import * as Collapsible from '$lib/components/ui/collapsible/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import type { ComponentProps } from 'svelte';
    import SearchDoc from './search-doc.svelte';
    import { resolve } from '$app/paths';
    import type { ResolvedPathname } from '$app/types';

    let {
        ref = $bindable(null),
        ...restProps
    }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
    <Sidebar.Header>
        <SearchDoc />
    </Sidebar.Header>
    <Sidebar.Content class="gap-0">
        {#each navigation as item (item.title)}
            <Collapsible.Root title={item.title} open class="group/collapsible">
                <Sidebar.Group>
                    <Sidebar.GroupLabel
                        class="group/label text-sm text-muted-foreground hover:bg-sidebar-accent"
                    >
                        {#snippet child({ props })}
                            <Collapsible.Trigger {...props}>
                                {item.title}
                                <ChevronRightIcon
                                    class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                />
                            </Collapsible.Trigger>
                        {/snippet}
                    </Sidebar.GroupLabel>
                    <Collapsible.Content>
                        <Sidebar.GroupContent>
                            <Sidebar.Menu>
                                {#each item.pages as page (page.title)}
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
