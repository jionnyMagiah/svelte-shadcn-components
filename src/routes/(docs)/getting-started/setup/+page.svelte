<script lang="ts">
    import { page } from '$app/state';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [
            { text: 'Getting Started' },
            { text: 'Setup', url: page.url.pathname }
        ];
    });
</script>

<svelte:head>
    <title>Setup - svelte-shadcn-components</title>
</svelte:head>
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Setup
</h1>

<div>
    <p>
        svelte-shadcn-components is a collection of copy-and-paste components
        built for Svelte 5 using <a
            class="link"
            href="https://shadcn-svelte.com/">shadcn-svelte</a
        >
        and <a class="link" href="https://tailwindcss.com/">tailwind-css</a>.
        <br />
        The components are ready to copy-and-paste and use it in your projects.
    </p>

    <p>
        To get started, no additional dependency is required. Additional
        dependencies might be necessary for other components, but it will be
        explicitly stated.
    </p>
</div>

<style>
    p + p {
        margin-top: 1rem;
    }
</style>
