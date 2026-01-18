<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import CircularProgressIndicator from '$lib/registry/components/dice-ui/circular-progress/circular-progress-indicator.svelte';
    import CircularProgressRange from '$lib/registry/components/dice-ui/circular-progress/circular-progress-range.svelte';
    import CircularProgressRoot from '$lib/registry/components/dice-ui/circular-progress/circular-progress-root.svelte';
    import CircularProgressTrack from '$lib/registry/components/dice-ui/circular-progress/circular-progress-track.svelte';
    import CircularProgressValueText from '$lib/registry/components/dice-ui/circular-progress/circular-progress-value-text.svelte';

    let uploadProgress = $state<number | null>(0);
    let isUploading = $state(false);
    let intervalRef = $state<NodeJS.Timeout | null>(null);

    const onUploadStart = () => {
        isUploading = true;
        uploadProgress = 0;
    };

    const onUploadReset = () => {
        uploadProgress = 0;
        isUploading = false;
        if (intervalRef) {
            clearInterval(intervalRef);
            intervalRef = null;
        }
    };

    $effect(() => {
        if (isUploading) {
            intervalRef = setInterval(() => {
                if (uploadProgress === null) uploadProgress = 0;
                else if (uploadProgress >= 100) {
                    if (intervalRef) {
                        clearInterval(intervalRef);
                        intervalRef = null;
                    }
                    isUploading = false;
                    uploadProgress = 100;
                } else
                    uploadProgress = Math.min(
                        100,
                        uploadProgress + Math.random() * 15
                    );
            }, 200);
        }

        return () => {
            if (intervalRef) {
                clearInterval(intervalRef);
                intervalRef = null;
            }
        };
    });
</script>

<div class="flex flex-col items-center gap-6">
    <div class="flex items-center gap-6">
        <CircularProgressRoot
            value={uploadProgress}
            min={0}
            max={100}
            size={80}
            thickness={6}
        >
            <CircularProgressIndicator>
                <CircularProgressTrack />
                <CircularProgressRange />
            </CircularProgressIndicator>
            <CircularProgressValueText class="text-base font-semibold" />
        </CircularProgressRoot>
        <div class="flex flex-col gap-2">
            <div class="text-sm font-medium">Upload Progress</div>
            <div class="text-xs text-muted-foreground">
                Status:{' '}
                {isUploading
                    ? 'Uploading...'
                    : uploadProgress === 100
                      ? 'Complete'
                      : 'Ready'}
            </div>
            <div class="text-xs text-muted-foreground">
                Progress:{' '}
                {uploadProgress === null
                    ? 'Indeterminate'
                    : `${Math.round(uploadProgress)}%`}
            </div>
        </div>
    </div>
    <div class="flex items-center gap-2">
        <Button size="sm" onclick={onUploadStart} disabled={isUploading}>
            Start upload
        </Button>
        <Button size="sm" onclick={onUploadReset} disabled={isUploading}>
            Reset
        </Button>
        <Button
            variant="secondary"
            size="sm"
            onclick={() => (uploadProgress = null)}
            disabled={isUploading}
        >
            Indeterminate
        </Button>
    </div>
</div>
