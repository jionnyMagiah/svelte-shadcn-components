<script lang="ts">
    import KeyValueAdd from '$lib/registry/components/dice-ui/key-value/key-value-add.svelte';
    import KeyValueItem from '$lib/registry/components/dice-ui/key-value/key-value-item.svelte';
    import KeyValueKeyInput from '$lib/registry/components/dice-ui/key-value/key-value-key-input.svelte';
    import KeyValueList from '$lib/registry/components/dice-ui/key-value/key-value-list.svelte';
    import KeyValueRemove from '$lib/registry/components/dice-ui/key-value/key-value-remove.svelte';
    import KeyValueRoot from '$lib/registry/components/dice-ui/key-value/key-value-root.svelte';
    import KeyValueValueInput from '$lib/registry/components/dice-ui/key-value/key-value-value-input.svelte';
    import { ClipboardIcon } from '@lucide/svelte';
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 rounded-lg border bg-muted/50 p-4">
        <div class="flex items-center gap-2">
            <ClipboardIcon class="size-4" />
            <p class="text-sm font-medium">Paste Support</p>
        </div>
        <p class="text-xs text-muted-foreground">
            Try pasting multiple lines in any of these formats:
        </p>
        <pre class="rounded bg-background p-2 text-xs">{`API_KEY=sk-1234567890\nDATABASE_URL:postgresql://localhost\nPORT\t3000`}</pre>
    </div>
    <KeyValueRoot keyPlaceholder="KEY" valuePlaceholder="value">
        <KeyValueList>
            {#snippet child({ itemData })}
                <KeyValueItem {itemData}>
                    <KeyValueKeyInput class="font-mono" />
                    <KeyValueValueInput class="font-mono" />
                    <KeyValueRemove />
                </KeyValueItem>
            {/snippet}
        </KeyValueList>
        <KeyValueAdd />
    </KeyValueRoot>
</div>
