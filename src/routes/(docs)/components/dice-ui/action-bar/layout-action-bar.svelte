<script lang="ts">
    import ActionBarClose from '$lib/registry/components/dice-ui/action-bar/action-bar-close.svelte';
    import ActionBarGroup from '$lib/registry/components/dice-ui/action-bar/action-bar-group.svelte';
    import ActionBarItem from '$lib/registry/components/dice-ui/action-bar/action-bar-item.svelte';
    import ActionBarSelection from '$lib/registry/components/dice-ui/action-bar/action-bar-selection.svelte';
    import ActionBarSeparator from '$lib/registry/components/dice-ui/action-bar/action-bar-separator.svelte';
    import ActionBar from '$lib/registry/components/dice-ui/action-bar/action-bar.svelte';
</script>

<ActionBar>
    <ActionBarSelection />
    <ActionBarSeparator />
    <ActionBarGroup>
        <ActionBarItem />
        <ActionBarItem />
    </ActionBarGroup>
    <ActionBarClose />
</ActionBar>
