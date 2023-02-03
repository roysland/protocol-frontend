<script>
import { api, todaysMedicine } from "../../store/api";
import { SlideToggle } from "@skeletonlabs/skeleton";
import { onMount } from "svelte";

$: groups = Array.from(new Set($todaysMedicine.map((m) => m.when)))

const updateMed = async (med) => {
    const take = api.medicine.take(med)
}

onMount(async () => {
    await api.medicine.today()
})
</script>
{#each groups as group}
<code>{group}</code>
<ul class="list">
    {#each $todaysMedicine as med}
    {#if med.when === group}
	<li class="w-full">
		<div class="flex w-full">
            <SlideToggle 
                class="w-full block" 
                checked={med.medicineHistory && med.medicineHistory.length > 0}
                on:change={() => updateMed(med)}
            >
            <span class="flex-auto w-100">{med.name}</span></SlideToggle>
        </div>
	</li>
    {/if}
    {/each}
</ul>
{/each}

<style lang="scss">
    .slide-toggle {
        display: block;
    }
</style>