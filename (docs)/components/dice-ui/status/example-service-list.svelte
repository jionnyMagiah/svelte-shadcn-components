<script lang="ts">
    import * as Status from '$lib/registry/components/dice-ui/status';

    const services = [
        { name: 'API Server', status: 'success' as const, uptime: '99.9%' },
        { name: 'Cache Service', status: 'warning' as const, uptime: '98.5%' },
        { name: 'Message Queue', status: 'success' as const, uptime: '99.8%' },
        { name: 'CDN', status: 'error' as const, uptime: '95.2%' },
        {
            name: 'Email Service',
            status: 'info' as const,
            uptime: 'Updating...'
        }
    ];
</script>

<div class="flex w-full max-w-md flex-col gap-2">
    {#each services as service (service.name)}
        <div
            class="flex items-center justify-between rounded-lg border bg-card p-3"
        >
            <div class="flex flex-col gap-0.5">
                <span class="text-sm font-medium">{service.name}</span>
                <span class="text-xs text-muted-foreground">
                    Uptime: {service.uptime}
                </span>
            </div>
            <Status.Root variant={service.status}>
                <Status.Indicator />
                <Status.Label class="capitalize">{service.status}</Status.Label>
            </Status.Root>
        </div>
    {/each}
</div>
