<script lang="ts">
    import { resolve } from '$app/paths';
    import type { Component } from 'svelte';
    import Login01 from './login-01/login-01.svelte';
    import type { ResolvedPathname } from '$app/types';

    const gallery: {
        name: string;
        preview: Component;
        url: ResolvedPathname;
    }[] = [
        {
            name: 'Login-01',
            url: resolve('/blocks/originals/login/login-01'),
            preview: Login01
        },
        {
            name: 'Login-01',
            url: resolve('/blocks/originals/login/login-01'),
            preview: Login01
        },
        {
            name: 'Login-01',
            url: resolve('/blocks/originals/login/login-01'),
            preview: Login01
        }
    ];
</script>

this is my first block
<div class="grid grid-cols-2 gap-4">
    {#each gallery as item}
        {@const Preview = item.preview}
        <a
            href={item.url}
            class="flex aspect-square flex-col gap-4 rounded-md border bg-card p-4"
        >
            <div class="pointer-events-none">
                <Preview />
            </div>
            <span class="mt-auto font-semibold">{item.name}</span>
        </a>
    {/each}
</div>
