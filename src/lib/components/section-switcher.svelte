<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import { navigation, type Groups } from '$lib/navigation';
    import {
        GROUP_LOCAL_STORAGE_KEY,
        isKeyOfNavigation,
        state
    } from '../../content/state.svelte';
    import { CheckIcon } from '@lucide/svelte';
    import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
    import { onMount } from 'svelte';

    // Source - https://stackoverflow.com/a/78286219
    // Posted by jcalz
    // Retrieved 2026-01-26, License - CC BY-SA 4.0

    function* iterateObjectTyped<T extends object>(
        obj: T
    ): Generator<{ [K in keyof T]-?: [K, T[K]] }[keyof T]> {
        for (const key in obj) {
            const value = obj[key];
            yield [key, value];
        }
    }

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
                {#each groups as group}
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
