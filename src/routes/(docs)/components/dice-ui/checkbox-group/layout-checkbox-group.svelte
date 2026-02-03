<script lang="ts">
    import CheckboxGroupDescription from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import CheckboxGroupIndicator from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-indicator.svelte';
    import CheckboxGroupItem from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group.svelte';
</script>

<CheckboxGroup>
    <CheckboxGroupLabel />
    <CheckboxGroupList>
        <CheckboxGroupItem>
            <CheckboxGroupIndicator />
        </CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupDescription />
</CheckboxGroup>
