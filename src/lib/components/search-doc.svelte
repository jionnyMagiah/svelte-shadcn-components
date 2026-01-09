<script lang="ts">
    import { navigation } from '$lib';
    import * as Command from '$lib/components/ui/command/index.js';
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import SearchIcon from '@lucide/svelte/icons/search';
    import Button from './ui/button/button.svelte';
    let open = $state(false);
    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            open = !open;
        }
    }
</script>

<Sidebar.Group class="p-0">
    <Sidebar.GroupContent>
        <Button
            variant="ghost"
            size="sm"
            class="ml-0 w-full justify-between border"
            onclick={() => {
                open = true;
            }}
        >
            <div class="flex flex-row items-center gap-1">
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

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open>
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        {#each navigation as group, i (i)}
            <Command.Group heading={group.title}>
                {#each group.pages as page (page.url)}
                    <Command.LinkItem
                        href={page.url}
                        value={`${group.title} > ${page.title}`}
                        onSelect={() => (open = false)}
                    >
                        {page.title}
                    </Command.LinkItem>
                {/each}
            </Command.Group>
        {/each}
    </Command.List>
</Command.Dialog>
