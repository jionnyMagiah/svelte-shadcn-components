<script lang="ts">
    import CheckboxGroupItem from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group.svelte';
</script>

<CheckboxGroup>
    <CheckboxGroupLabel>Select your favorite tricks</CheckboxGroupLabel>
    <CheckboxGroupList>
        <CheckboxGroupItem value="kickflip">Kickflip</CheckboxGroupItem>
        <CheckboxGroupItem value="heelflip">Heelflip</CheckboxGroupItem>
        <CheckboxGroupItem value="tre-Flip">Tre Flip</CheckboxGroupItem>
        <CheckboxGroupItem value="540-Flip">540 Flip</CheckboxGroupItem>
    </CheckboxGroupList>
</CheckboxGroup>
