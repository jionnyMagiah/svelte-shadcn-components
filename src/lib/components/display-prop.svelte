<script lang="ts" module>
    export type PropDesc = {
        name: string;
        desc?: string;
        type: string;
        default?: string;
        bindable?: boolean;
    };
</script>

<script lang="ts">
    let { props }: { props: PropDesc[] } = $props();
</script>

<pre>{JSON.stringify(props, null, 2)}</pre>
