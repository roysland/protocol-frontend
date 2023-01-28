<script>
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import moment from "moment";
    import { onMount } from "svelte";
    import { api, medicine, todaysMedicine } from "../../../store/api";
    let checked = []

    $: orderedList = () => {
        const groups = {
            'morning': [],
            'midday': [],
            'afternoon': [],
            'evening': []
        }
        $todaysMedicine.map((med) => {
            if (med.when === '19-23') {
                groups.evening.push(med)
            }
            if (med.when === '06-11') {
                groups.morning.push(med)
            }
            if (med.when === '11-15') {
                groups.midday.push(med)
            }
            if (med.when === '15-19') {
                groups.afternoon.push(med)
            }
        })
        return groups
    }

const markInput = async (med) => {
    await api.medicine.checkMed(med)
    med.checked = true
    $todaysMedicine.map((m) => {
        if (m.id === med.id) {
            m.checked = true
        }
    })
    showCongrats = isAllComplete()
}

const wasCheckedToday = (date) => {
    return moment(date).isSame(moment(), 'day')
}

const isAllComplete = () => {
    const medicinesLeft = $todaysMedicine.filter((item) => {
        return item.history && item.history.length > 0
    })
    console.log(`${$todaysMedicine.length} - ${medicinesLeft.length}`)
    return medicinesLeft.length === $todaysMedicine.length

}
let showCongrats = isAllComplete()
onMount(async() => {
    await api.medicine.todaysMedicine()
})
</script>
{#if showCongrats}
<div class="alert alert-success m-4">
    <div class="alert-message">
        <h3>Flott</h3>
        <p>Du har tatt alle medisinene i dag</p>
    </div>
</div>
{/if}
<div class="card m-4 p-4">
{#if orderedList().morning.length > 0}
<p>Morgen</p>
<ul>
    {#each orderedList().morning as med}
        <li class="flex items-center justify-between">
            {#if med.history.length > 0 && wasCheckedToday(med.history[0])}
            <SlideToggle size="sm" checked={med.history[0].checked} disabled />
            {:else}
            <SlideToggle size="sm" bind:checked={med.checked} on:change={() => markInput(med)} />
            {/if}
            <span class="flex-auto ml-4">
                <dt>{med.name}</dt>
                <dd><small>{med.when}</small></dd>
            </span>
        </li>
    {/each}
</ul>
{/if}
{#if orderedList().midday.length > 0}
<p>Formiddag</p>
<ul>
    {#each orderedList().midday as med}
        <li class="flex items-center justify-between">
            {#if med.history.length > 0 && wasCheckedToday(med.history[0])}
            <SlideToggle size="sm" checked={med.history[0].checked} disabled />
            {:else}
            <SlideToggle size="sm" bind:checked={med.checked} :disabled={med.checked} on:change={() => markInput(med)} />
            {/if}
            <span class="flex-auto ml-4">
                <dt>{med.name}</dt>
                <dd><small>{med.when}</small></dd>
            </span>
        </li>
    {/each}
</ul>
{/if}
{#if orderedList().afternoon.length > 0}
<p>Ettermiddag</p>
<ul>
    {#each orderedList().afternoon as med}
        <li class="flex items-center justify-between">
            {#if med.history.length > 0 && wasCheckedToday(med.history[0])}
            <SlideToggle size="sm" checked={med.history[0].checked} disabled />
            {:else}
            <SlideToggle size="sm" bind:checked={med.checked} on:change={() => markInput(med)} />
            {/if}
            <span class="flex-auto ml-4">
                <dt>{med.name}</dt>
                <dd><small>{med.when}</small></dd>
            </span>
        </li>
    {/each}
</ul>
{/if}
{#if orderedList().evening.length > 0}
<p>Kveld</p>
<ul>
    {#each orderedList().evening as med}
        <li class="flex items-center justify-between">
            {#if med.history.length > 0 && wasCheckedToday(med.history[0])}
            <SlideToggle size="sm" checked={med.history[0].checked} disabled />
            {:else}
            <SlideToggle size="sm" bind:checked={med.checked} on:change={() => markInput(med)} />
            {/if}
            <span class="flex-auto ml-4">
                <dt>{med.name}</dt>
                <dd><small>{med.when}</small></dd>
            </span>
        </li>
    {/each}
</ul>
{/if}
</div>
