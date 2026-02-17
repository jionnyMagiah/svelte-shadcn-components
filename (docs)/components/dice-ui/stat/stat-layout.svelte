<script lang="ts">
    import StatIndicator from '$lib/registry/components/dice-ui/stat/stat-indicator.svelte';
    import StatLabel from '$lib/registry/components/dice-ui/stat/stat-label.svelte';
    import StatRoot from '$lib/registry/components/dice-ui/stat/stat-root.svelte';
    import StatTrend from '$lib/registry/components/dice-ui/stat/stat-trend.svelte';
    import StatValue from '$lib/registry/components/dice-ui/stat/stat-value.svelte';
</script>

<StatRoot>
    <StatLabel />
    <StatIndicator />
    <StatValue />
    <StatTrend />
</StatRoot>
