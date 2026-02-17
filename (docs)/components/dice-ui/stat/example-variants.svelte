<script lang="ts">
    import StatIndicator from '$lib/registry/components/dice-ui/stat/stat-indicator.svelte';
    import StatLabel from '$lib/registry/components/dice-ui/stat/stat-label.svelte';
    import StatRoot from '$lib/registry/components/dice-ui/stat/stat-root.svelte';
    import StatTrend from '$lib/registry/components/dice-ui/stat/stat-trend.svelte';
    import StatValue from '$lib/registry/components/dice-ui/stat/stat-value.svelte';
    import { DollarSign, TrendingUp } from '@lucide/svelte';
</script>

<div class="grid gap-4 sm:grid-cols-2">
    <StatRoot>
        <StatLabel>Default Indicator</StatLabel>
        <StatValue>2,350</StatValue>
        <StatIndicator>
            <TrendingUp />
        </StatIndicator>
    </StatRoot>

    <StatRoot>
        <StatLabel>Icon Variant</StatLabel>
        <StatValue>$45,231</StatValue>
        <StatIndicator variant="icon" color="success">
            <DollarSign />
        </StatIndicator>
    </StatRoot>

    <StatRoot>
        <StatLabel>Badge Variant</StatLabel>
        <StatValue>1,234</StatValue>
        <StatIndicator variant="badge" color="info">+24</StatIndicator>
    </StatRoot>

    <StatRoot>
        <StatLabel>Warning Color</StatLabel>
        <StatValue>89%</StatValue>
        <StatIndicator variant="icon" color="warning">
            <TrendingUp />
        </StatIndicator>
        <StatTrend trend="down">Capacity threshold reached</StatTrend>
    </StatRoot>
</div>
