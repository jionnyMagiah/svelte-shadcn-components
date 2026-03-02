<script lang="ts" module>
    let open = $state(false);
    export function openSearch() {
        open = true;
    }
</script>

<script lang="ts">
    import * as Command from '$lib/components/ui/command/index.js';
    import { getSearch } from 'routes/api/api.remote';

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            open = !open;
        }
    }
    const search = $derived(await getSearch());
</script>

<svelte:document onkeydown={handleKeydown} />

<Command.Dialog bind:open>
    <Command.Input placeholder="Type to search..."></Command.Input>
    <Command.List class="h-150 max-h-150">
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group>
            {#each search as page}
                <Command.LinkItem
                    href={page.href}
                    onSelect={() => (open = false)}
                    value={page.description}
                    class="flex flex-col items-start gap-0"
                >
                    {page.title}
                    <span class="line-clamp-2 text-sm text-muted-foreground"
                        >{page.description}</span
                    >
                </Command.LinkItem>
            {/each}
        </Command.Group>
    </Command.List>
</Command.Dialog>
