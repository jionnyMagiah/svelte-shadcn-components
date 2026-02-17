<script lang="ts" module>
    let open = $state(false);
    export function openSearch() {
        open = true;
    }
</script>

<script lang="ts">
    import * as Command from '$lib/components/ui/command/index.js';
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import * as Sidebar from '$lib/components/ui/sidebar/index.js';
    import SearchIcon from '@lucide/svelte/icons/search';
    import Button from '../../components/ui/button/button.svelte';
    import { getSearch } from 'routes/api/api.remote';

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            open = !open;
        }
    }

    const search = $derived(await getSearch());
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
            <div class="flex flex-row items-center gap-1 text-muted-foreground">
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
    <Command.Input placeholder="Type to search..."></Command.Input>
    <Command.List class="max-h-150">
        <Command.Empty>No results found.</Command.Empty>

        {#each search as page}
            <Command.LinkItem
                href={page.href}
                onSelect={() => (open = false)}
                value={page.content}
                class="flex flex-col items-start gap-0"
            >
                {page.title}
                <span class="line-clamp-2 text-sm text-muted-foreground"
                    >{page.content}</span
                >
            </Command.LinkItem>
        {/each}
    </Command.List>
</Command.Dialog>
