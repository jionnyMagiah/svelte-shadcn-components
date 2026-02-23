<script lang="ts">
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import StatIndicator from '$lib/registry/components/dice-ui/stat/stat-indicator.svelte';
    import StatLabel from '$lib/registry/components/dice-ui/stat/stat-label.svelte';
    import StatRoot from '$lib/registry/components/dice-ui/stat/stat-root.svelte';
    import StatTrend from '$lib/registry/components/dice-ui/stat/stat-trend.svelte';
    import StatValue from '$lib/registry/components/dice-ui/stat/stat-value.svelte';
    import {
        ArrowDown,
        ArrowUp,
        DollarSign,
        Ellipsis,
        ShoppingCart
    } from '@lucide/svelte';
</script>

<div class="grid gap-4 sm:grid-cols-2">
    <StatRoot>
        <StatLabel>Total Revenue</StatLabel>
        <StatIndicator variant="icon" color="success">
            <DollarSign />
        </StatIndicator>
        <StatValue>$45,231</StatValue>
        <StatTrend trend="up">
            <ArrowUp />
            +20.1% from last month
        </StatTrend>
    </StatRoot>

    <StatRoot>
        <StatLabel>Active Users</StatLabel>
        <StatIndicator variant="badge" color="info">+24</StatIndicator>
        <StatValue>2,350</StatValue>
        <StatTrend trend="up">
            <ArrowUp />
            +180 from last week
        </StatTrend>
    </StatRoot>

    <StatRoot>
        <StatLabel>Total Orders</StatLabel>
        <StatIndicator variant="icon" color="warning">
            <ShoppingCart />
        </StatIndicator>
        <StatValue>1,234</StatValue>
        <StatTrend trend="down">
            <ArrowDown />
            -4.3% from last month
        </StatTrend>
    </StatRoot>

    <StatRoot>
        <StatLabel>Conversion Rate</StatLabel>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <StatIndicator {...props} variant="action">
                        <Ellipsis />
                    </StatIndicator>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item>View details</DropdownMenu.Item>
                <DropdownMenu.Item>Export data</DropdownMenu.Item>
                <DropdownMenu.Item>Share</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        <StatValue>3.2%</StatValue>
        <StatTrend trend="neutral">No change from last week</StatTrend>
    </StatRoot>
</div>
