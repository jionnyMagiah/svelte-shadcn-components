<script lang="ts">
    import SegmentedInputItem from '$lib/registry/components/dice-ui/segmented-input/segmented-input-item.svelte';
    import SegmentedInput from '$lib/registry/components/dice-ui/segmented-input/segmented-input.svelte';

    let address = $state({
        street: '',
        city: '',
        zipCode: ''
    });
    const onValueChange =
        (field: keyof typeof address) =>
        (event: Event & { currentTarget: HTMLInputElement | EventTarget }) => {
            //@ts-ignore ssh
            address[field] = event.target?.value ?? '';
        };
</script>

<div class="flex flex-col gap-4">
    <div class=" gap-2">
        <span class="text-sm leading-none font-medium"> Mailing Address </span>
        <SegmentedInput
            aria-label="Mailing address input"
            class="w-full max-w-sm"
            orientation="vertical"
        >
            <SegmentedInputItem
                aria-label="Street address"
                placeholder="Street Address"
                value={address.street}
                onchange={onValueChange('street')}
            />
            <SegmentedInputItem
                aria-label="City"
                placeholder="City"
                value={address.city}
                onchange={onValueChange('city')}
            />
            <SegmentedInputItem
                aria-label="ZIP code"
                placeholder="ZIP Code"
                value={address.zipCode}
                onchange={onValueChange('zipCode')}
            />
        </SegmentedInput>
    </div>
    <p class="text-sm text-muted-foreground">
        Use arrow keys (up/down) to navigate between fields in vertical
        orientation.
    </p>
</div>
