<script lang="ts">
    import { resolve } from '$app/paths';
    import { openSearch } from '$lib/blueprints/default/search-doc.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Empty from '$lib/components/ui/empty/index.js';
    import { SearchIcon } from '@lucide/svelte';
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
</script>

<Empty.Root class='h-full'>
    <Empty.Header>
        <Empty.Title>Not found</Empty.Title>
        <Empty.Description>
            The page you requested does not exists
        </Empty.Description>
    </Empty.Header>
    <Empty.Content>
        <div class="flex gap-2">
            <Button variant="outline" onclick={openSearch}><SearchIcon />Open search</Button>
        </div>
    </Empty.Content>
    <Button variant="link" class="text-muted-foreground" size="sm">
        <a href={resolve('/')}>
            Go back to the home <ArrowUpRightIcon class="inline" />
        </a>
    </Button>
</Empty.Root>
