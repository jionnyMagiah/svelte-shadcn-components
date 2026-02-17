<script lang="ts">
    import CheckboxGroupDescription from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import CheckboxGroupItem from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group.svelte';
</script>

<CheckboxGroup orientation="horizontal">
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupList>
        <CheckboxGroupItem value="indy">Indy</CheckboxGroupItem>
        <CheckboxGroupItem value="stalefish">Stalefish</CheckboxGroupItem>
        <CheckboxGroupItem value="pizza-guy">Pizza Guy</CheckboxGroupItem>
        <CheckboxGroupItem value="fs-540">FS 540</CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupDescription>Select grab tricks</CheckboxGroupDescription>
</CheckboxGroup>
