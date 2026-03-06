<script lang="ts">
    import SegmentedInputItem from '$lib/registry/components/dice-ui/segmented-input/segmented-input-item.svelte';
    import SegmentedInput from '$lib/registry/components/dice-ui/segmented-input/segmented-input.svelte';

    let values = $state({
        first: '',
        second: '',
        third: ''
    });
    const onValueChange =
        (field: keyof typeof values) =>
        (event: Event & { currentTarget: HTMLInputElement | EventTarget }) => {
            //@ts-ignore ssh
            values[field] = event.target?.value ?? '';
        };
</script>

<div class="flex flex-col gap-2">
    <span class="text-sm leading-none font-medium"> Enter your details </span>
    <SegmentedInput class="w-full max-w-sm">
        <SegmentedInputItem
            placeholder="First"
            value={values.first}
            onchange={onValueChange('first')}
            aria-label="First name"
        />
        <SegmentedInputItem
            placeholder="Second"
            value={values.second}
            onchange={onValueChange('second')}
            aria-label="Middle name"
        />
        <SegmentedInputItem
            placeholder="Third"
            value={values.third}
            onchange={onValueChange('third')}
            aria-label="Last name"
        />
    </SegmentedInput>
</div>
