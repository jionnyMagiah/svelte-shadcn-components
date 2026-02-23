<script lang="ts">
    import * as Status from '$lib/registry/components/dice-ui/status';
</script>

<div class="flex flex-wrap items-center gap-2.5">
    <Status.Root variant="success">
        <Status.Label>Online</Status.Label>
    </Status.Root>

    <Status.Root variant="error">
        <Status.Indicator />
        <Status.Label>Offline</Status.Label>
    </Status.Root>

    <Status.Root variant="warning">
        <Status.Indicator />
        <Status.Label>Away</Status.Label>
    </Status.Root>

    <Status.Root variant="info">
        <Status.Indicator />
        <Status.Label>Idle</Status.Label>
    </Status.Root>
</div>
