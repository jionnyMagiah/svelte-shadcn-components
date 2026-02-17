<script lang="ts">
    import CheckboxGroupDescription from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import CheckboxGroupItem from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroupMessage from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-message.svelte';
    import CheckboxGroup from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group.svelte';

    let tricks = $state<string[]>(['stalefish', 'fs-540']);
</script>

<CheckboxGroup
    value={tricks}
    onvaluechange={(v) => {
        tricks = v;
    }}
    onvalidate={(value) =>
        value.includes('indy') ? 'Indy is not allowed' : null}
>
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupList>
        <CheckboxGroupItem value="indy">Indy</CheckboxGroupItem>
        <CheckboxGroupItem value="stalefish">Stalefish</CheckboxGroupItem>
        <CheckboxGroupItem value="fs-540">FS 540</CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupDescription hideOnError>
        Select grab tricks
    </CheckboxGroupDescription>
    <CheckboxGroupMessage />
</CheckboxGroup>
