<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import { Share, LucideScreenShare, Trash, X } from '@lucide/svelte';
    import * as ActionBar from '$lib/registry/components/action-bar';
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Action Bar
</h1>

<div>
    <p>
        A floating action bar that appears at the bottom or top of the viewport
        to display contextual actions for selected items.
    </p>

    <ActionBar.Root open={true} align="center" side="bottom">
        <ActionBar.Selection>
            2 Selected
            <ActionBar.Separator />
            <X />
        </ActionBar.Selection>
        <ActionBar.Separator />
        <ActionBar.Group>
            <ActionBar.Item>
                <Share />
                Share
            </ActionBar.Item>
            <ActionBar.Item variant="destructive">
                <Trash />
                Delete
            </ActionBar.Item>
        </ActionBar.Group>
    </ActionBar.Root>
</div>
