<script>
import { SlideToggle } from "@skeletonlabs/skeleton";

const settings = [
    { name: 'Poop', value: true },
    { name: 'Period', value: true },
    { name: 'Medicine', value: true },
    { name: 'Supplements', value: true }
]
let pickedSettings = []
</script>

<div class="card p-4">
    <strong>User settings</strong>
    {#each settings as setting}
    <div>
        <SlideToggle bind:group={setting.value}>{setting.name}</SlideToggle>
    </div>
    {/each}
</div>
