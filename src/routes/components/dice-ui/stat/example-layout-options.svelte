<script lang="ts">
    import StatDescription from '$lib/registry/components/dice-ui/stat/stat-description.svelte';
    import StatIndicator from '$lib/registry/components/dice-ui/stat/stat-indicator.svelte';
    import StatLabel from '$lib/registry/components/dice-ui/stat/stat-label.svelte';
    import StatRoot from '$lib/registry/components/dice-ui/stat/stat-root.svelte';
    import StatSeparator from '$lib/registry/components/dice-ui/stat/stat-separator.svelte';
    import StatTrend from '$lib/registry/components/dice-ui/stat/stat-trend.svelte';
    import StatValue from '$lib/registry/components/dice-ui/stat/stat-value.svelte';
    import { ArrowUp, Users } from '@lucide/svelte';
</script>

<div class="grid gap-4 sm:grid-cols-2">
    <StatRoot>
        <StatLabel>Active Subscribers</StatLabel>
        <StatValue>2,847</StatValue>
        <StatIndicator variant="icon" color="success">
            <Users />
        </StatIndicator>
        <StatDescription>
            Total number of active subscribers as of today
        </StatDescription>
    </StatRoot>

    <StatRoot>
        <StatLabel>Monthly Revenue</StatLabel>
        <StatValue>$12,450</StatValue>
        <StatIndicator variant="icon" color="info">
            <ArrowUp />
        </StatIndicator>
        <StatSeparator />
        <StatTrend trend="up">
            <ArrowUp />
            +15.3% from last month
        </StatTrend>
        <StatDescription>
            Revenue generated in the current billing period
        </StatDescription>
    </StatRoot>
</div>
