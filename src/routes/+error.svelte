<script lang="ts">
    import { resolve } from '$app/paths';
    import { openSearch } from '$lib/components/search-doc.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Empty from '$lib/components/ui/empty/index.js';
    import * as Kbd from '$lib/components/ui/kbd/index.js';
    import { SearchIcon } from '@lucide/svelte';
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
</script>

<Empty.Root class="h-full">
    <Empty.Header>
        <Empty.Title>Not found</Empty.Title>
        <Empty.Description>
            The page you requested does not exists
        </Empty.Description>
    </Empty.Header>
    <Empty.Content>
        <div class="flex gap-2">
            <Button
                variant="ghost"
                size="sm"
                class="ml-0 w-100 justify-between border"
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
        </div>
    </Empty.Content>
    <Button variant="link" class="text-muted-foreground" size="sm">
        <a href={resolve('/')}>
            Go back to the home <ArrowUpRightIcon class="inline" />
        </a>
    </Button>
</Empty.Root>
