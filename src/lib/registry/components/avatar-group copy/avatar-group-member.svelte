<script lang="ts" module>
    export type AvatarGroupMemberProps = AvatarRootProps & {
        children?: Snippet<[AvatarRootProps]>;
        child?: Snippet<[{ props: Record<string, unknown> }]>;
    };
</script>

<script lang="ts">
    import { type AvatarRootProps } from 'bits-ui';
    import { onMount, type Snippet } from 'svelte';
    import { getAvatarContext } from './index.svelte';
    let { children, child, ...restProps }: AvatarGroupMemberProps = $props();

    const id = $props.id();
    onMount(() => {
        getAvatarContext().set(id, { snippet: children, props: restProps });
        return () => {
            getAvatarContext().delete(id);
        };
    });
</script>
