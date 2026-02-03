<script lang="ts" module>
    import { type ResolvedPathname } from '$app/types';
    export { link };
</script>

{#snippet link(label: string, url: ResolvedPathname)}
    <a href={url} class="link">{label}</a>
{/snippet}
