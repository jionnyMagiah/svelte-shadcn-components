<script lang="ts">
    import { componentData } from '$lib';
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import * as ActionBar from '$lib/registry/components/dice-ui/action-bar';
    import { Share, Trash, X } from '@lucide/svelte';

    const component = componentData['dice-ui']['action-bar'];
</script>

<ComponentDoc componentName={component.title} shortDesc={component.desc}>
    {#snippet preview()}
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
    {/snippet}
</ComponentDoc>
