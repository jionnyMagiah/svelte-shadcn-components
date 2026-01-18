<script lang="ts">
    import * as Status from '$lib/registry/components/dice-ui/status';
</script>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Success Variants</span>
        <div class="flex flex-wrap items-center gap-2.5">
            <Status.Root variant="success">
                <Status.Indicator />
                <Status.Label>Online</Status.Label>
            </Status.Root>
            <Status.Root variant="success">
                <Status.Indicator />
                <Status.Label>Active</Status.Label>
            </Status.Root>
            <Status.Root variant="success" class="hidden sm:inline-flex">
                <Status.Indicator />
                <Status.Label>Connected</Status.Label>
            </Status.Root>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Error Variants</span>
        <div class="flex flex-wrap items-center gap-2.5">
            <Status.Root variant="error">
                <Status.Indicator />
                <Status.Label>Offline</Status.Label>
            </Status.Root>
            <Status.Root variant="error">
                <Status.Indicator />
                <Status.Label>Disconnected</Status.Label>
            </Status.Root>
            <Status.Root variant="error" class="hidden sm:inline-flex">
                <Status.Indicator />
                <Status.Label>Failed</Status.Label>
            </Status.Root>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Warning Variants</span>
        <div class="flex flex-wrap items-center gap-2.5">
            <Status.Root variant="warning">
                <Status.Indicator />
                <Status.Label>Away</Status.Label>
            </Status.Root>
            <Status.Root variant="warning">
                <Status.Indicator />
                <Status.Label>Busy</Status.Label>
            </Status.Root>
            <Status.Root variant="warning" class="hidden sm:inline-flex">
                <Status.Indicator />
                <Status.Label>Pending</Status.Label>
            </Status.Root>
        </div>
    </div>
    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Info Variants</span>
        <div class="flex flex-wrap items-center gap-2.5">
            <Status.Root variant="info">
                <Status.Indicator />
                <Status.Label>Idle</Status.Label>
            </Status.Root>
            <Status.Root variant="info">
                <Status.Indicator />
                <Status.Label>In Progress</Status.Label>
            </Status.Root>
            <Status.Root variant="info" class="hidden sm:inline-flex">
                <Status.Indicator />
                <Status.Label>Syncing</Status.Label>
            </Status.Root>
        </div>
    </div>

    <div class="flex flex-col gap-3">
        <span class="text-sm font-medium">Default Variants</span>
        <div class="flex flex-wrap items-center gap-2.5">
            <Status.Root variant="default">
                <Status.Indicator />
                <Status.Label>Unknown</Status.Label>
            </Status.Root>
            <Status.Root variant="default">
                <Status.Indicator />
                <Status.Label>Not Set</Status.Label>
            </Status.Root>
            <Status.Root variant="default" class="hidden sm:inline-flex">
                <Status.Indicator />
                <Status.Label>N/A</Status.Label>
            </Status.Root>
        </div>
    </div>
</div>
