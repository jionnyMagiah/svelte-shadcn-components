<script lang="ts">
    import * as Status from '$lib/registry/components/dice-ui/status';
</script>

<div class="flex flex-wrap items-center gap-2.5">
    <Status.Root variant="success">
        <Status.Label>Active</Status.Label>
    </Status.Root>

    <Status.Root variant="error">
        <Status.Label>Inactive</Status.Label>
    </Status.Root>

    <Status.Root variant="warning">
        <Status.Label>Pending</Status.Label>
    </Status.Root>

    <Status.Root variant="info">
        <Status.Label>Processing</Status.Label>
    </Status.Root>

    <Status.Root variant="default">
        <Status.Label>Draft</Status.Label>
    </Status.Root>
</div>
