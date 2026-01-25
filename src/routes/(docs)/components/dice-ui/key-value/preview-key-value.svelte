<script lang="ts">
    import KeyValueAdd from '$lib/registry/components/dice-ui/key-value/key-value-add.svelte';
    import KeyValueItem from '$lib/registry/components/dice-ui/key-value/key-value-item.svelte';
    import KeyValueKeyInput from '$lib/registry/components/dice-ui/key-value/key-value-key-input.svelte';
    import KeyValueList from '$lib/registry/components/dice-ui/key-value/key-value-list.svelte';
    import KeyValueRemove from '$lib/registry/components/dice-ui/key-value/key-value-remove.svelte';
    import KeyValueRoot from '$lib/registry/components/dice-ui/key-value/key-value-root.svelte';
    import KeyValueValueInput from '$lib/registry/components/dice-ui/key-value/key-value-value-input.svelte';
</script>

<KeyValueRoot>
    <KeyValueList>
        {#snippet child({ itemData })}
            <KeyValueItem {itemData}>
                <KeyValueKeyInput />
                <KeyValueValueInput placeholder="Test" />
                <KeyValueRemove />
            </KeyValueItem>
        {/snippet}
    </KeyValueList>
    <KeyValueAdd />
</KeyValueRoot>
