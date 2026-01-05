<script lang="ts" module>
    import Button, {
        type ButtonProps
    } from '$lib/components/ui/button/button.svelte';

    export type ActionBarItemProps = ButtonProps;
</script>

<script lang="ts">
    let { children, variant }: ActionBarItemProps = $props();
</script>

<Button variant={variant ?? 'secondary'} size="sm">
    {@render children?.()}
</Button>
