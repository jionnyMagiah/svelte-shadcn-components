<script lang="ts">
    import CheckboxGroupDescription from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import CheckboxGroupItem from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/components/dice-ui/checkbox-group/checkbox-group.svelte';

    const tricks = [
        { label: 'Kickflip', value: 'kickflip' },
        { label: 'Heelflip', value: 'heelflip' },
        { label: 'Tre Flip', value: 'tre-flip' },
        { label: 'Pizza Guy', value: 'pizza-guy' },
        { label: 'FS 540', value: 'fs-540' },
        { label: 'The 900', value: 'the-900' }
    ];

    let selectedValues: string[] = $state([]);
    let lastSelected: number | null = $state(null);
    let isShiftPressedRef = $state(false);

    const onShiftKeyDown = (
        event: KeyboardEvent & { currentTarget: HTMLElement & EventTarget }
    ) => {
        if (event.key === 'Shift') {
            isShiftPressedRef = event.type === 'keydown';
        }
    };
    const onValueChange = (newValue: string[]) => {
        // Handle single selection
        if (!isShiftPressedRef || lastSelected === null) {
            const clickedValue =
                newValue.find((v) => !selectedValues.includes(v)) ??
                selectedValues.find((v) => !newValue.includes(v));

            if (clickedValue) {
                const newIndex = tricks.findIndex(
                    (item) => getItemValue(item) === clickedValue
                );
                if (newIndex !== -1) {
                    lastSelected = newIndex;
                }
            }
            return;
        }

        // Find the currently clicked item
        const clickedValue =
            newValue.find((v) => !selectedValues.includes(v)) ??
            selectedValues.find((v) => !newValue.includes(v));

        if (!clickedValue) return;

        const currentIndex = tricks.findIndex(
            (item) => getItemValue(item) === clickedValue
        );
        if (currentIndex === -1) return;

        // Handle shift-click selection
        const start = Math.min(lastSelected, currentIndex);
        const end = Math.max(lastSelected, currentIndex);
        const rangeValues = tricks
            .slice(start, end + 1)
            .map((item) => getItemValue(item));

        const newSelectedValues = new Set(selectedValues);
        const currentItem = tricks[currentIndex];
        const isSelecting =
            currentItem && !selectedValues.includes(getItemValue(currentItem));

        for (const value of rangeValues) {
            if (isSelecting) {
                newSelectedValues.add(value);
            } else {
                newSelectedValues.delete(value);
            }
        }

        selectedValues = Array.from(newSelectedValues);
        lastSelected = currentIndex;
    };

    function getItemValue(item: (typeof tricks)[number]) {
        return item.value;
    }
</script>

<CheckboxGroup value={selectedValues} onvaluechange={onValueChange}>
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupDescription>
        Hold Shift and click to select multiple items
    </CheckboxGroupDescription>
    <CheckboxGroupList
        class="mt-1"
        onkeydown={onShiftKeyDown}
        onkeyup={onShiftKeyDown}
    >
        {#each tricks as trick}
            <CheckboxGroupItem value={trick.value}>
                {trick.label}
            </CheckboxGroupItem>
        {/each}
    </CheckboxGroupList>
</CheckboxGroup>
