<script lang="ts">
    import * as Select from '$lib/components/ui/select/index.js';
    import Label from '$lib/components/ui/label/label.svelte';
    import Switch from '$lib/components/ui/switch/switch.svelte';
    import ActionBar from '$lib/registry/components/dice-ui/action-bar/action-bar.svelte';
    import ActionBarSelection from '$lib/registry/components/dice-ui/action-bar/action-bar-selection.svelte';
    import ActionBarSeparator from '$lib/registry/components/dice-ui/action-bar/action-bar-separator.svelte';
    import ActionBarClose from '$lib/registry/components/dice-ui/action-bar/action-bar-close.svelte';
    import { Archive, Star, X } from '@lucide/svelte';
    import ActionBarGroup from '$lib/registry/components/dice-ui/action-bar/action-bar-group.svelte';
    import ActionBarItem from '$lib/registry/components/dice-ui/action-bar/action-bar-item.svelte';

    let open = $state(false);
    let side = $state<'top' | 'bottom'>('bottom');
    let align = $state<'start' | 'center' | 'end'>('center');
</script>

<div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
        <Switch id="open" bind:checked={open} />
        <Label for="open">Show Action Bar</Label>
    </div>
    <div class="flex items-center gap-2">
        <Label for="side" class="w-14">Side</Label>
        <Select.Root type="single" bind:value={side}>
            <Select.Trigger id="side" class="w-28">
                {side}
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="top">Top</Select.Item>
                <Select.Item value="bottom">Bottom</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
    <div class="flex items-center gap-2">
        <Label for="align" class="w-14">Align</Label>
        <Select.Root type="single" bind:value={align}>
            <Select.Trigger id="align" class="w-28">
                {align}
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="start">Start</Select.Item>
                <Select.Item value="center">Center</Select.Item>
                <Select.Item value="end">End</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>

    <ActionBar {open} onOpenChange={(o) => (open = o)} {side} {align}>
        <ActionBarSelection>
            3 selected
            <ActionBarSeparator />
            <ActionBarClose>
                <X />
            </ActionBarClose>
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
            <ActionBarItem>
                <Star />
                Favorite
            </ActionBarItem>
            <ActionBarItem>
                <Archive />
                Archive
            </ActionBarItem>
        </ActionBarGroup>
    </ActionBar>
</div>
