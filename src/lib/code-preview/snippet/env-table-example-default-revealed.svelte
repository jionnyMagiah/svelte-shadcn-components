<script lang="ts">
    import EnvTable from '$lib/registry/components/jal-co-ui/env-table/env-table.svelte';
    import type { EnvVariable } from '$lib/registry/components/jal-co-ui/env-table/utils';

    const minimalVars: EnvVariable[] = [
        {
            key: 'NODE_ENV',
            value: 'production',
            environment: 'production'
        },
        {
            key: 'PORT',
            value: '3000',
            environment: 'production'
        }
    ];
</script>

<EnvTable variables={minimalVars} title="Runtime Config" defaultRevealed />
