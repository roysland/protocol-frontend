<script>
import { SlideToggle } from "@skeletonlabs/skeleton";

let settings = [
    { name: 'Poop', value: false },
    { name: 'Medicine', value: false },
    { name: 'Supplements', value: false },
    { name: 'Notification', value: false }
]

const handleNotifications = (value) => {
    if (!('Notification' in window)) {
        alert('Your browser does not support notifications')
    } else if (Notification.permission === "grantend") {
        const notification = new Notification("Notifications activated")
    } else if ((Notification.permission !== "denied")) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notification = new Notification("Notifications activated")
            }
        })
    }
}

const saveSettings = () => {
    if (settings[3].value) {
        handleNotifications()
    }
}
</script>

<div class="card p-4">
    <strong>User settings</strong>
    {#each settings as setting}
    <div>
        <SlideToggle bind:checked={setting.value} value={setting.value}>{setting.name}</SlideToggle>
    </div>
    {/each}
    <footer class="card-footer">
        <div>
            <button class="btn btn-filled btn-secondary" on:click={saveSettings}>Save settings</button>
        </div>
    </footer>
</div>
