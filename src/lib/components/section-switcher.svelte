<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { navigation, type Groups } from '$lib/navigation';
    import { CheckIcon } from '@lucide/svelte';
    import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
    import { onMount } from 'svelte';
    import {
        GROUP_LOCAL_STORAGE_KEY,
        isKeyOfNavigation,
        state
    } from '../state.svelte';

    const currentGroup = $derived(state.state.group);
    const CurrentIcon = $derived(navigation[state.state.group].icon);
    const groups = (Object.keys(navigation) as Groups[]).map((group) => ({
        group,
        icon: navigation[group].icon
    }));

    onMount(() => {
        const group = localStorage.getItem(GROUP_LOCAL_STORAGE_KEY);
        if (group && isKeyOfNavigation(group, navigation))
            state.state.group = group;
    });

    const PRIORITY: Record<Groups, number> = {
        'Getting Started': 1,
        Components: 2,
        Blocks: 3,
        Packages: 4,
        Utils: 5,
        Patterns: 6,
        index: 9
    };

    function sortByPriority(
        a: { group: Groups },
        b: { group: Groups }
    ): number {
        return (PRIORITY[a.group] ?? 99) - (PRIORITY[b.group] ?? 99);
    }
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <Sidebar.MenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        {...props}
                    >
                        <div
                            class="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#f96743] text-sidebar-primary-foreground"
                        >
                            <CurrentIcon class="size-4" />
                        </div>
                        <div class="flex flex-col gap-0.5 leading-none">
                            <span class="font-medium">{currentGroup}</span>
                        </div>
                        <ChevronsUpDownIcon class="ms-auto" />
                    </Sidebar.MenuButton>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                class="w-(--bits-dropdown-menu-anchor-width)"
                align="start"
            >
                {#each groups
                    .filter((g) => g.group !== 'index')
                    .sort(sortByPriority) as group}
                    {@const Icon = group.icon}
                    {@const key = group.group}
                    <DropdownMenu.Item
                        onSelect={() => {
                            state.state.group = key;
                            localStorage.setItem(GROUP_LOCAL_STORAGE_KEY, key);
                        }}
                    >
                        {#snippet child({ props })}
                            <a href={''} {...props}>
                                <Icon />
                                {key}
                                {#if key === currentGroup}
                                    <CheckIcon class="ms-auto" />
                                {/if}
                            </a>
                        {/snippet}
                    </DropdownMenu.Item>
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Sidebar.MenuItem>
</Sidebar.Menu>
