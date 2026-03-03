<script>
    import BannerAction from '$lib/registry/components/kibo-ui/banner/banner-action.svelte';
    import BannerClose from '$lib/registry/components/kibo-ui/banner/banner-close.svelte';
    import BannerIcon from '$lib/registry/components/kibo-ui/banner/banner-icon.svelte';
    import BannerTitle from '$lib/registry/components/kibo-ui/banner/banner-title.svelte';
    import Banner from '$lib/registry/components/kibo-ui/banner/banner.svelte';
    import { CircleAlert } from '@lucide/svelte';
</script>

<Banner>
    <BannerIcon icon={CircleAlert} />
    <BannerTitle>Important message</BannerTitle>
    <BannerAction>Learn more</BannerAction>
    <BannerClose />
</Banner>
