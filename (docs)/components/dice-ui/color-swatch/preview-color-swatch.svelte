<script lang="ts">
    import ColorSwatch from '$lib/registry/components/dice-ui/color-swatch/color-swatch.svelte';
</script>

<div class="flex flex-col gap-6">
    <div class="flex items-center gap-3">
        <ColorSwatch color="#3b82f6" />
        <span class="text-sm font-medium">Primary Blue</span>
    </div>
    <div class="flex items-center gap-3">
        <ColorSwatch color="#ef4444" size="sm" />
        <ColorSwatch color="#ef4444" size="default" />
        <ColorSwatch color="#ef4444" size="lg" />
        <span class="text-sm font-medium">Different Sizes</span>
    </div>
    <div class="flex items-center gap-3">
        <ColorSwatch color="rgba(59, 130, 246, 0.5)" />
        <span class="text-sm font-medium">Semi-transparent Blue</span>
    </div>
    <div class="flex items-center gap-3">
        <span class="text-sm font-medium">Color Palette</span>
        <div class="flex gap-2">
            <ColorSwatch color="#ef4444" />
            <ColorSwatch color="#f97316" />
            <ColorSwatch color="#eab308" />
            <ColorSwatch color="#22c55e" />
            <ColorSwatch color="#3b82f6" />
            <ColorSwatch color="#8b5cf6" />
            <ColorSwatch color="#ec4899" />
        </div>
    </div>
    <div class="flex items-center gap-3">
        <ColorSwatch color="#ef4444" disabled />
        <span class="text-sm font-medium">Disabled</span>
    </div>
</div>
