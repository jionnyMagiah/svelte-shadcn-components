<script lang="ts">
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
    import Label from '$lib/components/ui/label/label.svelte';
    import ActionBarClose from '$lib/registry/components/dice-ui/action-bar/action-bar-close.svelte';
    import ActionBarGroup from '$lib/registry/components/dice-ui/action-bar/action-bar-group.svelte';
    import ActionBarItem from '$lib/registry/components/dice-ui/action-bar/action-bar-item.svelte';
    import ActionBarSelection from '$lib/registry/components/dice-ui/action-bar/action-bar-selection.svelte';
    import ActionBarSeparator from '$lib/registry/components/dice-ui/action-bar/action-bar-separator.svelte';
    import ActionBar from '$lib/registry/components/dice-ui/action-bar/action-bar.svelte';
    import { cn } from '$lib/utils';
    import { Copy, Trash2, X } from '@lucide/svelte';
    import { SvelteSet } from 'svelte/reactivity';

    interface Task {
        id: string;
        name: string;
    }

    let tasks = $state<Task[]>([
        { id: crypto.randomUUID(), name: 'Weekly Status Report' },
        { id: crypto.randomUUID(), name: 'Client Invoice Review' },
        { id: crypto.randomUUID(), name: 'Product Roadmap' },
        { id: crypto.randomUUID(), name: 'Team Standup Notes' }
    ]);
    let selectedTaskIds = $state(new Set<string>());

    const open = $derived(selectedTaskIds.size > 0 || false);

    const onOpenChange = (open: boolean) => {
        if (!open) {
            selectedTaskIds = new Set();
        }
    };

    const onItemSelect = (id: string, checked: boolean) => {
        const newSelected = new Set(selectedTaskIds);
        if (checked) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        selectedTaskIds = newSelected;
    };

    const onDuplicate = () => {
        const selectedItems = tasks.filter((task) =>
            selectedTaskIds.has(task.id)
        );
        const duplicates = selectedItems.map((task) => ({
            ...task,
            id: crypto.randomUUID(),
            name: `${task.name} (copy)`
        }));
        tasks = [...tasks, ...duplicates];
        selectedTaskIds = new Set();
    };

    const onDelete = () => {
        tasks = tasks.filter((task) => !selectedTaskIds.has(task.id));
        selectedTaskIds = new Set();
    };
</script>

<div class="flex w-full flex-col gap-2.5">
    <span class="text-lg font-semibold">Tasks</span>
    <div class="flex max-h-72 flex-col gap-1.5 overflow-y-auto">
        {#each tasks as task}
            <Label
                class={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-md border bg-card/70 px-3 py-2.5 transition-colors hover:bg-accent/70',
                    selectedTaskIds.has(task.id) && 'bg-accent/70'
                )}
            >
                <Checkbox
                    checked={selectedTaskIds.has(task.id)}
                    onCheckedChange={(checked) =>
                        onItemSelect(task.id, checked === true)}
                />
                <span class="truncate text-sm font-medium">{task.name}</span>
            </Label>
        {/each}
    </div>

    <ActionBar {open} {onOpenChange}>
        <ActionBarSelection>
            {selectedTaskIds.size} selected
            <ActionBarSeparator />
            <ActionBarClose>
                <X />
            </ActionBarClose>
        </ActionBarSelection>
        <ActionBarSeparator />
        <ActionBarGroup>
            <ActionBarItem onselect={onDuplicate}>
                <Copy />
                Duplicate
            </ActionBarItem>
            <ActionBarItem variant="destructive" onselect={onDelete}>
                <Trash2 />
                Delete
            </ActionBarItem>
        </ActionBarGroup>
    </ActionBar>
</div>
