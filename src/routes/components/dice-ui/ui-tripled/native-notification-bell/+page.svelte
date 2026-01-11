<script>
    import { MessageSquare } from '@lucide/svelte';
    import NativeNotificationBell from 'routes/components/ui-tripled/native-notification-bell/native-notification-bell.svelte';
</script>

<div class="flex w-full flex-col gap-8">
    <div class="grid gap-6 md:grid-cols-3">
        <div class="space-y-2 text-center">
            <h3 class="text-sm font-semibold text-muted-foreground">
                With Count
            </h3>

            <div class="flex items-center justify-center p-4">
                <NativeNotificationBell count={3} />
            </div>
        </div>
        <div class="space-y-2 text-center">
            <h3 class="text-sm font-semibold text-muted-foreground">Empty</h3>
            <div class="flex items-center justify-center p-4">
                <NativeNotificationBell count={0} />
            </div>
        </div>
        <div class="space-y-2 text-center">
            <h3 class="text-sm font-semibold text-muted-foreground">
                Custom Icon
            </h3>
            <div class="flex items-center justify-center p-4">
                <NativeNotificationBell count={5}>
                    <MessageSquare class="h-5 w-5" />
                </NativeNotificationBell>
            </div>
        </div>
    </div>
</div>
