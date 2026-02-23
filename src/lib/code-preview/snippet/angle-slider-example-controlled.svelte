<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import AngleSliderRange from '$lib/registry/components/dice-ui/angle-slider/angle-slider-range.svelte';
    import AngleSliderRoot from '$lib/registry/components/dice-ui/angle-slider/angle-slider-root.svelte';
    import AngleSliderThumb from '$lib/registry/components/dice-ui/angle-slider/angle-slider-thumb.svelte';
    import AngleSliderTrack from '$lib/registry/components/dice-ui/angle-slider/angle-slider-track.svelte';
    import AngleSliderValue from '$lib/registry/components/dice-ui/angle-slider/angle-slider-value.svelte';
    import { RotateCcw, Shuffle } from '@lucide/svelte';
    import { animate } from 'motion';

    let value = $state([180]);
    let animationRef = $state<ReturnType<typeof animate> | null>(null);

    const onReset = () => {
        animateToValue(0);
    };

    const onRandomize = () => {
        animateToValue(Math.floor(Math.random() * 360));
    };
    const animateToValue = (targetValue: number) => {
        if (animationRef) {
            animationRef.stop();
        }

        const currentValue = value[0] ?? 0;

        let diff = targetValue - currentValue;
        if (diff > 180) {
            diff -= 360;
        } else if (diff < -180) {
            diff += 360;
        }

        animationRef = animate(0, diff, {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (progress: number) => {
                const animatedValue = currentValue + progress;
                const normalizedValue = Math.round(
                    ((animatedValue % 360) + 360) % 360
                );
                value = [normalizedValue];
            },
            onComplete: () => {
                value = [targetValue];
                animationRef = null;
            }
        });
    };
</script>

<div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
        <Button variant="outline" size="sm" onclick={onReset}>
            <RotateCcw />
            Reset
        </Button>
        <Button size="sm" onclick={onRandomize}>
            <Shuffle />
            Randomize
        </Button>
    </div>
    <AngleSliderRoot
        {value}
        onValueChange={(v) => {
            value = v;
        }}
        max={360}
        min={0}
        step={1}
        size={80}
    >
        <AngleSliderTrack>
            <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb />
        <AngleSliderValue />
    </AngleSliderRoot>
</div>
