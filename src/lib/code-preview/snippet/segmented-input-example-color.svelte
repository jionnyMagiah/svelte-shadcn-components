<script lang="ts">
    import SegmentedInputItem from '$lib/registry/components/dice-ui/segmented-input/segmented-input-item.svelte';
    import SegmentedInput from '$lib/registry/components/dice-ui/segmented-input/segmented-input.svelte';

    let rgb = $state({
        r: 255,
        g: 128,
        b: 0
    });
    const onChannelChange =
        (channel: keyof typeof rgb) =>
        (event: Event & { currentTarget: HTMLInputElement | EventTarget }) => {
            //@ts-ignore ssh
            const value = Number.parseInt(event.target.value, 10);
            if (!Number.isNaN(value) && value >= 0 && value <= 255) {
                rgb[channel] = value;
            }
        };
</script>

<div class="flex flex-col gap-2">
    <span class="text-sm leading-none font-medium">RGB Color</span>
    <SegmentedInput class="w-fit" aria-label="RGB color input">
        <SegmentedInputItem
            placeholder="255"
            value={rgb.r}
            onchange={onChannelChange('r')}
            class="w-16"
            inputmode="numeric"
            pattern="[0-9]*"
            min="0"
            max="255"
            aria-label="Red channel (0-255)"
        />
        <SegmentedInputItem
            placeholder="128"
            value={rgb.g}
            onchange={onChannelChange('g')}
            class="w-16"
            inputmode="numeric"
            pattern="[0-9]*"
            min="0"
            max="255"
            aria-label="Green channel (0-255)"
        />
        <SegmentedInputItem
            placeholder="0"
            value={rgb.b}
            onchange={onChannelChange('b')}
            class="w-16"
            inputmode="numeric"
            pattern="[0-9]*"
            min="0"
            max="255"
            aria-label="Blue channel (0-255)"
        />
    </SegmentedInput>
</div>
