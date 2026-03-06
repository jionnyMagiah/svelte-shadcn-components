<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    let { children, ...props }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h1 class="my-6 border-b pb-1 text-5xl font-semibold" {...props}>
    {@render children?.()}
</h1>
