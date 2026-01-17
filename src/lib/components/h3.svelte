<script lang="ts">
    let { title }: { title: string } = $props();
</script>

<h3 id={title.toLowerCase().replaceAll(' ', '-')}>{title}</h3>
