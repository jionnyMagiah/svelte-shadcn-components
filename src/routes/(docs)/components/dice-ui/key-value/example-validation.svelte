<script lang="ts">
    import KeyValueAdd from '$lib/registry/components/dice-ui/key-value/key-value-add.svelte';
    import KeyValueError from '$lib/registry/components/dice-ui/key-value/key-value-error.svelte';
    import KeyValueItem from '$lib/registry/components/dice-ui/key-value/key-value-item.svelte';
    import KeyValueKeyInput from '$lib/registry/components/dice-ui/key-value/key-value-key-input.svelte';
    import KeyValueList from '$lib/registry/components/dice-ui/key-value/key-value-list.svelte';
    import KeyValueRemove from '$lib/registry/components/dice-ui/key-value/key-value-remove.svelte';
    import KeyValueRoot from '$lib/registry/components/dice-ui/key-value/key-value-root.svelte';
    import KeyValueValueInput from '$lib/registry/components/dice-ui/key-value/key-value-value-input.svelte';
</script>

<KeyValueRoot
    defaultValue={[
        { id: '1', key: 'API_KEY', value: 'sk-1234567890' },
        { id: '2', key: 'invalid key', value: '' },
        { id: '3', key: 'DATABASE_URL', value: 'short' }
    ]}
    keyPlaceholder="KEY"
    valuePlaceholder="value"
    onKeyValidate={(key) => {
        if (!key) return 'Key is required';
        if (!/^[A-Z_][A-Z0-9_]*$/.test(key)) {
            return 'Must be uppercase with underscores';
        }
        return undefined;
    }}
    onValueValidate={(value, key) => {
        if (key.includes('KEY') && value.length < 10) {
            return 'API keys must be at least 10 characters';
        }
        return undefined;
    }}
    allowDuplicateKeys={false}
>
    <KeyValueList>
        {#snippet child({ itemData })}
            <KeyValueItem {itemData} class="flex-col items-start">
                <div class="flex w-full gap-2">
                    <div class="flex flex-1 flex-col gap-1">
                        <KeyValueKeyInput class="font-mono" />
                        <KeyValueError field="key" />
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <KeyValueValueInput class="font-mono" />
                        <KeyValueError field="value" />
                    </div>
                    <KeyValueRemove />
                </div>
            </KeyValueItem>
        {/snippet}
    </KeyValueList>
    <KeyValueAdd />
</KeyValueRoot>
